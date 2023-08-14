import opacityRender, {
  clipPathRender,
  splitRender,
  translateYRender
} from './renderFunctions';
import makeAppearAnimation from './makeAnimation';
import { TAppearAnimation, TRender } from './types';
import vevet from '../config/vevet';

const appearInit = () => {
  const containerArray = document.querySelectorAll(
    '.appear'
  ) as NodeListOf<HTMLElement>;

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const isIncludeMobile =
      container.dataset.includeMobile === 'include' || false;

    if (!isIncludeMobile && vevet.isMobile) {
      return;
    }

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

      case 'translateY':
        renderFunc = translateYRender;
        break;

      case 'split':
        renderFunc = splitRender;
        break;

      default:
        renderFunc = opacityRender;
        break;
    }

    makeAppearAnimation({ container, renderFunc, animateElement });
  });
};

export default appearInit;
