import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-login.register.scss'],
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  showPasswordError: boolean = false;
  showConfirmPasswordError: boolean = false;
  showEmptyFieldsError: boolean = false;
  isLoading: boolean = false;
  emailAlreadyTakenError: boolean = false;

  @ViewChild('requiredminlength') requireMinLength!: ElementRef;
  @ViewChild('requiredlowercase') requireLowerCase!: ElementRef;
  @ViewChild('requireduppercase') requireUpperCase!: ElementRef;
  @ViewChild('requirednumber') requireNumber!: ElementRef;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  handleSpecificPasswordError(element: ElementRef<any>, showError: boolean) {
    const errorColor = 'red';
    const correctColor = 'green';
    element.nativeElement.style.color = showError ? errorColor : correctColor;
  }

  handleMinPasswordLength(passwordValue: string) {
    const hasMinLength = passwordValue.length < 8;
    this.handleSpecificPasswordError(this.requireMinLength, hasMinLength);
  }

  requireOneLowerCaseCharacter(passwordValue: string) {
    const hasOneLowerCaseCharacter = !/[a-z]/.test(passwordValue);
    this.handleSpecificPasswordError(this.requireLowerCase, hasOneLowerCaseCharacter);
  }
  requireOneUpperCaseCharacter(passwordValue: string) {
    const hasOneUpperCaseCharacter = !/[A-Z]/.test(passwordValue);
    this.handleSpecificPasswordError(this.requireUpperCase, hasOneUpperCaseCharacter);
  }
  requireOneNumber(passwordValue: string) {
    const hasOneNumber = !/[0-9]/.test(passwordValue);
    this.handleSpecificPasswordError(this.requireNumber, hasOneNumber);
  }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(".*[a-z].*"), Validators.pattern(".*[A-Z].*"), Validators.pattern(".*[0-9].*")]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );

    this.myForm.get('password')!.valueChanges.subscribe(() => {
      const passwordControl = this.myForm.get('password');
      const passwordValue: string = passwordControl!['value'];
      this.showPasswordError = true;
      this.changeDetectorRef.detectChanges();

      this.handleMinPasswordLength(passwordValue);
      this.requireOneLowerCaseCharacter(passwordValue);
      this.requireOneUpperCaseCharacter(passwordValue);
      this.requireOneNumber(passwordValue);
    });

    // hide errors if the user tries to correct his input
    this.myForm.get("email")!.valueChanges.subscribe(() => {
      this.emailAlreadyTakenError = false;
    })
  }

  // https://stackoverflow.com/a/51606362/14615037
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')!.value;
    let confirmPassword = group.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { notSame: true };
  };

  onConfirmPasswordInput() {
    this.showConfirmPasswordError = true;
  }

  handleSuccesfulRegisterAttempt() {
    console.log('succesful register');
    this.isLoading = false;
    this.router.navigate(['/dashboard']);

  }
  handleFailedRegisterAttempt(error: any) {
    console.log('failed register');
    if (error === "User with email already exists") {
      this.emailAlreadyTakenError = true;
    }
    
  }

  handleRegisterAttempt() {
    this.showPasswordError = false;
    this.showEmptyFieldsError = true;

    const inputIsCorrect = this.myForm.status === 'VALID';
    if (inputIsCorrect) {
      this.isLoading = true;

      const registerRequest: any = {
        firstName: this.myForm.value.firstName,
        lastName: this.myForm.value.lastName,
        email: this.myForm.value.email,
        password: this.myForm.value.password,
      };

      setTimeout(() => {
        // prettier-ignore
        this.userService.sendRegisterRequest(registerRequest).subscribe(
          (success: any) => {this.handleSuccesfulRegisterAttempt()},
          (error: any) => {this.handleFailedRegisterAttempt(error)}
        );
      }, 1500);
    }
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
