import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signIn } from 'src/app/core/store/actions/auth.actions';
import { StateModel } from 'src/app/core/store/state/state.model';
import { AuthDataModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public hide = true;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private formBuilder: FormBuilder, private store: Store<StateModel>) {}

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

  public signIn() {
    const userData: Omit<AuthDataModel, 'name'> = {
      login: this.login?.value,
      password: this.password?.value,
    };
    this.store.dispatch(signIn({ userData }));
  }

  public get login() {
    return this.loginForm.get('login');
  }

  public get password() {
    return this.loginForm.get('password');
  }
}
