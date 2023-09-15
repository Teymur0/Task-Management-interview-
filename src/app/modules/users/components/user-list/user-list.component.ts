import { Component } from '@angular/core';
import { AccountService } from 'src/app/modules/account/services/account.service';
import * as _localStorage from '../.././../../utilities/local-storage/local-storage';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  allowedUsers: User[] = [];
  filteredUsers: User[] = [];
  dataLength!: number;
  dataPerPage = 10;
  currentPage = 1;
  userToDeletefromStorage: any;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const allUsers = _localStorage.getItem('users') as any;
    this.filteredUsers = allUsers.filter(
      (user: any) =>
        user.organization.name ===
        this.accountService.getActiveOrqanizationName()
    );

    const startIndex = (this.currentPage - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.dataLength = this.filteredUsers.length;
    this.allowedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.allowedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  deleteUser(index: number): void {
    let confirmDelete = confirm('Do you want to delete this user?');

    if (confirmDelete) {
      this.userToDeletefromStorage = this.allowedUsers[index].username;
      this.allowedUsers.splice(index, 1);
      const allUsers = _localStorage.getItem('users') as any;
      const updatedUsers = allUsers.filter(
        (user: User) => user.username !== this.userToDeletefromStorage
      );
      _localStorage.setItem('users', updatedUsers);
      this.loadData();
    }
  }
}
