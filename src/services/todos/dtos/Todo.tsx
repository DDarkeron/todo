import type { Dayjs } from "dayjs";

export type TodoStatus = "active" | "completed";

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  createdAt: Dayjs;
}
