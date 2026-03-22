'use client';

import { useState } from 'react';
import { Todo, Priority, Category } from '@/domain/entities/todo';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { useTodoStore } from '@/application/store/todoStore';
import { Trash2, Calendar, Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoCardProps {
  todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? '');
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [category, setCategory] = useState<Category>(todo.category);
  const [dueDate, setDueDate] = useState(todo.dueDate ?? '');

  const isOverdue =
    todo.dueDate &&
    todo.status === 'todo' &&
    new Date(todo.dueDate) < new Date(new Date().toDateString());

  const handleSave = () => {
    if (!title.trim()) return;
    updateTodo(todo.id, {
      title: title.trim(),
      description: description || undefined,
      priority,
      category,
      dueDate: dueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description ?? '');
    setPriority(todo.priority);
    setCategory(todo.category);
    setDueDate(todo.dueDate ?? '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-300 rounded-xl p-4 space-y-3 shadow-sm">
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-sm font-medium outline-none border-b border-gray-200 pb-1"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-xs text-gray-600 outline-none placeholder-gray-400"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none"
          >
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="learning">Learning</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none text-gray-600"
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} disabled={!title.trim()}>
            <Check className="w-3.5 h-3.5" />
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="w-3.5 h-3.5" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

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
        aria-label="Toggle complete"
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

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {todo.status !== 'completed' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-700 p-1"
            aria-label="Edit"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-500 p-1"
          aria-label="삭제"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
