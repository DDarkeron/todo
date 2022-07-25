import type { TodoStatus } from "./Todo";

export interface UpdateTodo {
  id: string;
  content: string;
}

export interface UpdateTodoStatus {
  id: string;
  status: TodoStatus;
}
