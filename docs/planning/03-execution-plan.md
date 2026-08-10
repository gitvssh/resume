# Execution Plan

- 상태: `draft`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 한 줄 실행 목표

이 문서는 MVP를 실제 작업 단위로 나누고, 우선순위와 순서를 정한다.

한 줄 요약:

`우리는 v0 설계를 고정하기 위해 schema, rubric, rewrite policy, wizard 입출력을 먼저 정리한다.`

## 2. 이번 실행의 목표

이번 단계에서 반드시 끝내야 하는 것:

- Resume schema v1 확정
- JD schema v1 확정
- 백엔드 직무 최소 rubric 정의
- wizard 단계별 입력/출력 정의

완료 정의:

- 기획 문서만 읽어도 구현 단위와 데이터 흐름이 설명 가능해야 한다.

## 3. 작업 묶음

### Track A. Domain Model

- 작업: Resume schema v1, JD schema v1, Tailored Resume 개념 정의
- 기대 산출물: [Resume Schema v1](./schemas/resume-schema-v1.md), [JD Schema v1](./schemas/jd-schema-v1.md), [Tailored Resume v0](./schemas/tailored-resume-v0.md)
- 선행 조건: 핵심 고객, v0 범위, 재작성 정책 확정

### Track B. Evaluation Policy

- 작업: 백엔드 직무 최소 rubric, 사실 오류 정책, 근거 표시 방식 정의
- 기대 산출물: [Backend Resume Rubric v0](./rubrics/backend-rubric-v0.md), [Fact-Check Policy v0](./policies/fact-check-policy-v0.md)
- 선행 조건: schema v1 확정

### Track C. Product Flow

- 작업: wizard 단계별 입출력, 수동 검토 포인트, diff 표시 규칙 정의
- 기대 산출물: [Wizard Input Output v0](./flows/wizard-io-v0.md), [Review Edit Model v0](./flows/review-edit-model-v0.md)
- 선행 조건: schema v1, rewrite policy

### Track D. Output And Storage

- 작업: PDF 출력 방식, 저장 단위, 보존 정책의 최소 범위 정의
- 기대 산출물: [Export Model v0](./schemas/export-model-v0.md), [Storage And Retention Policy v0](./policies/storage-retention-v0.md)
- 선행 조건: Tailored Resume 단위 정의

## 4. 우선순위

지금 가장 먼저 해야 할 일:

- Resume schema와 JD schema를 잠근다.

그 다음 해야 할 일:

- fact-check 2차 검토 범위와 overflow 경고 처리 방식을 정의한다.

미뤄도 되는 일:

- 공고 추천 세부 설계
- 장기 학습 기능
- 직군 확장

## 5. 의존성과 블로커

선행 결정이 필요한 항목:

- 백엔드 직무 세분화 범위
- 사실 오류 검출 기준
- 공고별 파생본 저장 정책

외부 의존성:

- PDF 텍스트 추출 품질
- 로컬 모델 성능과 지연 시간

현재 블로커:

- 규칙 기반과 LLM 기반 fact-check의 경계가 아직 없음
- overflow 경고 처리 방식이 아직 없음

## 6. 일정 / 단계

1단계:

- 문제 정의, 해결안, 스키마 고정

2단계:

- 평가 rubric, rewrite policy, fact-check policy 고정

3단계:

- wizard flow, 저장 단위, output policy 고정

## 7. 역할 / 책임

누가 무엇을 맡는가:

- 기획: 제품 경계와 사용자 흐름 고정
- 설계: schema, rubric, pipeline 정의
- 구현: parser, evaluator, rewriter, renderer 설계 반영

협업이 필요한 지점:

- 기획과 설계가 rewrite policy와 evidence 방식에서 함께 결정해야 한다.

## 8. 즉시 다음 액션

- 규칙 기반과 LLM 기반 fact-check 경계를 정한다.
- overflow 경고 시 사용자 확인 정책을 정한다.
- 백엔드 직무 세분화 범위를 더 좁힌다.

## 9. 실행 중 확인할 것

진행 중 계속 확인할 지표:

- 스키마가 실제 이력서와 JD를 과도하게 손실 없이 표현하는가
- policy가 허위 생성 리스크를 충분히 차단하는가
- 사용자 검토 단계를 생략하지 않고도 10분 목표를 달성할 수 있는가

중간 점검 시점:

- rubric/fact-check 초안이 나오고 나서

범위 변경 기준:

- 핵심 흐름과 직접 연결되지 않으면 v0에서 제외한다.

## 10. 현재 결론

지금 시점의 실행 계획 요약:

- 지금은 DB보다 domain schema가 먼저다.
- 구현 전에 schema와 policy를 잠가야 품질과 책임 경계가 흔들리지 않는다.

바로 시작 가능한 첫 작업:

- [Resume Schema v1](./schemas/resume-schema-v1.md)와 [JD Schema v1](./schemas/jd-schema-v1.md) 리뷰
