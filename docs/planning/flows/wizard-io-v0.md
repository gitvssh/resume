# Wizard Input Output v0

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 문서는 `Resume Tailor` v0 wizard의 각 단계가 어떤 입력을 받고 어떤 출력을 만드는지 정리한다.

목표:

- 구현 전에 단계별 책임을 고정한다.
- parser, evaluator, rewriter, renderer가 어떤 object를 주고받는지 맞춘다.
- UI와 백엔드가 같은 흐름을 보게 한다.

## 2. 전체 흐름

1. PDF 업로드
2. 텍스트 확인/수정
3. 마스터 이력서 분석
4. JD 입력/확인
5. 맞춤 재작성
6. 최종 검토
7. PDF 출력

## 3. 공통 object

### `SessionContext`

```json
{
  "session_id": "string",
  "resume_id": "string",
  "job_snapshot_id": "string",
  "tailored_resume_id": "string",
  "status": "string"
}
```

### `ResumeDocument`

- 참조: [Resume Schema v1](../schemas/resume-schema-v1.md)

### `JobSnapshot`

- 참조: [JD Schema v1](../schemas/jd-schema-v1.md)

### `TailoredResume`

- 참조: [Tailored Resume v0](../schemas/tailored-resume-v0.md)

### `TemplateSpec`, `ExportRequest`, `ExportArtifact`

- 참조: [Export Model v0](../schemas/export-model-v0.md)

### `ReviewEditModel`

- 참조: [Review Edit Model v0](./review-edit-model-v0.md)

### `RubricEvaluation`

- 참조: [Backend Resume Rubric v0](../rubrics/backend-rubric-v0.md)

## 4. Step 1. PDF 업로드

입력:

```json
{
  "file": "resume.pdf"
}
```

처리:

- PDF 텍스트 추출
- 기본 메타데이터 생성
- extraction confidence 계산

출력:

```json
{
  "session": {},
  "extracted_text": "string",
  "extraction_metadata": {
    "source_type": "pdf",
    "overall_confidence": 0.0,
    "ocr_failed": false
  }
}
```

다음 단계로 넘길 것:

- 원문 텍스트
- 추출 confidence

## 5. Step 2. 텍스트 확인/수정

입력:

```json
{
  "extracted_text": "string",
  "extraction_metadata": {}
}
```

처리:

- 사용자가 텍스트를 검토하고 수정
- 섹션 자동 분류
- Resume schema v1 구조화

출력:

```json
{
  "resume_document": {},
  "user_edited_text": "string",
  "parse_metadata": {
    "overall_confidence": 0.0,
    "ocr_failed": false,
    "structure_failed": false,
    "last_reviewed_by_user": true
  }
}
```

다음 단계로 넘길 것:

- 구조화된 `ResumeDocument`
- 사용자 수정 여부

## 6. Step 3. 마스터 이력서 분석

입력:

```json
{
  "resume_document": {}
}
```

처리:

- quality signal 계산
- 최소 rubric 기준의 사전 평가
- rewrite 우선순위 도출

출력:

```json
{
  "resume_document": {},
  "pre_rewrite_evaluation": {
    "gate_result": {},
    "scores": {},
    "weighted_total": 0,
    "rewrite_priorities": []
  }
}
```

다음 단계로 넘길 것:

- 현재 약점
- 우선 보강할 경험/프로젝트/문장

## 7. Step 4. JD 입력/확인

입력:

```json
{
  "job_input_type": "text|url",
  "raw_job_input": "string"
}
```

처리:

- JD 원문 확보
- JD schema v1 구조화
- 필수/우대/연차/도메인 추출

출력:

```json
{
  "job_snapshot": {},
  "parse_metadata": {
    "overall_confidence": 0.0,
    "ambiguous_requirements": []
  }
}
```

다음 단계로 넘길 것:

- 구조화된 `JobSnapshot`
- 애매한 requirement 목록

## 8. Step 5. 맞춤 재작성

입력:

```json
{
  "resume_document": {},
  "job_snapshot": {},
  "rewrite_mode": "conservative|balanced"
}
```

처리:

- JD와 resume 대응 관계 계산
- 맞춤 요약/경력/프로젝트 재배치
- 문장 재작성
- diff 생성
- 근거 매핑 생성
- fact-check 실행
- post-rewrite rubric 평가

출력:

```json
{
  "tailored_resume_draft": {},
  "diff": [],
  "rewrite_rationale": [],
  "fact_check_result": {},
  "post_rewrite_evaluation": {}
}
```

다음 단계로 넘길 것:

- [Tailored Resume v0](../schemas/tailored-resume-v0.md) 객체
- diff
- 수정 이유
- fact-check 결과
- post-rewrite evaluation

## 9. Step 6. 최종 검토

입력:

```json
{
  "tailored_resume_draft": {},
  "diff": [],
  "rewrite_rationale": [],
  "fact_check_result": {}
}
```

처리:

- 사용자 수동 편집
- 위험 문장 재확인
- `user_edit_log` 반영
- 출력 가능 여부 확정

출력:

```json
{
  "approved_tailored_resume": {},
  "user_edits": [],
  "ready_to_export": true
}
```

다음 단계로 넘길 것:

- 최종 승인된 맞춤 이력서
- 사용자 편집 기록

## 10. Step 7. PDF 출력

입력:

```json
{
  "approved_tailored_resume": {},
  "export_request": {
    "template_id": "string",
    "format": "pdf",
    "include_personal_info": true
  }
}
```

처리:

- `TemplateSpec` 선택
- `ExportRequest` 생성
- `RenderPayload` 구성
- 선택한 템플릿에 맞춰 렌더링
- PDF 생성

출력:

```json
{
  "export_request": {},
  "export_artifact": {
    "export_id": "string",
    "template_id": "string",
    "download_ref": "string",
    "status": "completed"
  }
}
```

다음 단계로 넘길 것:

- [ExportArtifact](../schemas/export-model-v0.md) 객체

## 11. 단계별 필수 게이트

| Step | 필수 게이트 |
| --- | --- |
| 2 | `ocr_failed = false` 또는 사용자 수정 완료 |
| 4 | JD 핵심 requirement 최소 구조화 완료 |
| 5 | [Fact-Check Policy v0](../policies/fact-check-policy-v0.md) 통과 |
| 6 | 사용자 검토 완료, [Review Edit Model v0](./review-edit-model-v0.md) 반영 |
| 7 | `ready_to_export = true` |

## 12. v0 Open Decisions

- Step 3의 사전 평가 결과를 사용자에게 얼마나 보여줄지
- `Tailored Resume`의 item 단위를 bullet 중심으로 더 단순화할지
- `user_edits`를 얼마나 상세히 저장할지
