import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import { passwordMatchingValidatior } from '../../shared/utils/password-match.validator';
import { StateModel } from '../../core/store/state/state.model';
import { SelectedUserModel } from '../../shared/models/user.model';
import { selectCurrentUser } from '../../core/store/selectos/app.selectors';
import { deleteUser, getAllUsers, updateUser } from '../../core/store/actions/user.actions';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { BREAKPOINTS } from '../../shared/constants/constants';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;

  public hidePassword = true;

  public hideConfirmPassword = true;

  public user: SelectedUserModel;

  public isMediumScreen: boolean;

  public get name() {
    return this.editForm.get('name');
  }

  public get login() {
    return this.editForm.get('login');
  }

  public get password() {
    return this.editForm.get('password');
  }

  public get confirmPassword() {
    return this.editForm.get('confirmPassword');
  }

  private userSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private formBuilder: FormBuilder,
    private store: Store<StateModel>,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.store.dispatch(getAllUsers());
    this.userSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.user = <SelectedUserModel>user));
    this.initForm();

    this.breakpointObserver.observe(BREAKPOINTS.medium).subscribe((res) => {
      this.isMediumScreen = res.breakpoints[BREAKPOINTS.medium];
    });
  }

  private initForm() {
    this.editForm = this.formBuilder.group(
      {
        name: [this.user.name, [Validators.required]],
        login: [
          this.user.login,
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
    return !!(
      this.name?.invalid ||
      this.login?.invalid ||
      this.password?.invalid ||
      this.confirmPassword?.invalid
    );
  }

  public navigateBack() {
    this.location.back();
  }

  public updateUser() {
    this.store.dispatch(
      updateUser({
        userId: this.user.id,
        data: { name: this.name?.value, login: this.login?.value, password: this.password?.value },
      }),
    );
  }

  public openConfirmationDialog() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete user',
        content: `Do you want to delete current user?`,
        handler: () => this.deleteUser(this.user.id),
      },
    });
  }

  private deleteUser(userId: string) {
    this.store.dispatch(deleteUser({ userId }));
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
