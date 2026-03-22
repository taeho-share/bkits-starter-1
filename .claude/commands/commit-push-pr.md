# 커밋 → 푸시 → PR

변경 사항을 커밋하고, 원격 저장소에 푸시하며, Pull Request를 생성합니다.

## 실행 순서

1. **상태 확인**: `git status`
2. **타입체크**: `npx tsc --noEmit`
3. **린트**: `npm run lint`
4. **스테이징**: `git add -p` (변경 파일 선택적 추가)
5. **커밋**: `git commit -m "{type}: {description}"`
6. **푸시**: `git push origin {branch}`
7. **PR 생성**: `gh pr create`

## 커밋 타입
- `feat`: 새 기능
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: 스타일/포맷 변경
- `docs`: 문서 수정
- `chore`: 빌드/설정 변경

## 주의사항
- 푸시 전 반드시 타입체크 통과 확인
- 커밋 메시지는 한국어 또는 영어로 작성
