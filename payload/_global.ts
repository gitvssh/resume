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
    // 2026-09-28 결정: 공개 접근은 유지하되 검색엔진 색인·추적 링크 모두 원치
    // 않는다. noindex만으로는 next-seo가 기본값 follow를 함께 낸다
    // (content="noindex,follow") — nofollow를 명시해 noindex,nofollow로 만든다.
    noindex: true,
    nofollow: true,
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
