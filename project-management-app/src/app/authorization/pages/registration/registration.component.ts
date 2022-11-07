import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  public hidePassword = true;

  public hideConfirmPassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
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
        confirmPassword: [null, [Validators.required]],
      },
      { validator: this.passwordMatchingValidatior('password', 'confirmPassword') },
    );
  }

  //https://jasonwatmore.com/post/2020/07/07/angular-10-reactive-forms-validation-example

  private passwordMatchingValidatior(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public disableBtn() {
    if (this._login?.invalid || this._password?.invalid) {
      return true;
    } else return false;
  }

  public navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  public get _name() {
    return this.registrationForm.get('name');
  }

  public get _login() {
    return this.registrationForm.get('login');
  }

  public get _password() {
    return this.registrationForm.get('password');
  }

  public get _confirmePassword() {
    return this.registrationForm.get('confirmPassword');
  }
}
