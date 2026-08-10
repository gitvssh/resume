# Resume Schema v1

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 스키마는 PDF에서 추출된 이력서 텍스트를 `평가`, `JD 매칭`, `맞춤 재작성`, `PDF 렌더링`에 공통으로 사용할 수 있는 표준 형태로 정의한다.

중요 원칙:

- 텍스트 중심으로 다룬다.
- 사실을 보존한다.
- 사용자 수정이 가능해야 한다.
- 원본 텍스트와 구조화 결과를 함께 유지한다.

## 2. Top-Level Object

```json
{
  "resume_id": "string",
  "source_type": "pdf",
  "locale": "ko-KR",
  "raw_text": "string",
  "basics": {},
  "headline": "string",
  "summary": "string",
  "experiences": [],
  "projects": [],
  "skills": {},
  "education": [],
  "certifications": [],
  "links": [],
  "quality_signals": {},
  "parse_metadata": {}
}
```

## 3. Top-Level Fields

| Field | Type | Required | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `resume_id` | `string` | no | 세션 또는 저장 단위 식별자 | DB 키와 동일할 필요는 없음 |
| `source_type` | `string` | yes | 입력 문서 타입 | v1은 `pdf`만 허용 |
| `locale` | `string` | yes | 문서 언어/로케일 | 기본값 `ko-KR` |
| `raw_text` | `string` | yes | 추출된 전체 원문 텍스트 | 사용자 수정 전/후 버전 구분 필요 |
| `basics` | `object` | yes | 기본 신상/연락 정보 | 저장 시 마스킹 대상 |
| `headline` | `string` | no | 이력서 상단 한 줄 요약 | 없으면 빈 값 허용 |
| `summary` | `string` | no | 경력 요약 | 3~6문장 정도로 정규화 가능 |
| `experiences` | `array` | yes | 경력 항목 목록 | 핵심 평가 단위 |
| `projects` | `array` | no | 프로젝트 항목 목록 | 경력 항목에 포함된 경우 중복 없이 매핑 필요 |
| `skills` | `object` | yes | 기술 스택 묶음 | 카테고리별 분리 |
| `education` | `array` | no | 학력 항목 목록 | |
| `certifications` | `array` | no | 자격증/시험 항목 목록 | |
| `links` | `array` | no | GitHub, 블로그 등 외부 링크 | |
| `quality_signals` | `object` | no | 품질 평가용 구조적 신호 | 정량 표현 여부 등 |
| `parse_metadata` | `object` | yes | 추출/파싱 상태 정보 | 실패 유형 구분 포함 |

## 4. `basics`

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "years_of_experience": 0,
  "current_title": "string"
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | `string` | no | 저장 시 마스킹 대상 |
| `email` | `string` | no | 저장 시 마스킹 대상 |
| `phone` | `string` | no | 저장 시 마스킹 대상 |
| `location` | `string` | no | 도시 수준으로만 남겨도 됨 |
| `years_of_experience` | `number` | no | 계산값으로도 채울 수 있음 |
| `current_title` | `string` | no | 가장 최근 경력 기준 |

## 5. `experiences[]`

```json
{
  "experience_id": "string",
  "company_name": "string",
  "company_domain": "string",
  "title": "string",
  "employment_type": "string",
  "location": "string",
  "start_date": "YYYY-MM",
  "end_date": "YYYY-MM",
  "is_current": false,
  "summary": "string",
  "achievements": [],
  "tech_stack": [],
  "keywords": [],
  "source_blocks": []
}
```

| Field | Type | Required | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `experience_id` | `string` | yes | 항목 식별자 | diff와 참조에 사용 |
| `company_name` | `string` | yes | 회사명 | 저장 시 마스킹 가능 |
| `company_domain` | `string` | no | 도메인/산업군 | 매칭에 사용 |
| `title` | `string` | yes | 직함 | |
| `employment_type` | `string` | no | 정규직/계약직 등 | |
| `location` | `string` | no | 근무 지역 | |
| `start_date` | `string` | yes | 시작일 | 월 단위 권장 |
| `end_date` | `string` | no | 종료일 | 현재 재직이면 비움 |
| `is_current` | `boolean` | yes | 현재 재직 여부 | |
| `summary` | `string` | no | 역할 개요 | |
| `achievements` | `array` | yes | 성과 bullet 목록 | 핵심 재작성 단위 |
| `tech_stack` | `array` | no | 사용 기술 | JD 매칭에 사용 |
| `keywords` | `array` | no | 추출 키워드 | 검색/매칭 보조 |
| `source_blocks` | `array` | no | 원문 블록 참조 | 근거 추적용 |

