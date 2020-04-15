import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FORM } from 'src/app/classes/signup-form.classe';

import { AuthService } from 'src/app/services/core/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, CanActivate {
  signUpForm: FormGroup;
  form = FORM;

  constructor(
    private router: Router,
    private auth: AuthService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      // password: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]),
      cnfpassword: new FormControl(null, this.passValidator)
    });

    this.signUpForm.controls.password.valueChanges.subscribe(
      x => {
        this.signUpForm.controls.cnfpassword.updateValueAndValidity();
      }
    );
  }

  isValid(controlName) {
    return this.signUpForm.get(controlName).invalid && this.signUpForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassword = control.value;
      const passwordControl = control.root.get('password');

      if (passwordControl) {
        const passwordValue = passwordControl.value;

        if (passwordValue !== cnfpassword || passwordValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.auth.submitSignUp(this.signUpForm.value).subscribe(
        (data) => {
          console.log('DATA Sign Up: ', data);
          localStorage.setItem('token', data.toString());
          this.router.navigate(['/dashboard', 'customer']);
          this.notification.success('Registration success.');
        },
        (error) => {
          this.signUpForm.reset();
          this.notification.warn('User already exists !');
        }
      );
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/dashboard', 'customer']);
      return of(false);
    } else {
      return of(true);
    }
  }
}
