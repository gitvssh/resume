# Tailored Resume v0

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 문서는 `Resume Tailor` v0에서 JD 맞춤 재작성 결과를 표현하는 최소 중간 객체를 정의한다.

이 객체의 역할:

- Step 5의 자동 재작성 결과를 담는다.
- Step 6의 사용자 수정 결과를 반영한다.
- Step 7의 PDF 출력 입력이 된다.
- 공고별 파생본 저장 단위의 기준이 된다.

즉, `Tailored Resume`는 단순 텍스트 출력물이 아니라 `재작성 결과 + 근거 + 검토 상태`를 함께 가지는 작업 객체다.

## 2. 설계 원칙

- 원본 이력서와 JD를 직접 복제하지 않고 참조한다.
- 사실 보존 검사를 통과한 결과만 `ready_to_export`가 될 수 있다.
- diff와 rationale, evidence를 객체 안에 묶는다.
- 사용자가 최종 편집한 결과와 자동 생성 결과를 구분할 수 있어야 한다.
- v0에서는 공고별 최소 1개 파생본 저장을 지원할 수 있어야 한다.

## 3. Top-Level Object

```json
{
  "tailored_resume_id": "string",
  "resume_id": "string",
  "job_snapshot_id": "string",
  "rewrite_mode": "conservative|balanced",
  "status": "draft|reviewed|ready_to_export|exported",
  "document_meta": {},
  "header": {},
  "summary": "string",
  "sections": [],
  "diff": [],
  "user_edit_log": [],
  "rewrite_rationale": [],
  "evidence_map": [],
  "fact_check_result": {},
  "post_rewrite_evaluation": {},
  "review_state": {},
  "export_state": {},
  "timestamps": {}
}
```

## 4. Top-Level Fields

| Field | Type | Required | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `tailored_resume_id` | `string` | yes | 파생본 식별자 | 공고별 draft 저장 기준 |
| `resume_id` | `string` | yes | 원본 ResumeDocument 참조 | |
| `job_snapshot_id` | `string` | yes | 대상 JD 참조 | |
| `rewrite_mode` | `string` | yes | 재작성 강도 | v0는 `conservative`, `balanced`만 허용 |
| `status` | `string` | yes | 파생본 상태 | 초안/검토/출력 준비/출력 완료 |
| `document_meta` | `object` | yes | 문서 수준 메타 정보 | 제목, 템플릿 후보 등 |
| `header` | `object` | yes | 상단 기본 정보 | 이름/연락처는 참조 또는 복원 대상 |
| `summary` | `string` | no | 맞춤 요약 | |
| `sections` | `array` | yes | 출력 순서가 있는 섹션 목록 | 핵심 본문 |
| `diff` | `array` | yes | 원본 대비 변경 목록 | 사용자 표시와 검토에 사용 |
| `user_edit_log` | `array` | no | 사용자 직접 수정 요약 로그 | keystroke 저장 아님 |
| `rewrite_rationale` | `array` | yes | 왜 이렇게 바뀌었는지 설명 | |
| `evidence_map` | `array` | yes | 원문 근거와 JD 대응 관계 | Gate B 입력 |
| `fact_check_result` | `object` | yes | 사실 보존 검사 결과 | Gate A 입력 |
| `post_rewrite_evaluation` | `object` | yes | 재작성 후 rubric 평가 | 품질 판단용 |
| `review_state` | `object` | yes | 사용자 검토 상태 | Step 6 관리 |
| `export_state` | `object` | yes | 출력 준비 상태 | Step 7 관리 |
| `timestamps` | `object` | yes | 생성/수정 시점 | |

## 5. `document_meta`

```json
{
  "title": "string",
  "target_role": "string",
  "company_name": "string",
  "template_hint": "string",
  "language": "ko-KR"
}
```

용도:

- 어떤 공고용 문서인지 빠르게 식별
- export 템플릿 선택 보조

