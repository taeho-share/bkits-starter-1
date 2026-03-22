@AGENTS.md

# Development Workflow

## 패키지 관리
- **항상 `npm` 사용** (package-lock.json 기준)

## 개발 순서
1. 변경 사항 작성
2. 타입체크: `npx tsc --noEmit`
3. 린트: `npm run lint`
4. 빌드: `npm run build`
5. 개발 서버: `npm run dev`

## 코딩 컨벤션
- `type` 선호, `interface` 자제
- **`enum` 절대 금지** → 문자열 리터럴 유니온 사용
- `any` 타입 사용 금지
- `console.log` 사용 금지

## 프로젝트 구조 (Atomic Design + 클린 아키텍처)

```
src/
├── app/                      # Next.js App Router (페이지)
├── components/               # UI 컴포넌트 (Atomic Design)
│   ├── atoms/                # 버튼, 배지 등 기본 요소
│   ├── molecules/            # 카드, 폼 등 조합 컴포넌트
│   ├── organisms/            # 헤더, 리스트 등 섹션
│   └── templates/            # 페이지 레이아웃
├── domain/                   # 비즈니스 로직
│   └── entities/             # Todo 타입 정의
├── application/              # 애플리케이션 레이어
│   └── store/                # Zustand 스토어
├── infrastructure/           # 외부 연동 (필요 시)
└── lib/                      # 유틸리티 함수
mocks/                        # 테스트용 JSON 데이터
```

## 주요 파일
- `src/domain/entities/todo.ts` — Todo 타입 정의
- `src/application/store/todoStore.ts` — 상태 관리 (Zustand + localStorage)
- `src/components/organisms/TodoList.tsx` — 메인 목록 + 필터
- `src/components/molecules/TodoCard.tsx` — 할일 카드
- `mocks/todos.json` — 샘플 데이터

## 금지 사항
- ❌ `interface` 대신 `type` 사용
- ❌ `enum` 사용 → 문자열 리터럴 유니온으로 대체
- ❌ `any` 타입
- ❌ 불필요한 `console.log`
- ❌ `node_modules` 직접 수정
