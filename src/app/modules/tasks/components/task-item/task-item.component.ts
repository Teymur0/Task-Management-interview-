import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskStatusEnum } from '../../model/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;

  get taskStatusEnum(): typeof TaskStatusEnum {
    return TaskStatusEnum;
  }

  ngOnInit(): void {}
}
