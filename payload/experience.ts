import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '핀테크 기업',
      positions: [
        {
          title: 'Tech Lead / Senior Backend & Platform Engineer',
          startedAt: '2025-04',
          descriptions: [
            '차세대 선불결제 백엔드의 승인·충전·결제·환불·정산 도메인을 단독 설계·개발 중',
            'Hexagonal Architecture와 Modular Monolith를 기반으로 원장 정합성, 상태 전이, 멱등성, Outbox 경계를 설계',
            'React Native 기반 모바일 POS를 POC부터 프로덕션 1.0 배포까지 주도',
            'LGTM 관측성 스택, Ansible·Terraform 자동화, Vault RBAC를 연결해 운영 기반 표준화',
            '정부과제 기반 내부 카드추천 PoC에서 결제 데이터 피처 엔지니어링과 추천 모델링 수행',
          ],
          skillKeywords: [
            'Java',
            'Spring Boot',
            'JPA',
            'QueryDSL',
            'PostgreSQL',
            'Kafka',
            'Vault',
            'Ansible',
            'Terraform',
            'Grafana',
          ],
        },
      ],
    },
    {
      title: 'Lowall',
      url: 'https://blog.naver.com/low_wall',
      positions: [
        {
          title: 'Lead Developer / Co-founder',
          startedAt: '2023-04',
          endedAt: '2025-03',
          descriptions: [
            '가족 기반 SNS를 아이디어 단계부터 출시·운영까지 Zero-to-One으로 설계·개발',
            'DDD와 멀티모듈 구조를 적용해 도메인 로직과 API·Batch 경계를 분리',
            'CloudWatch 분석, Right-Sizing, Spot Instance를 활용해 AWS 운영 비용 최적화',
            '제품·사업 요구사항을 기술 전략과 실행 계획으로 전환하고 개발 프로세스를 주도',
          ],
          skillKeywords: ['AWS', 'Kubernetes', 'Docker', 'JAVA', 'SpringBoot', 'JPA', 'QueryDSL'],
        },
      ],
    },
    {
      title: 'Wello',
      url: 'https://www.welfarehello.com/',
      positions: [
        {
          title: 'Developer',
          startedAt: '2023-10',
          endedAt: '2024-01',
          descriptions: [
            'KB Pay 연동 시스템 설계 및 구현',
            'Spring Batch 기반 대규모 데이터 연동 파이프라인 구축',
            'B2G 서비스 백오피스 개발',
            'Chunk 기반 처리와 QueryDSL 쿼리 최적화로 배치 성능과 데이터 정합성 개선',
          ],
          skillKeywords: ['AWS', 'JAVA', 'SpringBoot', 'JPA', 'QueryDSL'],
        },
      ],
    },
    {
      title: 'IMB System',
      url: 'http://imbsystem.com/',
      positions: [
        {
          title: 'Developer',
          startedAt: '2021-05',
          endedAt: '2023-09',
          descriptions: [
            '하나은행 글로벌 차세대 시스템 개발 및 데이터 이행 참여',
            '레거시 시스템 현대화 및 DevOps 도입',
            '베트남 VAN사 SharePOS 시스템 개발',
            '코드 품질 지표 50% 개선 (SonarQube 도입)',
            'SVN→Git 전환과 Jenkins CI/CD 도입으로 배포 시간 10분 이상에서 1분 미만으로 단축',
          ],
          skillKeywords: ['JAVA', 'Spring', 'PostgreSQL', 'Jira', 'Confluence', 'Oracle', 'MDD'],
        },
      ],
    },
  ],
};

export default experience;
