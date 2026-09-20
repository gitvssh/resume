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
    small: 'Backend / Platform Engineer',
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
    title: '금융·결제 도메인과 운영 신뢰성에 강한 Backend / Platform Engineer입니다.',
    icon: faBell,
  },
};

export default profile;
