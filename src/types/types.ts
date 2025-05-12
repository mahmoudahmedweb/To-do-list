export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

export type FilterType = "all" | "active" | "completed";
export type SortType = "date" | "priority" | "name";
