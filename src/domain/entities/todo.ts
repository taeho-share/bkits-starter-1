export type Priority = 'high' | 'medium' | 'low';
export type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';
export type Status = 'todo' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
  status: Status;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}
