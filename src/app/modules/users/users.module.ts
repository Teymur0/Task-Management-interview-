import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { PaginationModule } from '../pagination/pagination.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserComponent],
  imports: [CommonModule, UsersRoutingModule, PaginationModule, FormsModule],
})
export class UsersModule {}
