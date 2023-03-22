import { Component, OnInit, ViewChild, ContentChildren, QueryList, AfterViewChecked, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/interfaces/loginRequest';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  currentLoginStep: number = 0;
  showPasswordInput: boolean = false;
  error: boolean = false;
  buttonTexts = ['Continue', 'Login'];
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef<HTMLInputElement>;
  currentButtonText = this.buttonTexts[0];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: '',
    });
  }

  handleFirstLoginStep() {
    const emailIsCorrect: boolean = this.myForm.get('email')!.valid;
    if (emailIsCorrect) {
      this.showPasswordInput = true;
      this.changeDetectorRef.detectChanges();
      this.passwordInput.nativeElement.focus();
      this.currentLoginStep++;
      this.currentButtonText = this.buttonTexts[1];
    }
  }

  handleLogin() {
    if (this.currentLoginStep == 0) {
      this.handleFirstLoginStep();
    } else if (this.currentLoginStep == 1) {
      let loginRequest: LoginRequest = {
        email: this.myForm.value.email,
        password: this.myForm.value.password,
      };

      this.userService.sendLoginRequest(loginRequest).subscribe(
        (data: any) => {
          console.log('Logging in with email:', this.myForm.value.email, 'and password:', this.myForm.value.password);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.error = true;
          this.passwordInput.nativeElement.value = "";
        }
      );
    }
  }
}
