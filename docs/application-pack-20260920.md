# 이력서 갱신과 PDF 생성 · 2026-09-20

공식 경력은 IMB System 2021-05부터 2026-09 기준 5년 4개월이다. 중복 재직을 총 기간에 더하지 않는다. 과거 이력서는 역사 사본이며 현재 소개와 PDF는 이 기준을 사용한다.

공개 프로젝트 사실은 포트폴리오의 프로젝트 설명을 따른다. 측정 근거가 부족한 개선율과 배포 시간 수치를 제외하고, 개발 중인 선불결제와 운영 배포한 모바일 POS를 구분한다. 비공개 저장소의 주소 대신 공개 설명 페이지로 연결한다.

## PDF 생성

`scripts/build-application-pack.py --portfolio <portfolio-repository>`는 ReportLab으로 `output/pdf/`에 Backend / AI Platform 이력서 두 종류를 생성한다. 같은 사실을 사용하고 소개와 프로젝트 순서만 다르게 한다. 한글 NanumGothic 폰트와 ReportLab이 필요하다.

완성 PDF는 각각 2페이지이며 한글 추출과 10개 링크를 확인하고 모든 페이지를 PNG로 렌더링해 검수했다. 개인별 지원 계획과 결과는 공개 저장소에 기록하지 않는다.

## 웹 빌드와 배포

기존 `npm run export`는 작성 문서가 있는 `docs`를 지우므로 사용하지 않는다. 다음 순서로 별도 폴더에 출력한다.

```sh
npm run lint
npx tsc --noEmit
NODE_OPTIONS=--openssl-legacy-provider npx next build
NODE_OPTIONS=--openssl-legacy-provider npx next export --outdir out-site
```

GitHub Pages는 기존 gh-pages 브랜치를 사용한다. custom domain과 `.nojekyll`을 유지하며 로컬에서 검증한 정적 출력만 배포한다. 공개 메타데이터에는 noindex를 적용했다. 데스크톱 1440px와 모바일 390px에서 경력 표기·링크·가로 넘침을 확인한다. 모바일 footer에서 확인된 가로 넘침은 수정했다.
