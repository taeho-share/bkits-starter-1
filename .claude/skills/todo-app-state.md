---
name: todo-app-state
description: 상태 관리 작업 시 참조. Use when working with Zustand store, adding state, or managing todo data persistence.
---

# Todo App State Management

## 기술: Zustand 5 + localStorage

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({ ... }),
    { name: 'todo-storage' }  // localStorage 키
  )
);
```

## 현재 상태 구조 (todoStore.ts)

```typescript
interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'status'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
}
```

## 상태 추가 방법

```typescript
// 1. 타입 확장 (todoStore.ts의 TodoStore 인터페이스)
interface TodoStore {
  newField: string;  // 추가
  setNewField: (value: string) => void;  // 추가
}

// 2. 구현 추가 (create 안에)
newField: '',
setNewField: (value) => set({ newField: value }),
```

## 규칙
- 파생 데이터(필터링, 정렬)는 컴포넌트에서 `useMemo`로 계산
- 스토어에는 원본 데이터와 액션만 유지
- `persist` 미들웨어로 새로고침 후에도 데이터 유지됨

## localStorage 확인
```javascript
// 브라우저 콘솔에서
JSON.parse(localStorage.getItem('todo-storage'))
```
