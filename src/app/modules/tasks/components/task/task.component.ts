import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task, TaskStatusEnum } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { User } from 'src/app/modules/users/model/user.model';
import { AccountService } from 'src/app/modules/account/services/account.service';
import * as _localStorage from '../.././../../utilities/local-storage/local-storage';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  taskFormValue: any;
  taskStatuses!: any[];
  editMode = false;
  editedTaskName!: string;
  organizationUsers!: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editedTaskName = params['creator'];
      this.editMode = params['creator'] !== 'add' ? true : false;
      this.taskFormValue = this.taskService.getAllTasks(this.editedTaskName);
    });

    const allUsers = _localStorage.getItem('users') as any;
    this.organizationUsers = allUsers
      .filter(
        (user: User) =>
          user.organization.name ===
          this.accountService.getActiveOrqanizationName()
      )
      .map((user: User) => user.username);

    this.taskStatuses = Object.keys(TaskStatusEnum)
      .filter((key: any) => isNaN(Number(key)))
      .map((key: any) => ({
        value: TaskStatusEnum[key],
        label: key,
      }));
  }

  onSubmit(taskForm: NgForm) {
    if (!taskForm.valid) {
      return;
    }
    if (this.editMode) {
      let allTasks = _localStorage.getItem('task-list') as Task[];
      allTasks = allTasks.map((task: Task) => {
        if (task.creator === this.editedTaskName) {
          return {
            ...task,
            assignedUsers: taskForm.value.assignedUsers,
            deadline: taskForm.value.deadline,
            description: taskForm.value.description,
            title: taskForm.value.title,
            status: taskForm.value.status,
          };
        }
        return task;
      });
      console.log(allTasks);

      _localStorage.setItem('task-list', allTasks);
      this.router.navigate(['main/task/list']);
    } else {
      let allTasks = _localStorage.getItem('task-list') as Task[];

      const currentuserData = (
        _localStorage.getItem('current-user') as User[]
      ).find(Boolean);

      const newTask = {
        ...taskForm.value,
        status: +taskForm.value.status,
        creator: currentuserData?.username,
        organizationName: currentuserData?.organization.name,
      };

      allTasks.push(newTask);
      console.log(newTask);
      _localStorage.setItem('task-list', allTasks);
      this.router.navigate(['main/task/list']);
    }
  }
}
