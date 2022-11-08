import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { passwordMatchingValidatior } from 'src/app/shared/utils/password-match.validator';

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
        confirmPassword: [null, [Validators.required]],
      },
      { validator: passwordMatchingValidatior('password', 'confirmPassword') },
    );
  }

  public disableBtn() {
    if (this.login?.invalid || this.password?.invalid) {
      return true;
    } else return false;
  }

  public navigateBack() {
    this.location.back();
  }

  public get name() {
    return this.editForm.get('name');
  }

  public get login() {
    return this.editForm.get('login');
  }

  public get password() {
    return this.editForm.get('password');
  }

  public get confirmePassword() {
    return this.editForm.get('confirmPassword');
  }
}
