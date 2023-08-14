export type TRender = (props: {
  progress: number;
  itemDom: HTMLElement;
}) => void;

const opacityRender: TRender = ({ progress, itemDom }) => {
  const item = itemDom;
  item.style.opacity = `${1 - progress}`;
};

export const clipPathRender: TRender = ({ progress, itemDom }) => {
  const item = itemDom;

  // item.style.setProperty('--banner-hide', `${progress * 100}%`);
  item.style.clipPath = `inset(0% ${progress * 100}% ${
    progress * 100
  }% 0 round 0 0 ${30 + progress * 20}% 0)`;
};

export default opacityRender;
