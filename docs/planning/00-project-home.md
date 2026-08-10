# Resume Tailor

- 상태: `draft`
- 현재 단계: `solution`
- 마지막 수정일: `2026-04-10`
- 작성자: `lsh`

## 1. 한 줄 요약

경력직 백엔드 개발자의 마스터 이력서를 채용공고별 맞춤 이력서로 10분 안에 재구성해주는 AI 지원 도구를 기획한다.

## 2. 지금 집중하는 것

지금 가장 중요하게 정리해야 하는 것:

- v0 범위 고정
- `Resume schema v1` 정의
- `JD schema v1` 정의
- 재작성 허용 범위와 검증 정책 고정

지금 막히는 것:

- 규칙 기반 fact-check와 LLM 2차 검토의 경계를 더 정리해야 함
- overflow 경고를 강제 검토로 볼지 단순 안내로 볼지 아직 미정임
- 백엔드 직무 세분화 범위가 아직 넓음

## 3. 현재 결론

현재까지 합의된 내용:

- 1차 타겟은 경력직 백엔드 개발자다.
- 핵심 가치는 `10분 안에 공고 맞춤 이력서 생성`이다.
- v0 흐름은 `PDF 업로드 -> 텍스트 확인/수정 -> JD 입력 -> 맞춤 재작성 -> diff/근거 확인 -> PDF 출력`이다.
- 재작성은 표현 강화와 구조 재배치까지만 허용한다.
- 새 사실, 새 수치, 역할 부풀리기는 금지한다.
- v0 KPI는 생성 완료 시간, 사용자 수동 수정량, 재작성안 수용률, 사실 오류 검출률이다.

아직 미정인 핵심 사항:

- 백엔드 직무 rubric 세부 항목과 가중치 확장 여부
- 사실 오류 검출 방식을 규칙 기반과 LLM 기반 중 어떻게 섞을지
- overflow 경고 처리 방식

## 4. 열린 질문

- 백엔드 경력직 안에서도 어떤 세부 직무를 우선할 것인가
- JD에서 필수/우대/도메인/연차를 얼마나 안정적으로 추출할 수 있는가
- 원본 텍스트 대비 편집량을 어떤 기준으로 `수용`으로 판단할 것인가

## 5. 핵심 문서

- [문제 정의](./01-problem-definition.md)
- [해결안 / MVP](./02-solution-mvp.md)
- [실행 계획](./03-execution-plan.md)
- [Backend Resume Rubric v0](./rubrics/backend-rubric-v0.md)
- [Fact-Check Policy v0](./policies/fact-check-policy-v0.md)
- [Wizard Input Output v0](./flows/wizard-io-v0.md)
- [Review Edit Model v0](./flows/review-edit-model-v0.md)
- [Schema Overview](./schemas/README.md)
- [Resume Schema v1](./schemas/resume-schema-v1.md)
- [JD Schema v1](./schemas/jd-schema-v1.md)
- [Tailored Resume v0](./schemas/tailored-resume-v0.md)
- [Export Model v0](./schemas/export-model-v0.md)
- [Storage And Retention Policy v0](./policies/storage-retention-v0.md)

## 6. 참고 자료

- 대화 메모: [conversation.md](./conversation.md)
- 참고 링크:
- 관련 자료:

## 7. 다음 액션

가장 먼저 할 일:

- 규칙 기반 fact-check와 LLM 2차 검토의 경계를 정한다.

그 다음 할 일:

- overflow 경고 시 사용자 확인 흐름을 정한다.