### `achievements[]`

```json
{
  "achievement_id": "string",
  "text": "string",
  "metrics": [],
  "action_verbs": [],
  "impact_tags": [],
  "source_blocks": []
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `achievement_id` | `string` | yes | bullet 식별자 |
| `text` | `string` | yes | 원문 또는 사용자 수정 text |
| `metrics` | `array` | no | 수치 표현 추출 결과 |
| `action_verbs` | `array` | no | 개선 제안용 |
| `impact_tags` | `array` | no | 성능, 안정성, 비용절감 등 |
| `source_blocks` | `array` | no | 원문 근거 참조 |

## 6. `projects[]`

```json
{
  "project_id": "string",
  "name": "string",
  "role": "string",
  "context": "string",
  "start_date": "YYYY-MM",
  "end_date": "YYYY-MM",
  "summary": "string",
  "achievements": [],
  "tech_stack": [],
  "links": [],
  "source_blocks": []
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `project_id` | `string` | yes | 항목 식별자 |
| `name` | `string` | yes | 프로젝트명 |
| `role` | `string` | no | 담당 역할 |
| `context` | `string` | no | 개인/회사/팀 프로젝트 구분 |
| `start_date` | `string` | no | |
| `end_date` | `string` | no | |
| `summary` | `string` | no | 프로젝트 개요 |
| `achievements` | `array` | no | 핵심 결과 bullet |
| `tech_stack` | `array` | no | |
| `links` | `array` | no | GitHub, 배포 링크 등 |
| `source_blocks` | `array` | no | 근거 추적용 |

## 7. `skills`

```json
{
  "languages": [],
  "frameworks": [],
  "databases": [],
  "infrastructure": [],
  "tools": [],
  "other": []
}
```

원칙:

- 기술명은 가능한 한 정규화한다.
- `Spring Boot`와 `Spring`처럼 중복 가능성이 있는 항목은 추후 normalization 규칙을 둔다.
- 백엔드 직군에서는 `languages`, `frameworks`, `databases`, `infrastructure`를 특히 중요하게 본다.

## 8. `education[]`, `certifications[]`, `links[]`

각 배열은 최소 아래 필드를 가진다.

### `education[]`

```json
{
  "school": "string",
  "degree": "string",
  "major": "string",
  "start_date": "YYYY-MM",
  "end_date": "YYYY-MM"
}
```

### `certifications[]`

```json
{
  "name": "string",
  "issuer": "string",
  "acquired_date": "YYYY-MM"
}
```

### `links[]`

```json
{
  "label": "string",
  "url": "string",
  "type": "github|blog|portfolio|linkedin|other"
}
```

## 9. `quality_signals`

```json
{
  "has_quantified_impact": false,
  "has_clear_role_descriptions": false,
  "has_backend_relevant_experience": false,
  "has_operational_scale_signal": false,
  "bullet_count": 0,
  "unknown_sections": []
}
```

용도:

- 평가 엔진의 입력
- 빠른 약점 탐지
- rewrite priority 결정

## 10. `parse_metadata`

```json
{
  "extraction_method": "string",
  "overall_confidence": 0.0,
  "ocr_failed": false,
  "structure_failed": false,
  "issues": [],
  "last_reviewed_by_user": false
}
```

원칙:

- `ocr_failed`와 `structure_failed`는 반드시 분리한다.
- 사용자가 추출 텍스트를 수정했는지 추적해야 한다.
- confidence는 전체값과 섹션별 값으로 확장 가능하다.

## 11. Normalization Rules

- 날짜는 가능하면 `YYYY-MM`으로 정규화한다.
- 현재 재직 여부는 `is_current`로 명시한다.
- 수치 표현은 원문을 보존한 채 별도 `metrics`로 추출한다.
- 기술 스택은 중복 제거 전 원문을 보존하고, 정규화 결과를 별도 저장할 수 있다.

## 12. v1 Open Decisions

- `experience`와 `project`의 경계를 어디까지 자동으로 나눌지
- `source_blocks`를 block 단위로 둘지 span 단위로 둘지
- 사용자 수정 후 `raw_text`를 원본/수정본으로 모두 남길지 여부
