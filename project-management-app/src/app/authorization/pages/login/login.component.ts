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
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-])/),
        ],
      ],
    });
  }

  public getPasswordErrorMessage() {
    if (this._password?.invalid && (this._password?.touched || this._password?.dirty)) {
      if (this._password?.errors?.['minlength'] || this._password?.errors?.['pattern']) {
        return "Your password isn't strong enough";
      } else if (this._password?.errors?.['required']) {
        return 'Please enter a password';
      } else return '';
    } else return '';
  }

  public getLoginErrorMessage() {
    if (this._login?.invalid && (this._login?.touched || this._login?.dirty)) {
      if (this._login?.errors?.['pattern']) {
        return 'The login email is invalid';
      }
      if (this._login?.errors?.['required']) {
        return 'Please enter a login email';
      }
      return '';
    }
    return '';
  }

  public disableBtn() {
    if (this._login?.invalid || this._password?.invalid) {
      return true;
    } else return false;
  }

  public navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  private get _login() {
    return this.loginForm.get('login');
  }

  private get _password() {
    return this.loginForm.get('password');
  }
}
