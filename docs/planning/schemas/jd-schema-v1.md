# JD Schema v1

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 스키마는 채용공고를 `매칭`, `평가`, `맞춤 재작성`에 사용할 수 있는 표준 형태로 정의한다.

중요 원칙:

- v1은 경력직 백엔드 개발자 공고를 기준으로 설계한다.
- JD 원문을 보존한다.
- `필수`, `우대`, `연차`, `도메인`, `핵심 업무`를 분리한다.

## 2. Top-Level Object

```json
{
  "job_snapshot_id": "string",
  "source_type": "text_or_url",
  "source_url": "string",
  "captured_at": "datetime",
  "raw_text": "string",
  "company_name": "string",
  "role_title": "string",
  "team_name": "string",
  "domain": "string",
  "employment_type": "string",
  "location": "string",
  "work_model": "onsite|hybrid|remote|unknown",
  "seniority": {},
  "responsibilities": [],
  "required_requirements": [],
  "preferred_requirements": [],
  "keywords": [],
  "parse_metadata": {}
}
```

## 3. Top-Level Fields

| Field | Type | Required | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `job_snapshot_id` | `string` | no | JD 스냅샷 식별자 | URL 입력 시 생성 가능 |
| `source_type` | `string` | yes | 입력 방식 | `text`, `url` |
| `source_url` | `string` | no | JD 원본 URL | 자체 DB 사용 시 내부 식별자도 가능 |
| `captured_at` | `string` | no | 스냅샷 시점 | |
| `raw_text` | `string` | yes | JD 전체 원문 | 후처리와 회귀 테스트에 필요 |
| `company_name` | `string` | no | 회사명 | |
| `role_title` | `string` | yes | 공고 직무명 | 예: Backend Engineer |
| `team_name` | `string` | no | 팀명 | |
| `domain` | `string` | no | 산업/제품 도메인 | 예: fintech, commerce |
| `employment_type` | `string` | no | 정규직, 계약직 등 | |
| `location` | `string` | no | 근무 지역 | |
| `work_model` | `string` | no | 출근 형태 | |
| `seniority` | `object` | yes | 연차/숙련도 요구 | 매칭의 핵심 |
| `responsibilities` | `array` | yes | 주요 업무 | 재작성 강조 포인트와 연결 |
| `required_requirements` | `array` | yes | 필수 조건 | |
| `preferred_requirements` | `array` | no | 우대 조건 | |
| `keywords` | `array` | no | 검색/매칭용 키워드 | |
| `parse_metadata` | `object` | yes | 구조화 품질 정보 | |

## 4. `seniority`

```json
{
  "min_years": 0,
  "max_years": null,
  "level_label": "junior|mid|senior|lead|unknown",
  "notes": "string"
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `min_years` | `number` | no | 없으면 null 허용 |
| `max_years` | `number` | no | 거의 비어 있을 가능성 높음 |
| `level_label` | `string` | yes | 정규화 라벨 |
| `notes` | `string` | no | 원문 의미 보존용 |

## 5. `responsibilities[]`

```json
{
  "responsibility_id": "string",
  "text": "string",
  "category": "backend|platform|data|ops|collaboration|other",
  "keywords": []
}
```

용도:

- JD가 실제로 기대하는 업무 유형을 잡는다.
- 경험 bullet과 어떤 항목을 연결해야 할지 판단한다.

## 6. `required_requirements[]` and `preferred_requirements[]`

```json
{
  "requirement_id": "string",
  "type": "skill|experience|domain|education|tool|other",
  "text": "string",
  "normalized_value": "string",
  "importance": "must|strong_preference|nice_to_have",
  "category": "language|framework|database|infra|system_design|scale|collaboration|other"
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `requirement_id` | `string` | yes | 항목 식별자 |
| `type` | `string` | yes | 요구사항 종류 |
| `text` | `string` | yes | 원문 보존 |
| `normalized_value` | `string` | no | 매칭 엔진용 정규화 값 |
| `importance` | `string` | yes | 필수/우대 강도 |
| `category` | `string` | no | 백엔드 직군 분석용 분류 |

권장 카테고리 예시:

- `language`
- `framework`
- `database`
- `infra`
- `system_design`
- `scale`
- `observability`
- `security`
- `collaboration`

## 7. `keywords[]`

`keywords`는 아래 성격의 키워드를 섞어 담는다.

- 기술명
- 도메인 키워드
- 업무 키워드
- 문제 규모 신호

예시:

```json
[
  "java",
  "spring boot",
  "distributed systems",
  "high traffic",
  "fintech",
  "kafka"
]
```

## 8. `parse_metadata`

```json
{
  "parsed_from": "url|text|internal_db",
  "overall_confidence": 0.0,
  "missing_sections": [],
  "ambiguous_requirements": [],
  "last_reviewed_by_user": false
}
```

원칙:

- JD는 원문 품질 편차가 크므로 `ambiguous_requirements`를 따로 남긴다.
- 구조화가 애매한 항목은 억지 정규화보다 원문을 유지한 채 표시한다.

## 9. Matching-Oriented Derived Fields

아래 값들은 parser가 직접 채우지 않아도 되지만, 이후 매칭 엔진에서 파생 계산 대상으로 사용한다.

- `core_skill_set`
- `domain_fit_signals`
- `scale_signals`
- `backend_focus_score`

v1에서는 필드로 고정하지 않고 계산 결과로 별도 객체에 둘 수 있다.

## 10. Normalization Rules

- 동일 의미의 기술은 가능한 한 정규화한다.
- `3년 이상`, `5+ years` 같은 표현은 `seniority`로 정규화한다.
- `우대`, `선호`, `있으면 좋음`은 `preferred_requirements`로 분리한다.
- 애매한 요구사항은 억지 분류하지 말고 원문을 유지한다.

## 11. v1 Open Decisions

- `domain`을 단일 문자열로 둘지 태그 배열로 둘지
- `responsibilities`와 `requirements`를 얼마나 공격적으로 자동 분리할지
- 내부 공고 DB 스냅샷과 외부 URL 입력을 동일 object로 통합할지 여부
