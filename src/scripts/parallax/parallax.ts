import { AnimationFrame, utils } from 'vevet';

interface IProgress {
  current: number;
  target: number;
}

export const clearListener = (listener: () => void) => {
  window.removeEventListener('scroll', listener);
};

const parallaxItem = (itemProps: HTMLElement, section: HTMLElement) => {
  const item = itemProps;
  const progress: IProgress = {
    current: 0,
    target: 0,
  };

  const { size } = item.dataset;
  let mass = 0.1;

  if (size === 's') {
    mass = 0.14;
  }
  if (size === 'm') {
    mass = 0.1;
  }
  if (size === 'l') {
    mass = 0.06;
  }
  if (size === 'xl') {
    mass = 0.03;
  }

  const frame = new AnimationFrame({ fps: 60 });

  const render = () => {
    progress.current = utils.math.lerp(progress.current, progress.target, mass);
    item.style.transform = `translate(0, ${progress.current}px)`;
  };

  frame.addCallback('frame', () => {
    render();
  });

  frame.play();

  const scrollListener = () => {
    const rect = section.getBoundingClientRect();
    const startY = -1 * (rect.top - window.innerHeight / 3);
    const y = Math.min(startY, rect.height);

    progress.target = (-60 * y) / rect.height;
  };

  const listener = () => {
    scrollListener();
  };

  window.addEventListener('scroll', listener);

  return { listener, frame };
};

export default parallaxItem;
