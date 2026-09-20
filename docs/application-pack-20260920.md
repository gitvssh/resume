# 2026-09-20 시험 지원 자료

사용자 확인: 공식 경력은 IMB System 2021-05부터 2026-09 기준 5년 4개월. 앞선 개발 경험 및 중복 재직은 합산하지 않는다. 과거 이력서는 역사 사본이며 이번 지원본이 현재 기준이다.

공개 프로젝트 사실은 engineering-portfolio의 src/content/projects/*.json과 docs/application-evidence-20260920.md를 따른다. 측정 근거가 부족한 IMB 개선율·배포 시간 수치는 삭제했다. 개발 중인 선불결제와 운영 배포한 모바일 POS를 구분한다. 비공개 저장소 대신 설명 페이지로 연결한다.

## 두 종류의 지원본

- Backend: 고위드·핀다. 금융권→결제·정산→운영 신뢰성, AI 도구는 구현·검증 역량의 증거.
- AI Platform: 딥오토·비스텔리젼스. 자체 MCP·앱 간 상태·권한/재시도·Kubernetes, 금융 백엔드는 기반 경력.
- 공통 사실은 같고 소개와 프로젝트 순서만 다르다. 희망 회사의 마감이 임박하면 연습 결과를 기다리느라 놓치지 않는다.

## 결과 기록

| 회사 | 공고 | 버전 | 제출 | 결과 확인 | 메모 |
|---|---|---|---|---|---|
| 고위드 | https://www.wanted.co.kr/wd/381940 | backend-20260920 | 미제출 | 대기 | Java/Spring·카드·정산 |
| 핀다 | https://jumpit.saramin.co.kr/position/55000472 | backend-20260920 | 미제출 | 대기 | Spring·배치·성능·운영 |
| 딥오토 | https://www.wanted.co.kr/wd/387640 | ai-platform-20260920 | 미제출 | 대기 | Python·workflow·Kubernetes |
| 비스텔리젼스 | https://www.wanted.co.kr/wd/385886 | ai-platform-20260920 | 미제출 | 대기 | Agent·상태·재시도·Python |

서류 통과는 이력서와 연결 자료 전체에 대한 신호다. 소수 지원으로 블로그·GitHub·포트폴리오 각각의 통과율을 분리하지 않는다. 무응답은 탈락과 구분하고 지원일+7일·14일에 결과를 확인한다.

## 생성·배포

scripts/build-application-pack.py → ReportLab으로 output/pdf/에 PDF 2종 출력. PDF 2페이지, 한글 폰트 포함, 링크 작동, 잘림 없는지 PNG로 확인한다. output은 배포 브랜치에 자동 복사하지 않는다.

기존 npm run export는 docs를 지우므로 사용하지 않는다. npm run lint, npx tsc --noEmit, NODE_OPTIONS=--openssl-legacy-provider npx next build, NODE_OPTIONS=--openssl-legacy-provider npx next export --outdir out-site로 별도 출력한다. Pages는 기존 gh-pages 브랜치의 정적 산출물을 사용한다.

## 검증과 제출 상태

PDF 2종 각 2페이지, 한글 추출과 10개 링크 확인 및 전 페이지 PNG 육안 검수 완료. 웹은 lint·TypeScript·Next build·정적 export 확인. 기존 footer의 모바일 가로 넘침을 수정했다. 포트폴리오 정본의 결제 개발 시작 시점(2026.03)을 온라인 이력서에도 반영했다. 기존 브랜드 정책의 이력서 noindex를 metadata에 반영했다.

2026-09-20: 원티드 공고 접근은 자동화 브라우저에서 CloudFront 403. 점핏 핀다 지원 버튼은 사람인 로그인으로 이동. 계정 입력이나 제출은 수행하지 않았다. 제출 완료 영수증이 없는 모든 건은 미제출 상태로 유지한다.
