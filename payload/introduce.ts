import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '결제 도메인의 정합성과 운영 신뢰성을 설계하는 Backend / Platform Engineer입니다.',
    '금융권 차세대 시스템, 스타트업의 Zero-to-One 제품 개발, 선불결제 플랫폼 설계·개발을 경험했습니다. 기능 구현에 그치지 않고 원장과 상태 전이, 멱등성, 트랜잭션 경계까지 비즈니스 규칙으로 모델링합니다.',
    '백엔드 개발을 중심으로 CI/CD, 관측성, 인프라 자동화까지 연결해 서비스가 실제 운영 환경에서 지속 가능하도록 만듭니다. AI와 Agent 기술은 제품 개발과 검증 과정을 개선하는 보조 역량으로 활용하고 있습니다.',
  ],
  sign: 'LSH',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
