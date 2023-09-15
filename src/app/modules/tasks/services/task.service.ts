import { Injectable } from '@angular/core';
import * as _localStorage from '../../../utilities/local-storage/local-storage';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  getAllTasks(creator: string): Task | undefined {
    const allTasks = _localStorage.getItem('task-list') as Task[];
    if (creator !== 'add') {
      return allTasks
        .filter((task: Task) => task.creator === creator)
        .find(Boolean);
    }
    return new Task();
  }
}
