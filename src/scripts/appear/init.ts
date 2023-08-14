import { AnimationFrame, utils } from 'vevet';
import useScrollEvent from './useScroll';
import opacityRender, { TRender, clipPathRender } from './bannerRender';

type TAppearAnimation = 'opacity' | 'clip-path';

export interface IUppearElement {
  dom: HTMLElement;
  height: number;
}

interface IMakeAppearAnimation {
  container: HTMLElement;
  renderFunc?: TRender;
  animateElement?: HTMLElement | null;
}

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

const appearInit = () => {
  const containerArray = document.querySelectorAll(
    '.appear'
  ) as NodeListOf<HTMLElement>;

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const animateElement = container.querySelector(
      '[data-animate]'
    ) as HTMLElement | null;

    let animationType: TAppearAnimation = 'opacity';
    let renderFunc: TRender | undefined;

    if (animateElement) {
      animationType =
        (animateElement.dataset.animate as TAppearAnimation | undefined) ||
        'opacity';
    }

    switch (animationType) {
      case 'opacity':
        renderFunc = opacityRender;
        break;

      case 'clip-path':
        renderFunc = clipPathRender;
        break;

      default:
        renderFunc = opacityRender;
        break;
    }

    makeAppearAnimation({ container, renderFunc, animateElement });
    // const frame = new AnimationFrame({ fps: 60 });

    // frame.play();

    // const progressAnimation = {
    //   current: 0,
    //   target: 0
    // };

    // const { hidden, shown } = useScrollEvent({
    //   target: container,
    //   callback: ({ progress }) => {
    //     progressAnimation.target = progress;

    //     if (
    //       (progressAnimation.target < 1 || progressAnimation.target > 0) &&
    //       !frame.isPlaying
    //     ) {
    //       frame.play();
    //     }
    //   }
    // });

    // if (!hidden || !shown) {
    //   return;
    // }

    // const render = () => {
    //   if (progressAnimation.target > 0.9) {
    //     progressAnimation.target = 1;
    //   }
    //   if (progressAnimation.target < 0.1) {
    //     progressAnimation.target = 0;
    //   }

    //   progressAnimation.current = utils.math.lerp(
    //     progressAnimation.current,
    //     progressAnimation.target,
    //     0.1
    //   );
    //   // console.log(progressAnimation.current, progressAnimation.target);

    //   hidden.dom.style.opacity = `${1 - progressAnimation.current}`;

    //   if (
    //     progressAnimation.current === 0 ||
    //     progressAnimation.current === 1 ||
    //     progressAnimation.current === progressAnimation.target
    //   ) {
    //     frame.pause();
    //   }
    // };

    // frame.addCallback('frame', () => {
    //   render();
    // });
  });
};

export default appearInit;
