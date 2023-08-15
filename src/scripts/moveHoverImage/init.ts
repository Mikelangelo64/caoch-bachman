import { AnimationFrame, utils } from 'vevet';
import vevet from '../config/vevet';

interface IMoveHoverImageInit {
  containerClass: string;
  labelClass: string;
  isReverse?: boolean;
}

const moveHoverImageInit: (props: IMoveHoverImageInit) => void = ({
  containerClass,
  labelClass,
  isReverse = false
}) => {
  if (!containerClass || !labelClass || vevet.isMobile) {
    return;
  }

  const containerArray = document.querySelectorAll(
    `.${containerClass}`
  ) as NodeListOf<HTMLElement>;

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const label = container.querySelector(
      `.${labelClass}`
    ) as HTMLElement | null;

    if (!label) {
      return;
    }

    const progressX = {
      current: 0,
      target: 0
    };
    const progressY = {
      current: 0,
      target: 0
    };

    const frame = new AnimationFrame();
    frame.addCallback('frame', () => {
      progressX.current = utils.math.lerp(
        progressX.current,
        progressX.target,
        0.1
      );

      progressY.current = utils.math.lerp(
        progressY.current,
        progressY.target,
        0.1
      );

      label.style.transform = `translate(${progressX.current * 30}px, ${
        progressY.current * 30
      }px)`;

      if (
        progressX.current === progressX.target &&
        progressY.current === progressY.target
      ) {
        frame.pause();
      }
    });

    container.addEventListener('mousemove', (evt) => {
      const rect = container.getBoundingClientRect();
      const startY = rect.top;
      const startX = rect.left;

      const y =
        Math.min(Math.max(evt.clientY - startY, 0), rect.height) / rect.height;
      const x =
        Math.min(Math.max(evt.clientX - startX, 0), rect.width) / rect.width;

      progressX.target = isReverse ? -1 * (x - 0.5) : x - 0.5;
      progressY.target = isReverse ? -1 * (y - 0.5) : y - 0.5;

      if (!frame.isPlaying) {
        frame.play();
      }
    });

    container.addEventListener('mouseleave', () => {
      progressX.target = 0;
      progressY.target = 0;
    });
  });
};

export default moveHoverImageInit;
