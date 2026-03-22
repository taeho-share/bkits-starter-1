'use client';

import { useTodoStore } from '@/application/store/todoStore';
import { CheckCircle2 } from 'lucide-react';

export function Header() {
  const { todos } = useTodoStore();
  const completed = todos.filter((t) => t.status === 'completed').length;
  const total = todos.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const now = new Date();
  const dateStr = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-900">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-lg">My Todo</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{dateStr}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{progress}%</p>
          <p className="text-xs text-gray-400">완료율</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500">
        전체 <strong className="text-gray-900">{total}개</strong> 중{' '}
        <strong className="text-gray-900">{completed}개</strong> 완료
      </p>
    </header>
  );
}
