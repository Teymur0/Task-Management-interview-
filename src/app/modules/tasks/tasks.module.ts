import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TaskListComponent, TaskItemComponent, TaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    PaginationModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class TasksModule {}
