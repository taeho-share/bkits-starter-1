import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, Priority, Category } from '@/domain/entities/todo';
import initialTodos from '../../../mocks/todos.json';

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'status'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: initialTodos as Todo[],
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              status: 'todo' as const,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: t.status === 'todo' ? 'completed' : 'todo',
                  completedAt: t.status === 'todo' ? new Date().toISOString() : undefined,
                }
              : t
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
    }),
    { name: 'todo-storage' }
  )
);
