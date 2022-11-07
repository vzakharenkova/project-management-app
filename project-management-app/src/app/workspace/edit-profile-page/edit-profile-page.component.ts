import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  public editForm: FormGroup;

  public hidePassword = true;

  public hideConfirmPassword = true;

  constructor(private location: Location, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.editForm = this.formBuilder.group(
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

  public navigateBack() {
    this.location.back();
  }

  public get _name() {
    return this.editForm.get('name');
  }

  public get _login() {
    return this.editForm.get('login');
  }

  public get _password() {
    return this.editForm.get('password');
  }

  public get _confirmePassword() {
    return this.editForm.get('confirmPassword');
  }
}
