import { Component, OnInit } from '@angular/core';
import * as _localStorage from '../../../../utilities/local-storage/local-storage';
import { Task } from '../../model/task.model';
import { AccountService } from 'src/app/modules/account/services/account.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  allowedTask: Task[] = [];
  filteredTask: Task[] = [];

  taskList: Task[] = [];
  dataLength!: number;
  dataPerPage = 8;
  currentPage = 1;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    const taskList = _localStorage.getItem('task-list') as Task[];

    this.taskList = taskList.filter(
      (task: Task) =>
        (task.organizationName ===
          this.accountService.getActiveOrqanizationName() &&
          task.assignedUsers?.includes(
            this.accountService.getActiveUserName() as string
          )) ||
        task.creator === (this.accountService.getActiveUserName() as string)
    );
    const startIndex = (this.currentPage - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.dataLength = this.taskList.length;
    this.allowedTask = this.taskList.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.allowedTask = this.taskList.slice(startIndex, endIndex);
  }
}
