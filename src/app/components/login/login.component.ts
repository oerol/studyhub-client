import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/interfaces/loginRequest';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-login.register.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  currentLoginStep: number = 0;

  showPasswordInput: boolean = false;
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef<HTMLInputElement>;

  showEmailErrors: boolean = false;
  authentificationError: boolean = false;

  buttonTexts = ['Continue', 'Login'];
  currentButtonText = this.buttonTexts[0];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: '',
    });

    // hide errors if the user tries to correct his input
    this.myForm.get("email")!.valueChanges.subscribe(() => {
      if (this.myForm.get("email")!.valid) {
        this.showEmailErrors = false;
      }
    })
  }

  handleFirstLoginStep() {
    const emailIsCorrect: boolean = this.myForm.get('email')!.valid;
    if (emailIsCorrect) {
      this.showPasswordInput = true;
      this.changeDetectorRef.detectChanges();
      this.passwordInput.nativeElement.focus();
      this.currentLoginStep++;
      this.currentButtonText = this.buttonTexts[1];
    } else {
      this.showEmailErrors = true;
    }
  }

  handleSecondLoginStep() {
    const userEnteredPassword = this.passwordInput.nativeElement.value !== "";
    if (userEnteredPassword) {
      this.handleLoginRequest();
    }
  }

  handleAuthentificationError() {
    this.authentificationError = true;
    this.passwordInput.nativeElement.value = "";
  }

  handleLogin() {
    console.log('Logging in with email:', this.myForm.value.email, 'and password:', this.myForm.value.password);
    this.router.navigate(['/dashboard']);
  }

  handleLoginRequest() {
    const loginRequest: LoginRequest = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };
    
    // prettier-ignore
    this.userService.sendLoginRequest(loginRequest).subscribe(
      (success: any) => {this.handleLogin()},
      (error: any) => {this.handleAuthentificationError()}
    );
  }

  handleLoginAttempt() {
    if (this.currentLoginStep == 0) {
      this.handleFirstLoginStep();
    } else if (this.currentLoginStep == 1) {
      this.handleSecondLoginStep();
    }
  }
}
