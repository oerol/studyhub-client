import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
    })
  }

  login() {
    console.log('Logging in with email:', this.myForm.value.email, 'and password:', "this.password");
  }
}
