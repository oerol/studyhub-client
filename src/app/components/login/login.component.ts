import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/interfaces/loginRequest';
import { UserService } from 'src/app/services/user.service';

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
  currentButtonText = this.buttonTexts[0];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  handleFirstLoginStep() {
    this.showPasswordInput = true;
    this.currentLoginStep++;
    this.currentButtonText = this.buttonTexts[1];
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
        },
        (error: any) => {
          this.error = true;
        }
      );
    }
  }
}
