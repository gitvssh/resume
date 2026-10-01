import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { IProfile } from '../component/profile/IProfile';
import image from '../asset/profile.png';

const profile: IProfile.Payload = {
  disable: false,

  // image: 'https://resume.yowu.dev/static/image/profile_2019.png',
  image,
  name: {
    title: '이승현 (Lee Seung-Hyun)',
    small: 'Backend & Platform Engineer',
  },
  contact: [
    {
      title: 'gmavsks@gmail.com',
      link: 'mailto:gmavsks@gmail.com',
      icon: faEnvelope,
    },
    {
      title: 'Portfolio',
      link: 'https://portfolio.damecasol.com/',
      icon: faLink,
    },
    {
      title: 'GitHub',
      link: 'https://github.com/gitvssh',
      icon: faGithub,
    },
    {
      title: 'Tech Blog',
      link: 'https://gitvssh.github.io/',
      icon: faLink,
    },
  ],
  notice: {
    title: '결제·원장 백엔드와 AI 서비스 백엔드 · 경력 만 5년+',
    icon: faBell,
  },
};

export default profile;
