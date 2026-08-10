# Storage And Retention Policy v0

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 목적

이 문서는 `Resume Tailor` v0에서 어떤 데이터를 얼마나 저장할지 정한다.

핵심 목표:

- 민감한 이력서 데이터를 과도하게 저장하지 않는다.
- v0 구현 복잡도를 낮춘다.
- 사용자가 다시 작업을 이어갈 최소 상태는 유지한다.

## 2. 기본 원칙

- 원본 PDF는 영구 저장하지 않는다.
- PII는 저장 시 마스킹을 기본으로 한다.
- `Tailored Resume`는 전체 버전 히스토리를 두지 않는다.
- 공고별로 `최신 작업본 1개 + 최신 export 기준본 1개`만 유지한다.
- export 파일 바이너리는 짧게 보관하고, 메타데이터는 더 길게 남긴다.

## 3. 객체별 저장 정책

### 3.1 원본 PDF

- 용도: 텍스트 추출 직후 임시 처리
- 저장 정책: 영구 저장 금지
- 보존 기간: 추출 성공 시 즉시 삭제, 실패 시 세션 종료 또는 최대 1시간

### 3.2 `ResumeDocument`

- 저장 대상: 구조화된 이력서 데이터, 사용자 확인이 끝난 텍스트
- 저장 형태: 마스킹된 구조화 데이터 중심
- 보존 기간: 사용자가 삭제할 때까지 유지 가능

메모:

- v0에서는 사용자당 `활성 마스터 이력서 1개`를 기본 모델로 본다.

### 3.3 `JobSnapshot`

- 저장 대상: JD 원문, 구조화 결과
- 보존 기간: 연결된 `Tailored Resume`가 존재하는 동안 유지
- 권장 기본값: 마지막 참조 후 90일

### 3.4 `Tailored Resume`

- 저장 대상: [Tailored Resume v0](../schemas/tailored-resume-v0.md)
- 저장 정책:
  - 같은 `resume_id + job_snapshot_id` 조합마다 `latest_working` 1개 유지
  - 같은 조합마다 `latest_export_baseline` 1개 유지
  - 전체 편집 히스토리나 다중 초안 브랜치는 v0에서 두지 않음

설명:

- `latest_working`: 사용자가 현재 편집 중인 최신 상태
- `latest_export_baseline`: 마지막으로 export에 성공한 기준본

### 3.5 사용자 편집 정보

- 저장 대상: item 단위 편집 요약
- 저장 정책:
  - keystroke 로그는 저장하지 않음
  - 저장 시점 기준의 편집 결과만 반영
  - edit count, edited item ids, 마지막 수정 시각 정도만 유지

### 3.6 `ExportArtifact`

- 저장 대상:
  - 파일 메타데이터
  - 생성된 PDF 바이너리 또는 다운로드 참조

- 보존 정책:
  - 바이너리 또는 다운로드 참조: 7일
  - export 메타데이터: 30일

설명:

- 7일 이후에는 기존 파일을 재사용하지 않고 필요 시 다시 렌더링한다.
- 메타데이터는 디버깅과 최근 작업 이력 확인용으로 더 오래 둔다.

## 4. 최신본/히스토리 규칙

v0의 공식 규칙은 아래와 같다.

1. 공고별 최신 작업본은 1개만 유지한다.
2. export에 성공하면 그 시점의 `Tailored Resume`를 `latest_export_baseline`으로 기록한다.
3. export 이후 사용자가 다시 수정하면 새 브랜치를 만들지 않고 `latest_working`을 갱신한다.
4. 과거 작업본 전체를 복구하는 기능은 v0 범위 밖이다.

즉, v0는 `작업 중인 최신본`과 `마지막 출력 기준본`만 남기는 단순 모델이다.

## 5. PII 정책

- `name`, `email`, `phone`은 저장 시 마스킹 기본
- export 요청 시에만 PII 포함 여부를 선택
- renderer 직전 payload에서만 복원 허용

## 6. 삭제 정책

- 사용자가 이력서를 삭제하면 연결된 `Tailored Resume`와 export 메타데이터도 함께 삭제 가능해야 한다.
- export 바이너리는 별도 경로에 있어도 동일 요청으로 정리할 수 있어야 한다.
- 삭제는 hard delete를 기본으로 본다.

## 7. v0에서 채택한 운영 기본값

- overflow 처리: `warn_only`
- 템플릿 선택 시점: Step 7
- export artifact 바이너리 보존: 7일
- export metadata 보존: 30일
- `Tailored Resume` 저장 방식: 최신 작업본 1개 + 최신 export 기준본 1개

## 8. 이후 확장 후보

- 공고별 다중 초안 히스토리
- 사용자 지정 보존 기간
- export artifact 재다운로드 기간 연장
- soft delete 및 복구 기능
