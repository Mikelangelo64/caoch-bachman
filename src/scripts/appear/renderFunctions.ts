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

export const splitRender: TRender = ({
  progress,
  itemDom,
  additionalItemDom
}) => {
  if (!additionalItemDom) {
    return;
  }

  const item = itemDom;
  const additional = additionalItemDom;

  item.style.transform = `translate(0, ${-1 * progress * 100}%)`;

  additional.style.transform = `scale(${0.8 + progress * 0.2})`;

  // additional.style.clipPath = `inset(
  //     0
  //     ${(1 - progress) * 100}%
  //   )`;
  // additional.style.clipPath = `polygon(
  //     0 ${progress * 50 + 50}%,
  //     ${(1 - progress) * 100}% ${50 - progress * 50}%,
  //     100% ${50 - progress * 50}%,
  //     ${progress * 100}% ${progress * 50 + 50}%
  //     )`;
};

export const translateYRender: TRender = ({ progress, itemDom }) => {
  const item = itemDom;

  item.style.transform = `translate(0, ${-1 * progress * 100}%)`;
};

export default opacityRender;
