import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      login: [
        null,
        [Validators.required, Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^-])/),
        ],
      ],
    });
  }

  public getPasswordErrorMessage() {
    if (this.password?.errors?.['minlength'] || this.password?.errors?.['pattern']) {
      return "Your password isn't strong enough";
    }
    if (this.password?.errors?.['required']) {
      return 'Please enter a password';
    }
    return '';
  }

  public disableBtn() {
    if (this.login?.invalid || this.password?.invalid) {
      return true;
    } else return false;
  }

  public get login() {
    return this.loginForm.get('login');
  }

  public get password() {
    return this.loginForm.get('password');
  }
}
