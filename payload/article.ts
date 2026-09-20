import { IArticle } from '../component/article/IArticle';

const article: IArticle.Payload = {
  disable: false,

  list: [
    {
      content: '평가에 과적합된 개선을 홀드아웃으로 다시 확인하기',
      href: 'https://blog.damecasol.com/posts/evaluation-overfit-heldout/',
    },
    {
      content: '백업 성공과 복구 성공을 구분하는 검증',
      href: 'https://blog.damecasol.com/posts/restore-rehearsal-false-success/',
    },
    {
      content: 'CKAD 시험 후기',
      href: 'https://damecasol.tistory.com/103',
    },
    {
      content: 'HashiCorp Vault 실무 가이드 전자책',
      href: 'https://wikidocs.net/book/18285',
    },
  ],
};

export default article;
