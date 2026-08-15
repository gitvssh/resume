import favicon from '../asset/favicon.ico';
import previewImage from '../asset/preview.jpg';
import { IGlobal } from '../component/common/IGlobal';

const title = '이승현 | Backend / Platform Engineer';
const description =
  '결제 도메인의 정합성과 운영 신뢰성을 설계하는 Backend / Platform Engineer 이승현의 온라인 이력서입니다.';

export const _global: IGlobal.Payload = {
  favicon,
  headTitle: title,
  seo: {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: previewImage,
          width: 800,
          height: 600,
          alt: '이승현 온라인 이력서 미리보기',
        },
      ],
      type: 'website',
    },
  },
};
