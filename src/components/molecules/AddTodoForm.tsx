'use client';

import { useState } from 'react';
import { useTodoStore } from '@/application/store/todoStore';
import { Priority, Category } from '@/domain/entities/todo';
import { Button } from '@/components/atoms/Button';
import { Plus, X } from 'lucide-react';

export function AddTodoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState('');
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title: title.trim(), description, priority, category, dueDate: dueDate || undefined });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full justify-center gap-2">
        <Plus className="w-4 h-4" />
        할일 추가
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <input
        autoFocus
        type="text"
        placeholder="무엇을 할 건가요?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-sm font-medium outline-none placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="설명 (선택)"
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
          <option value="high">높은 우선순위</option>
          <option value="medium">보통 우선순위</option>
          <option value="low">낮은 우선순위</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none"
        >
          <option value="work">업무</option>
          <option value="personal">개인</option>
          <option value="health">건강</option>
          <option value="learning">학습</option>
          <option value="other">기타</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none text-gray-600"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <Button type="submit" size="sm" disabled={!title.trim()}>
          추가
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-3.5 h-3.5" />
          취소
        </Button>
      </div>
    </form>
  );
}
