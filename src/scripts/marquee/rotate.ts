import { AnimationFrame, utils } from 'vevet';

interface IProgress {
  current: number;
  target: number;
}

const rotateItem = (itemProps: HTMLElement, section: HTMLElement) => {
  const item = itemProps;
  const progress: IProgress = {
    current: 0,
    target: 0
  };

  const frame = new AnimationFrame({ fps: 60 });
  const render = () => {
    progress.current = utils.math.lerp(progress.current, progress.target, 0.1);
    item.style.transform = `rotate(${(progress.current - 0.5) * 10}deg)`;

    if (progress.target === progress.current && frame.isPlaying) {
      frame.pause();
    }
  };

  frame.addCallback('frame', () => {
    render();
  });

  frame.play();

  const listener = () => {
    const rect = section.getBoundingClientRect();
    const startY = -1 * (rect.top - window.innerHeight);
    const y = Math.max(0, Math.min(startY, rect.height));

    progress.target = y / rect.height;

    // console.log((y / rect.height - 0.5) * 30);

    if (progress.target !== progress.current && !frame.isPlaying) {
      frame.play();
    }
  };

  window.addEventListener('scroll', listener);

  return { listener, frame };
};

export default rotateItem;
