# Export Model v0

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 문서는 `Resume Tailor` v0에서 PDF 출력 단계에 필요한 최소 객체를 정의한다.

v0에서 export는 아래 3개 객체로 나눈다.

- `TemplateSpec`: 어떤 템플릿을 쓸 수 있는가
- `ExportRequest`: 어떤 파생 이력서를 어떤 옵션으로 출력할 것인가
- `ExportArtifact`: 실제로 생성된 파일 결과는 무엇인가

이 분리가 필요한 이유:

- 템플릿 정의와 출력 요청을 분리해야 템플릿 재사용이 쉽다.
- 렌더러 입력과 최종 파일 메타데이터를 분리해야 상태 관리가 단순하다.
- `Tailored Resume` 객체는 내용 중심이고, export 객체는 출력 중심으로 책임을 나눌 수 있다.

## 2. 설계 원칙

- `Tailored Resume`가 `ready_to_export = true`일 때만 export 가능하다.
- v0는 자유 레이아웃 편집을 지원하지 않는다.
- 템플릿은 2~3개 수준의 고정 템플릿만 허용한다.
- 출력 포맷은 v0에서 `pdf`만 지원한다.
- 템플릿은 문서 구조를 바꾸지 않고, 표현과 배치를 담당한다.

## 3. `TemplateSpec`

`TemplateSpec`은 렌더러가 이해할 수 있는 템플릿 정의다.

```json
{
  "template_id": "string",
  "name": "string",
  "category": "ats_basic|clean_backend|project_focus",
  "description": "string",
  "is_default": false,
  "supports_sections": [],
  "layout_rules": {},
  "style_tokens": {},
  "constraints": {}
}
```

### 필드 설명

| Field | Type | Required | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | `string` | yes | 템플릿 식별자 | 예: `ats_basic_v1` |
| `name` | `string` | yes | 사용자 표시 이름 | |
| `category` | `string` | yes | 템플릿 분류 | v0는 3종 정도 |
| `description` | `string` | no | 템플릿 설명 | |
| `is_default` | `boolean` | yes | 기본 템플릿 여부 | |
| `supports_sections` | `array` | yes | 렌더 가능한 section type 목록 | |
| `layout_rules` | `object` | yes | 레이아웃 규칙 | 컬럼 수, section order policy 등 |
| `style_tokens` | `object` | yes | 폰트/간격/헤더 스타일 | 렌더러 토큰 |
| `constraints` | `object` | yes | 페이지 수, overflow 처리 정책 | |

### `layout_rules`

```json
{
  "columns": 1,
  "header_style": "compact",
  "section_order_mode": "input_order",
  "show_dividers": true
}
```

원칙:

- v0는 1단 레이아웃을 기본으로 본다.
- section 순서는 `Tailored Resume.sections`를 따른다.

### `style_tokens`

```json
{
  "font_family": "string",
  "base_font_size": 11,
  "line_height": 1.4,
  "section_title_weight": 700,
  "accent_mode": "none|minimal"
}
```

원칙:

- ATS 친화형 템플릿은 장식보다 가독성을 우선한다.
- v0는 화려한 시각 효과보다 안정적인 PDF 출력이 우선이다.

### `constraints`

```json
{
  "max_pages": 2,
  "truncate_strategy": "warn_only|trim_bullets",
  "require_contact_header": true
}
```

원칙:

- v0는 자동 줄임보다 `warn_only`가 기본이어야 한다.
- 내용 손실이 발생할 수 있는 자동 trimming은 신중하게 다룬다.

## 4. v0 권장 템플릿 세트

### `ats_basic_v1`

- 가장 기본형
- 장식 최소화
- ATS 친화성 우선

### `clean_backend_v1`

- 경력/프로젝트 균형형
- 백엔드 경력자 이력서 가독성 우선

### `project_focus_v1`

- 프로젝트 비중이 큰 경력자용
- 프로젝트 섹션 강조

## 5. `ExportRequest`

