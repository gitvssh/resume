import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '5년 4개월 경력의 Backend / Platform Engineer입니다. 금융·결제 백엔드와 AI가 실제 업무 자료를 읽고 작업을 이어가는 도구를 개발합니다.',
    '공식 경력은 2021년 5월 IMB System부터 산정했습니다(2026년 9월 기준). 이전 개발 경험과 중복 재직 기간은 총 경력에 더하지 않았습니다.',
    '금융권 차세대 시스템, 제품 출시·운영, 선불결제 플랫폼 설계·개발을 경험했습니다. 원장과 상태 전이, 멱등성, 트랜잭션 경계를 비즈니스 규칙으로 모델링합니다.',
    'Python 기반 MCP 도구와 공용 상태 저장 서비스를 직접 만들고 Kubernetes에서 운영합니다. 권한 분리·재시도·충돌 처리·검증 자동화를 통해 AI 활용을 반복 가능한 개발·운영 과정으로 연결합니다.',
  ],
  sign: 'LSH',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
