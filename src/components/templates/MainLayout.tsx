import { Header } from '@/components/organisms/Header';
import { TodoList } from '@/components/organisms/TodoList';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <Header />
        <TodoList />
      </div>
    </div>
  );
}
