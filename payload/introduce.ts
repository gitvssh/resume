import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '결제 데이터의 정합성과 서비스 운영 문제를 해결하는 백엔드 엔지니어입니다.',
    '금융 시스템의 장애 분석과 데이터 연동, 스타트업의 초기 제품 개발을 거쳐 선불결제 플랫폼의 설계와 개발을 이끌고 있습니다.',
    '기능 개발에 필요한 배포·관측·복구 환경을 함께 만들며, 최근에는 AI가 안전하게 데이터를 조회하고 여러 앱에서 작업을 이어갈 수 있는 서비스도 개발하고 있습니다.',
  ],
  sign: 'LSH',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
