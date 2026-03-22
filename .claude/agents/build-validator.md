---
name: build-validator
description: 빌드 및 타입체크를 실행하고 오류를 분석합니다. PR 제출 전 사용하세요.
---

# Build Validator Agent

다음 순서로 검증합니다:

1. `npx tsc --noEmit` — TypeScript 타입 오류 확인
2. `npm run lint` — ESLint 오류 확인
3. `npm run build` — Next.js 프로덕션 빌드

오류가 있으면 각 오류의 원인과 수정 방법을 단계별로 설명해주세요.
