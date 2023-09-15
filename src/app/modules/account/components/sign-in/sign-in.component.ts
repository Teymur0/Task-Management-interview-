import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as _localStorage from '../../../../utilities/local-storage/local-storage';
import * as _validator from '../../../../utilities/validators/validator';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInType = 'email';
  constructor(private router: Router) {}

  changeSignInType() {
    this.signInType = this.signInType === 'email' ? 'username' : 'email';
  }

  onSubmit(signInFrom: NgForm) {
    if (!signInFrom.valid) {
      return;
    }

    const currentUser = _validator.checkUserSignIn(
      signInFrom.value.email,
      signInFrom.value.userName,
      signInFrom.value.password
    );

    if (currentUser.length > 0) {
      _localStorage.setItem('current-user', currentUser);
      this.router.navigate(['main/task/list']);
    } else {
      alert('user not found');
    }
  }
}
