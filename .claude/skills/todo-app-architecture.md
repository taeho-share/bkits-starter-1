---
name: todo-app-architecture
description: 프로젝트 전체 아키텍처 이해가 필요할 때 참조. Use when working with project structure, adding new features, or refactoring.
---

# Todo App Architecture

## 기술 스택
- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS v4
- **상태관리**: Zustand 5 (localStorage 영속성)
- **아이콘**: Lucide React
- **패키지매니저**: npm

## 아키텍처 레이어 (의존성 방향: domain → application → components)

```
domain/entities/     ← 비즈니스 타입 정의 (외부 의존 없음)
application/store/   ← 상태 관리 (domain만 의존)
components/          ← UI (domain + application 의존)
app/                 ← 라우팅 (components만 사용)
```

## 핵심 타입 (domain/entities/todo.ts)

```typescript
type Priority = 'high' | 'medium' | 'low';
type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';
type Status = 'todo' | 'completed';

interface Todo {
  id: string;
  title: string;
  priority: Priority;
  category: Category;
  status: Status;
  // ...
}
```

## 새 기능 추가 시 체크리스트
1. 타입 변경이 필요하면 `domain/entities/todo.ts` 먼저 수정
2. 상태 변경이 필요하면 `application/store/todoStore.ts` 수정
3. UI는 Atomic Design 계층에 맞게 추가
4. 샘플 데이터는 `mocks/todos.json` 업데이트
