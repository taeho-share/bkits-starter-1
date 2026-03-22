---
name: todo-app-components
description: UI 컴포넌트 작업 시 참조. Use when creating or modifying React components, following Atomic Design.
---

# Todo App Components (Atomic Design)

## 계층 구조

| 계층 | 경로 | 예시 | 규칙 |
|------|------|------|------|
| Atoms | `components/atoms/` | Button, Badge | 외부 상태 의존 없음 |
| Molecules | `components/molecules/` | TodoCard, AddTodoForm | Atoms 조합, 스토어 직접 사용 가능 |
| Organisms | `components/organisms/` | Header, TodoList | 전체 섹션, 비즈니스 로직 포함 |
| Templates | `components/templates/` | MainLayout | 레이아웃만, 데이터 없음 |

## 컴포넌트 작성 규칙

```typescript
// ✅ 올바른 예
'use client'; // 상호작용이 있으면 필수

interface Props {
  todo: Todo;  // type 사용 (interface 지양)
}

export function TodoCard({ todo }: Props) {
  // ...
}

// ❌ 금지
interface Props { ... }  // interface 대신 type 사용
```

## 스타일링 (Tailwind CSS v4)
- `cn()` 헬퍼 사용: `import { cn } from '@/lib/utils'`
- 조건부 클래스: `cn('base', condition && 'active')`
- 반응형: `sm:`, `md:`, `lg:` 순서로 작성

## 현재 컴포넌트 목록
- **atoms**: Button, Badge
- **molecules**: TodoCard, AddTodoForm
- **organisms**: Header, TodoList
- **templates**: MainLayout
