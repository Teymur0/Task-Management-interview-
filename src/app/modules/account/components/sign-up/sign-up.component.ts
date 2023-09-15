import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _validator from '../../../../utilities/validators/validator';
import * as _localStorage from '../../../../utilities/local-storage/local-storage';
import { User } from 'src/app/modules/users/model/user.model';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/modules/users/model/user.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private router: Router) {}
  onSubmit(signUpForm: NgForm) {
    if (!signUpForm.valid) {
      return;
    }

    if (
      _validator.checkUserSignUp(
        signUpForm.value.email,
        signUpForm.value.userName,
        signUpForm.value.organizationName
      )
    ) {
      let userList = _localStorage.getItem('users') as User[];
      userList.push({ ...signUpForm.value, role: RoleEnum.Admin });
      _localStorage.setItem('users', userList);

      this.router.navigate(['sign-in']);
    } else {
      alert('this company is already exsist');
    }
  }
}
