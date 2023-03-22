import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  currentLoginStep: number = 0;
  showPasswordInput: boolean = false;


  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  handleFirstLoginStep() {
    this.showPasswordInput = true;
    this.currentLoginStep++;
  }

  handleLogin() {
    if (this.currentLoginStep == 0) {
      this.handleFirstLoginStep();
    } else if (this.currentLoginStep == 1) {
      console.log('Logging in with email:', this.myForm.value.email, 'and password:', this.myForm.value.password);
    }
  }
}
