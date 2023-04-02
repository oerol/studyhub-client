import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-login.register.scss'],
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  showPasswordError: boolean = false;
  showConfirmPasswordError: boolean = false;

  @ViewChild('requiredminlength') requireMinLength!: ElementRef;
  @ViewChild('requiredlowercase') requireLowerCase!: ElementRef;
  @ViewChild('requireduppercase') requireUpperCase!: ElementRef;
  @ViewChild('requirednumber') requireNumber!: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: ['']
    }, {validators: this.checkPasswords});



    this.myForm.get('password')!.valueChanges.subscribe(() => {
      const passwordControl = this.myForm.get('password');
      const passwordValue: string = passwordControl!['value'];
      this.showPasswordError = true;
      this.changeDetectorRef.detectChanges();

      if (passwordValue.length < 8) {
        this.requireMinLength.nativeElement.style.color = 'red';
      } else {
        this.requireMinLength.nativeElement.style.color = 'green';
      }

      if (/[a-z]/.test(passwordValue)) {
        this.requireLowerCase.nativeElement.style.color = 'green';
      } else {
        this.requireLowerCase.nativeElement.style.color = 'red';
      }
      if (/[A-Z]/.test(passwordValue)) {
        this.requireUpperCase.nativeElement.style.color = 'green';
      } else {
        this.requireUpperCase.nativeElement.style.color = 'red';
      }
      if (/[0-9]/.test(passwordValue)) {
        this.requireNumber.nativeElement.style.color = 'green';
      } else {
        this.requireNumber.nativeElement.style.color = 'red';
      }
    });
  }
  
  // https://stackoverflow.com/a/51606362/14615037
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let password = group.get('password')!.value;
    let confirmPassword = group.get('confirmPassword')!.value
    return password === confirmPassword ? null : { notSame: true }
  }

  onConfirmPasswordInput() {
    this.showConfirmPasswordError = true;
  }

  handleRegisterAttempt() {
  }
  

  toLogin() {
    this.router.navigate(['/login']);
  }
}
