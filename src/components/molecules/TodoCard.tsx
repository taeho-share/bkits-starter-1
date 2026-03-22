'use client';

import { Todo } from '@/domain/entities/todo';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { useTodoStore } from '@/application/store/todoStore';
import { Trash2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoCardProps {
  todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const isOverdue =
    todo.dueDate &&
    todo.status === 'todo' &&
    new Date(todo.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      className={cn(
        'group flex items-start gap-3 p-4 rounded-xl border transition-all',
        todo.status === 'completed'
          ? 'bg-gray-50 border-gray-100'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
      )}
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={cn(
          'mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all',
          todo.status === 'completed'
            ? 'bg-gray-900 border-gray-900 flex items-center justify-center'
            : 'border-gray-300 hover:border-gray-900'
        )}
        aria-label="완료 토글"
      >
        {todo.status === 'completed' && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm font-medium leading-snug',
            todo.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
          )}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p className="mt-0.5 text-xs text-gray-500 truncate">{todo.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <Badge label={todo.priority} variant={todo.priority} />
          <Badge label={todo.category} variant={todo.category} />
          {todo.dueDate && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs',
                isOverdue ? 'text-red-500' : 'text-gray-400'
              )}
            >
              <Calendar className="w-3 h-3" />
              {todo.dueDate}
            </span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1"
        aria-label="삭제"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
