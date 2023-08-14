import vevet from '../config/vevet';
import { TRender } from './types';

const opacityRender: TRender = ({ progress, itemDom }) => {
  const item = itemDom;
  item.style.opacity = `${1 - progress}`;
};

export const clipPathRender: TRender = ({ progress, itemDom }) => {
  const item = itemDom;

  item.style.clipPath = `inset(0% ${progress * 100}% ${
    progress * 100
  }% 0 round 0 0 ${vevet.isPhone ? 16 : 30 + progress * 20}% 0)`;
};

export default opacityRender;
