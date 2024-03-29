import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FORM } from 'src/app/classes/signin-form.classe';

import { AuthService } from 'src/app/services/core/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, CanActivate {
  signInForm: FormGroup;
  form = FORM;

  constructor(
    private router: Router,
    private auth: AuthService,
    private notification: NotificationService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const group = {};

    this.form.forEach(inputTemplate => {
      group[inputTemplate.label] = new FormControl(inputTemplate.formState, Validators[inputTemplate.option]);
    });

    this.signInForm = new FormGroup(group);
  }

  isValid(controlName) {
    return this.signInForm.get(controlName).invalid && this.signInForm.get(controlName).touched;
  }

  onSignIn() {
    if (this.signInForm.valid) {
      this.auth.submitSignIn(this.signInForm.value).subscribe(
        (data) => {
          localStorage.setItem('token', data.toString());
          this.router.navigate(['/dashboard', 'customer']);
          this.notification.success('Username success');
        },
        () => {
          // this.notification.warn('User email is not registered !');
          this.notification.warn('User is not authorized !');
        }
      );
    }
  }

  canActivate(): Observable<boolean> {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/dashboard', 'customer']);
      return of(false);
    } else {
      return of(true);
    }
  }
}
