import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signUp } from 'src/app/core/store/actions/auth.actions';
import { StateModel } from 'src/app/core/store/state/state.model';
import { AuthDataModel } from 'src/app/shared/models/user.model';
import { passwordMatchingValidatior } from 'src/app/shared/utils/password-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  public hidePassword = true;

  public hideConfirmPassword = true;

  constructor(private formBuilder: FormBuilder, private store: Store<StateModel>) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.formBuilder.group(
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
    if (
      this.name?.invalid ||
      this.login?.invalid ||
      this.password?.invalid ||
      this.confirmPassword?.invalid
    ) {
      return true;
    } else return false;
  }

  public signUp() {
    const userData: AuthDataModel = {
      name: this.name?.value,
      login: this.login?.value,
      password: this.password?.value,
    };
    this.store.dispatch(signUp({ newUserData: userData }));
  }

  public get name() {
    return this.registrationForm.get('name');
  }

  public get login() {
    return this.registrationForm.get('login');
  }

  public get password() {
    return this.registrationForm.get('password');
  }

  public get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
}
