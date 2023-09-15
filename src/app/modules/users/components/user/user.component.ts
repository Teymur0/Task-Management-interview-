import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _localStorage from '../../../../utilities/local-storage/local-storage';
import { RoleEnum, User } from '../../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userFormValue: any;
  editMode = false;
  editedUserName!: string
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editedUserName = params['username'];
      this.editMode = params['username'] !== 'add' ? true : false;
      this.userFormValue = this.userService.getUserInformation(
        params['username']
      );
    });
  }

  onSubmit(addUserForm: NgForm) {
    let allUsers = _localStorage.getItem('users') as User[];
    if (!addUserForm.valid) {
      return;
    }

    if (this.editMode) {
      allUsers = allUsers.map((user: User) => {
        if (user.username === this.editedUserName) {
          return {
            ...user,
            lastName: addUserForm.value.lastName,
            firstName: addUserForm.value.firstName,
            email: addUserForm.value.email,
            username: addUserForm.value.username,
          };
        }
        return user;
      });
      _localStorage.setItem('users', allUsers);
      this.router.navigate(['main/user/list']);
    } else {
      const allUsers = _localStorage.getItem('users') as User[];

      const currentOrqanizationData = (
        _localStorage.getItem('current-user') as User[]
      ).find(Boolean)?.organization;

      const newUser = {
        ...addUserForm.value,
        password: '123456',
        role: RoleEnum.User,
        organization: {
          name: currentOrqanizationData?.name,
          phoneNumber: currentOrqanizationData?.phoneNumber,
          address: currentOrqanizationData?.address,
        },
      };
      allUsers.push(newUser);
      _localStorage.setItem('users', allUsers);
      this.router.navigate(['main/user/list']);
    }
  }
}
