'use client';

import { useMemo, useState } from 'react';
import { useTodoStore } from '@/application/store/todoStore';
import { TodoCard } from '@/components/molecules/TodoCard';
import { AddTodoForm } from '@/components/molecules/AddTodoForm';
import { Category } from '@/domain/entities/todo';

type TabType = 'today' | 'upcoming' | 'completed';

const categoryLabels: Record<Category | 'all', string> = {
  all: '전체',
  work: '업무',
  personal: '개인',
  health: '건강',
  learning: '학습',
  other: '기타',
};

export function TodoList() {
  const { todos } = useTodoStore();
  const [tab, setTab] = useState<TabType>('today');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (tab === 'today') {
      result = result.filter(
        (t) => t.status === 'todo' && (!t.dueDate || t.dueDate <= todayStr)
      );
    } else if (tab === 'upcoming') {
      result = result.filter((t) => t.status === 'todo' && t.dueDate && t.dueDate > todayStr);
    } else {
      result = result.filter((t) => t.status === 'completed');
    }

    return result.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [todos, tab, categoryFilter, todayStr]);

  const counts = useMemo(() => ({
    today: todos.filter((t) => t.status === 'todo' && (!t.dueDate || t.dueDate <= todayStr)).length,
    upcoming: todos.filter((t) => t.status === 'todo' && t.dueDate && t.dueDate > todayStr).length,
    completed: todos.filter((t) => t.status === 'completed').length,
  }), [todos, todayStr]);

  const tabs: { key: TabType; label: string }[] = [
    { key: 'today', label: '오늘' },
    { key: 'upcoming', label: '예정' },
    { key: 'completed', label: '완료' },
  ];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
              tab === key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === key ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(Object.keys(categoryLabels) as (Category | 'all')[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`flex-shrink-0 text-xs px-3 py-1 rounded-full border transition-colors ${
              categoryFilter === cat
                ? 'bg-gray-900 text-white border-gray-900'
                : 'text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Add Form */}
      {tab !== 'completed' && <AddTodoForm />}

      {/* Todo Items */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-2xl mb-2">
              {tab === 'completed' ? '🎉' : '✨'}
            </p>
            <p className="text-sm">
              {tab === 'completed' ? '완료된 항목이 없어요' : '할일이 없어요!'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}
