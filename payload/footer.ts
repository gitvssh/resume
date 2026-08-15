import { version } from '../package.json';

import { IFooter } from '../component/footer/IFooter';

const footer: IFooter.Payload = {
  version,
  github: 'https://github.com/gitvssh/gitvssh.github.io',
};

export default footer;
