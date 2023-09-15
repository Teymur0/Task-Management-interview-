export class Task {
  creator!: string;
  organizationName!: string;
  title!: string;
  description!: string;
  deadline!: string;
  assignedUsers!: string[];
  status!: TaskStatusEnum;
}

export enum TaskStatusEnum {
  Todo,
  Inprogress,
  Done,
}
