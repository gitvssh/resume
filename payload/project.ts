import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: '차세대 선불결제 플랫폼 설계·개발',
      startedAt: '2026-01',
      where: '핀테크 기업 · 개발 진행 중',
      descriptions: [
        {
          content:
            '승인·충전·결제·환불·정산을 포함한 선불결제 백엔드를 단독으로 설계·개발하고 있습니다.',
        },
        {
          content: '도메인 정합성과 트랜잭션 경계',
          weight: 'MEDIUM',
          descriptions: [
            { content: '지갑·원장·정산의 금액 불변식과 상태 전이를 도메인 규칙으로 모델링.' },
            { content: '멱등성 키와 금지 전이 규칙으로 중복 요청과 잘못된 상태 변경을 차단.' },
          ],
        },
        {
          content: 'Architecture & Reliability',
          weight: 'MEDIUM',
          descriptions: [
            {
              content:
                'Hexagonal Architecture와 Modular Monolith로 도메인·애플리케이션·어댑터 경계를 분리.',
            },
            { content: '동기 ACID 트랜잭션과 Outbox/DLQ를 조합해 외부 연계 실패와 재처리를 격리.' },
            {
              content: '원장 분개 동작과 비즈니스·재무 승인 모델의 차이를 추적해 검토 지점을 도출.',
            },
          ],
        },
      ],
    },
    {
      title: '모바일 POS 1.0 개발 및 운영 배포',
      startedAt: '2025-06',
      endedAt: '2026-03',
      where: '핀테크 기업',
      descriptions: [
        { content: 'React Native 기반 모바일 POS를 POC부터 프로덕션 1.0 배포까지 주도.' },
        { content: 'OpenAPI Generator로 프론트엔드와 백엔드의 API 계약과 타입 일관성을 확보.' },
        { content: '카메라 스캔·결제·FCM 푸시를 구현하고 Sentry 기반 오류 수집 체계를 구성.' },
      ],
    },
    {
      title: '결제 서비스 운영 자동화 및 관측성 플랫폼',
      startedAt: '2026-01',
      where: '핀테크 기업',
      descriptions: [
        {
          content:
            'Grafana LGTM 스택과 Alloy 에이전트를 기반으로 로그·메트릭·트레이스 수집 구조를 설계·배포.',
        },
        { content: 'Ansible 플레이북과 Terraform을 활용해 구성 관리와 인프라 배포를 코드화.' },
        {
          content:
            'HashiCorp Vault의 policy/group 표준과 RBAC 체계를 설계해 시크릿 관리 기준을 정립.',
        },
      ],
    },
    {
      title: 'AI Team Control Plane',
      startedAt: '2026-06',
      where: 'Personal Project',
      descriptions: [
        {
          content:
            'AI가 지원하는 소프트웨어 개발 과정에 승인 게이트, 격리된 Git 작업공간, 변경 근거와 적용 이력을 제공하는 로컬 우선형 Control Plane을 개발.',
        },
        {
          content:
            '요청→PRD→작업 분해→빌드→검증→사람 승인으로 이어지는 추적 가능한 전달 흐름을 설계.',
        },
        {
          content: 'GitHub Repository',
          href: 'https://github.com/gitvssh/ai-team',
        },
      ],
    },
    {
      title: '가족 기반 SNS Zero-to-One 개발',
      startedAt: '2023-04',
      endedAt: '2025-03',
      where: 'Lowall',
      descriptions: [
        {
          content:
            '제품 기획, 요구사항 분석, 도메인 모델링, 백엔드 개발과 운영까지 전 과정을 주도.',
        },
        {
          content:
            'DDD와 멀티모듈 구조로 Core·API·Batch 경계를 분리해 코드 재사용성과 변경 용이성을 확보.',
        },
        {
          content:
            'CloudWatch 기반 사용량 분석과 Right-Sizing, Spot Instance로 AWS 운영 비용을 최적화.',
        },
      ],
    },
    {
      title: 'KB Pay 데이터 연동 시스템',
      startedAt: '2023-11',
      endedAt: '2024-01',
      where: 'Wello',
      descriptions: [
        { content: '대규모 정책·사용자 데이터를 연동하는 실시간/배치 처리 시스템을 설계·구현.' },
        {
          content:
            'Spring Batch Chunk 처리와 QueryDSL 쿼리 최적화로 처리 성능과 데이터 정합성을 개선.',
        },
        { content: 'OAuth 2.0과 JWT 기반 기관 사용자 인증 흐름을 구현.' },
      ],
    },
    {
      title: '레거시 개발·배포 환경 현대화',
      startedAt: '2023-02',
      endedAt: '2023-09',
      where: 'IMB System',
      descriptions: [
        { content: 'Jenkins CI/CD를 도입해 수동 배포 시간을 10분 이상에서 1분 미만으로 단축.' },
        { content: 'SVN에서 Git으로 형상관리를 이전하고 GitFlow와 코드 리뷰 프로세스를 정립.' },
        { content: 'SonarQube 기반 품질 모니터링과 테스트 자동화로 기술 부채 지표를 개선.' },
      ],
    },
  ],
};

export default project;
