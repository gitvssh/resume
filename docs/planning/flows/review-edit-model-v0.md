# Review Edit Model v0

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 문서는 Step 5의 자동 재작성 결과가 Step 6에서 어떻게 사용자 편집으로 바뀌는지 정의한다.

핵심 목표:

- 사용자 편집을 단순하게 반영한다.
- 전체 버전 히스토리 없이도 마지막 상태를 추적한다.
- 시스템 생성 결과와 사용자 수정 결과를 구분한다.

## 2. 기본 원칙

- 편집 단위는 `Tailored Resume.sections[].items[]`다.
- 사용자가 item을 수정하면 그 item의 현재 값만 갱신한다.
- keystroke 수준 히스토리는 남기지 않는다.
- 시스템 초안은 보존하지 않고, 필요한 최소 before/after 정보만 로그로 남긴다.
- export는 항상 현재 승인된 최신 작업본 기준으로 한다.

## 3. 편집 흐름

### Step 5 결과

Step 5가 끝나면 아래 상태가 만들어진다.

- `Tailored Resume.status = draft`
- 모든 item의 `edit_origin = system`
- `review_state.user_reviewed = false`
- `review_state.user_edit_count = 0`

### Step 6 편집

사용자가 item을 수정하면 아래가 일어난다.

1. 해당 item의 `text`를 새 값으로 갱신
2. 해당 item의 `edit_origin = user`
3. 해당 section의 `user_edited = true`
4. `review_state.user_edit_count` 증가
5. `review_state.edited_item_ids`에 item 추가
6. `user_edit_log`에 before/after 요약 추가
7. 필요 시 fact-check 재실행

### Step 6 완료

사용자가 검토를 끝내면 아래를 만족해야 한다.

- `review_state.user_reviewed = true`
- blocking issue 없음
- `export_state.ready_to_export = true`

## 4. `user_edit_log`

v0에서는 최소 아래 형태만 저장한다.

```json
{
  "edit_id": "string",
  "item_id": "string",
  "before_text": "string",
  "after_text": "string",
  "edited_at": "datetime"
}
```

원칙:

- 저장 버튼 또는 단계 완료 시점 기준으로만 기록한다.
- 모든 타이핑을 저장하지 않는다.
- 같은 item을 여러 번 수정해도 최신 편집 로그만 남겨도 v0에서는 충분하다.

## 5. diff 처리 원칙

v0에서는 두 종류의 차이를 엄격히 분리하지 않고 아래처럼 단순화한다.

- `diff`: 현재 최종 텍스트와 원본 ResumeDocument의 차이
- `user_edit_log`: 시스템 초안 이후 사용자가 직접 바꾼 흔적

즉:

- 사용자는 최종 결과 기준의 diff를 본다.
- 내부적으로는 user edit log로 `AI 초안 이후 수정`만 추적한다.

## 6. fact-check 재검사 규칙

아래 경우에는 item 단위 재검사를 다시 돌린다.

- 사용자가 숫자를 수정했을 때
- 역할 강도를 높이는 표현을 추가했을 때
- JD 키워드를 새로 삽입했을 때
- 새 기술명을 넣었을 때

그 외 단순 문장 다듬기는 최종 단계에서 일괄 재검사해도 된다.

## 7. 상태 전이

```text
draft
-> reviewed
-> ready_to_export
-> exported
```

전이 규칙:

- `draft -> reviewed`: 사용자가 검토 완료
- `reviewed -> ready_to_export`: fact-check 통과, blocking issue 없음
- `ready_to_export -> exported`: export 성공
- export 후 다시 수정하면 `latest_working`은 다시 `reviewed` 또는 `draft`로 내려갈 수 있다

## 8. `Tailored Resume`에 필요한 추가 필드

[Tailored Resume v0](../schemas/tailored-resume-v0.md)에 아래를 추가해 사용한다.

### top-level

- `user_edit_log`

### `review_state`

- `edited_item_ids`
- `last_edited_at`

## 9. v0에서 채택한 단순 모델

- 공고별 작업본은 1개만 편집한다.
- edit log는 최신 상태 복원용이 아니라 편집 흔적 요약용이다.
- 사용자가 export 후 다시 수정하면 새 버전을 만들지 않고 working copy를 갱신한다.
- 마지막 export 기준본은 별도로 유지한다.

## 10. 이후 확장 후보

- item별 다중 편집 히스토리
- undo/redo
- 자동 저장 세분화
- 시스템 초안과 사용자 최종본의 이중 diff 시각화
