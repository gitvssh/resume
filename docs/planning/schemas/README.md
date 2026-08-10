# Schema Overview

이 디렉터리는 `DB schema`가 아니라 `도메인 스키마`를 정의한다.

목적:

- PDF에서 추출한 이력서 텍스트를 시스템이 이해할 수 있는 표준 형태로 만든다.
- JD를 맞춤 재작성과 평가에 쓸 수 있는 표준 형태로 만든다.
- 이후 parser, evaluator, rewriter, renderer가 같은 구조를 공유하게 한다.

순서:

1. `Resume schema v1`
2. `JD schema v1`
3. wizard 단계별 입출력 정의
4. 그다음 저장 구조와 DB 설계

현재 원칙:

- v0는 경력직 백엔드 개발자를 기준으로 설계한다.
- 사실을 유지하는 것이 가장 중요한 불변식이다.
- 원본 PDF는 영구 저장하지 않는다.
- 저장이 필요할 때는 마스킹된 구조화 데이터와 파생 결과 중심으로 다룬다.

관련 문서:

- [Project Home](../00-project-home.md)
- [Solution And MVP](../02-solution-mvp.md)
- [Resume Schema v1](./resume-schema-v1.md)
- [JD Schema v1](./jd-schema-v1.md)
- [Tailored Resume v0](./tailored-resume-v0.md)
- [Export Model v0](./export-model-v0.md)