`ExportRequest`는 Step 7에서 렌더러로 넘기는 출력 요청 객체다.

```json
{
  "export_request_id": "string",
  "tailored_resume_id": "string",
  "template_id": "string",
  "format": "pdf",
  "locale": "ko-KR",
  "include_personal_info": true,
  "status": "requested|rendering|completed|failed",
  "requested_at": "datetime"
}
```

### 필드 설명

| Field | Type | Required | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `export_request_id` | `string` | yes | 출력 요청 식별자 | |
| `tailored_resume_id` | `string` | yes | 출력 대상 파생본 | |
| `template_id` | `string` | yes | 선택 템플릿 | |
| `format` | `string` | yes | 출력 포맷 | v0는 `pdf`만 |
| `locale` | `string` | yes | 렌더링 로케일 | |
| `include_personal_info` | `boolean` | yes | PII 포함 여부 | 다운로드용은 보통 `true` |
| `status` | `string` | yes | 요청 상태 | |
| `requested_at` | `string` | yes | 요청 시각 | |

## 6. `RenderPayload`

renderer가 실제로 읽는 입력 객체다.

```json
{
  "export_request": {},
  "template_spec": {},
  "document": {
    "header": {},
    "summary": "string",
    "sections": []
  }
}
```

원칙:

- `RenderPayload.document`는 `Tailored Resume`에서 export 가능한 필드만 추린 projection이다.
- fact-check 실패 항목이나 blocking issue가 있으면 payload 생성 전에 막는다.

## 7. `ExportArtifact`

`ExportArtifact`는 생성된 파일 결과를 나타낸다.

```json
{
  "export_id": "string",
  "export_request_id": "string",
  "tailored_resume_id": "string",
  "template_id": "string",
  "format": "pdf",
  "file_name": "string",
  "status": "completed|failed",
  "download_ref": "string",
  "page_count": 0,
  "generated_at": "datetime",
  "failure_reason": "string"
}
```

### 필드 설명

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `export_id` | `string` | yes | 생성 결과 식별자 |
| `export_request_id` | `string` | yes | 어떤 요청의 결과인지 추적 |
| `tailored_resume_id` | `string` | yes | 어떤 파생본에서 생성됐는지 추적 |
| `template_id` | `string` | yes | 어떤 템플릿으로 생성됐는지 기록 |
| `format` | `string` | yes | v0는 `pdf` |
| `file_name` | `string` | yes | 다운로드 파일명 |
| `status` | `string` | yes | 완료/실패 |
| `download_ref` | `string` | no | 파일 접근 경로 또는 참조 |
| `page_count` | `number` | no | 출력 품질 확인용 |
| `generated_at` | `string` | no | 생성 시각 |
| `failure_reason` | `string` | no | 실패 시만 사용 |

## 8. `Tailored Resume`와의 연결

[Tailored Resume v0](./tailored-resume-v0.md)의 `export_state`는 최소 아래 정보를 가져야 한다.

```json
{
  "ready_to_export": false,
  "template_id": null,
  "last_export_request_id": null,
  "last_export_id": null
}
```

원칙:

- 사용자가 마지막으로 선택한 템플릿을 남긴다.
- 가장 최근 export request와 artifact를 추적할 수 있어야 한다.

## 9. Step 7 진행 규칙

Step 7은 아래 순서로 진행한다.

1. `ready_to_export = true` 확인
2. `TemplateSpec` 선택
3. `ExportRequest` 생성
4. `RenderPayload` 구성
5. PDF 렌더링
6. `ExportArtifact` 생성
7. `Tailored Resume.export_state` 갱신

## 10. v0 Open Decisions

현재 문서에서는 아래를 기본값으로 채택했다.

- overflow 처리: `warn_only`
- 템플릿 선택 시점: Step 7
- export artifact 바이너리 보존: 7일

남은 세부 결정:

- overflow 경고를 사용자 승인 없이도 통과시킬지 여부