## 6. `header`

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "links": []
}
```

원칙:

- 저장 시 PII 마스킹 정책과 연결된다.
- export 직전에는 복원 가능한 형태여야 한다.

## 7. `sections[]`

`sections`는 렌더링 순서를 보존하는 배열이다.

```json
{
  "section_id": "string",
  "section_type": "summary|experience|project|skills|education|certification|link",
  "title": "string",
  "items": [],
  "source_refs": [],
  "jd_refs": [],
  "user_edited": false
}
```

### 섹션 설계 원칙

- 출력 순서를 그대로 저장한다.
- 같은 경험이라도 JD 목적에 맞게 위치가 바뀔 수 있다.
- 각 섹션은 원본 이력서와 JD 근거를 최소 1개 이상 가질 수 있어야 한다.

## 8. `sections[].items[]`

item은 실제 렌더링 가능한 최소 단위다.

```json
{
  "item_id": "string",
  "item_type": "bullet|paragraph|skill_group|entry_header",
  "text": "string",
  "source_refs": [],
  "jd_refs": [],
  "edit_origin": "system|user",
  "fact_check_status": "pass|needs_review|fail"
}
```

원칙:

- v0에서 문장 단위 추적이 필요한 항목은 `item` 수준에서 다룬다.
- 사용자 수정이 들어간 항목은 `edit_origin = user`로 표시한다.
- `fact_check_status = fail`인 item은 export 불가다.

## 9. `diff[]`

```json
{
  "diff_id": "string",
  "change_type": "add|remove|move|rewrite",
  "target_item_id": "string",
  "before_text": "string",
  "after_text": "string",
  "source_refs": [],
  "jd_refs": []
}
```

용도:

- 사용자 검토용 변경 표시
- 왜 바뀌었는지 설명과 연결

## 10. `rewrite_rationale[]`

```json
{
  "rationale_id": "string",
  "target_item_id": "string",
  "reason_type": "jd_alignment|clarity|impact|structure|deduplication",
  "message": "string",
  "source_refs": [],
  "jd_refs": []
}
```

원칙:

- rationale은 사용자에게 보여줄 수 있을 만큼 짧고 명확해야 한다.
- 하나의 item은 여러 rationale을 가질 수 있다.

## 10.5 `user_edit_log[]`

참조:

- [Review Edit Model v0](../flows/review-edit-model-v0.md)

최소 형태:

```json
{
  "edit_id": "string",
  "item_id": "string",
  "before_text": "string",
  "after_text": "string",
  "edited_at": "datetime"
}
```

## 11. `evidence_map[]`

```json
{
  "item_id": "string",
  "source_refs": [],
  "jd_refs": [],
  "coverage_note": "string"
}
```

용도:

- `어떤 원문`과 `어떤 JD requirement`를 반영했는지 추적
- Gate B 판단

## 12. `fact_check_result`

참조:

- [Fact-Check Policy v0](../policies/fact-check-policy-v0.md)

최소 형태:

```json
{
  "gate_a_result": "pass",
  "checks": [],
  "required_actions": []
}
```

## 13. `post_rewrite_evaluation`

참조:

- [Backend Resume Rubric v0](../rubrics/backend-rubric-v0.md)

최소 형태:

```json
{
  "gate_result": {},
  "scores": {},
  "weighted_total": 0,
  "rewrite_priorities": []
}
```

## 14. `review_state`

```json
{
  "user_reviewed": false,
  "user_edit_count": 0,
  "edited_item_ids": [],
  "last_edited_at": "datetime",
  "has_blocking_issue": false,
  "blocking_reasons": []
}
```

용도:

- Step 6 완료 여부 판단
- KPI인 사용자 수동 수정량 측정
- 사용자 수정 item 추적

## 15. `export_state`

```json
{
  "ready_to_export": false,
  "template_id": null,
  "last_export_request_id": null,
  "last_export_id": null
}
```

원칙:

- `fact_check_result.gate_a_result = pass`
- `post_rewrite_evaluation.gate_result.user_reviewability = pass`
- `review_state.user_reviewed = true`
- export 관련 상세 규칙은 [Export Model v0](./export-model-v0.md)를 따른다.

위 조건을 만족해야 `ready_to_export = true`가 된다.

## 16. `timestamps`

```json
{
  "created_at": "datetime",
  "updated_at": "datetime",
  "reviewed_at": "datetime",
  "exported_at": "datetime"
}
```

## 17. 최소 저장 단위 제안

v0에서 저장은 아래 정도면 충분하다.

- `resume_id`
- `job_snapshot_id`
- `tailored_resume_id`
- `status`
- `summary`
- `sections`
- `diff`
- `rewrite_rationale`
- `fact_check_result`
- `review_state`
- `export_state`
- `timestamps`

즉, 공고별로 `Tailored Resume` 1개 초안과 최신 수정본 1개 정도를 유지하는 모델로 시작하면 된다.

## 18. v0 Open Decisions

- `sections[].items[]`를 bullet 중심으로 더 단순화할지 여부
- `header`를 원본 참조만 둘지 별도 복사 저장할지 여부
- 공고별로 초안 히스토리를 남길지, 최신본만 유지할지 여부
