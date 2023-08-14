import { AnimationFrame, utils } from 'vevet';
import { IMakeAppearAnimation } from './types';
import useScrollEvent from './useScroll';
import opacityRender from './renderFunctions';

const makeAppearAnimation: (props: IMakeAppearAnimation) => void = ({
  container,
  renderFunc,
  animateElement = null
}) => {
  const frame = new AnimationFrame({ fps: 60 });

  frame.play();

  const progressAnimation = {
    current: 0,
    target: 0
  };

  const { hidden, shown } = useScrollEvent({
    target: container,
    callback: ({ progress }) => {
      progressAnimation.target = progress;

      if (
        (progressAnimation.target < 1 || progressAnimation.target > 0) &&
        !frame.isPlaying
      ) {
        frame.play();
      }
    }
  });

  if (!hidden || !shown) {
    return;
  }

  const render = () => {
    if (progressAnimation.target > 0.9) {
      progressAnimation.target = 1;
    }
    if (progressAnimation.target < 0.1) {
      progressAnimation.target = 0;
    }

    progressAnimation.current = utils.math.lerp(
      progressAnimation.current,
      progressAnimation.target,
      0.1
    );
    // console.log(progressAnimation.current, progressAnimation.target);

    if (!renderFunc) {
      opacityRender({
        progress: progressAnimation.current,
        itemDom: animateElement || hidden.dom
      });
    } else {
      renderFunc({
        progress: progressAnimation.current,
        itemDom: animateElement || hidden.dom
      });
    }

    if (progressAnimation.current === 1) {
      hidden.dom.style.pointerEvents = 'none';
    } else {
      hidden.dom.style.pointerEvents = 'auto';
    }

    if (
      progressAnimation.current === 0 ||
      progressAnimation.current === 1 ||
      progressAnimation.current === progressAnimation.target
    ) {
      frame.pause();
    }
  };

  frame.addCallback('frame', () => {
    render();
  });
};

export default makeAppearAnimation;
