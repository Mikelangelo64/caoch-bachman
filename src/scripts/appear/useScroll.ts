import clearScrollListener from '../config/clearScrollListener';
import debounce from '../config/debounce';
import { IUppearElement, IUseScrollEventProps } from './types';

const useScrollEvent: (props: IUseScrollEventProps) => {
  hidden: IUppearElement | undefined;
  shown: IUppearElement | undefined;
} = ({ target, callback, isImmediate = true }) => {
  if (!target) {
    return {
      hidden: undefined,
      shown: undefined
    };
  }

  const container = target;

  const hiddenDom = container.querySelector(
    '.appear-hidden'
  ) as HTMLElement | null;
  const shownDom = container.querySelector(
    '.appear-shown'
  ) as HTMLElement | null;

  if (!hiddenDom || !shownDom) {
    return {
      hidden: undefined,
      shown: undefined
    };
  }

  const hidden: IUppearElement = {
    dom: hiddenDom,
    height: Math.ceil(hiddenDom.getBoundingClientRect().height)
  };

  const shown: IUppearElement = {
    dom: shownDom,
    height: Math.ceil(shownDom.getBoundingClientRect().height)
  };

  let isFirstTime = true;

  container.style.minHeight = `${hidden.height * 1.5 + shown.height}px`;

  const listener = () => {
    const rect = container.getBoundingClientRect();

    const startY = -1 * rect.top;
    const endY = rect.height - shown.height;
    const y = Math.min(startY, endY);
    const progress = y / endY;

    if ((progress === 1 || progress === 0) && !isFirstTime) {
      return;
    }

    if (!callback) {
      return;
    }
    isFirstTime = false;
    // console.log(startY, endY, progress);

    callback({ progress, hidden, shown });
  };

  if (isImmediate) {
    listener();
  }

  window.addEventListener('scroll', listener);

  window.addEventListener(
    'resize',
    debounce({
      callback: () => {
        const newHiddenHeight = Math.ceil(
          hidden.dom.getBoundingClientRect().height
        );
        const newShownHeight = Math.ceil(
          shown.dom.getBoundingClientRect().height
        );

        if (
          hidden.height === newHiddenHeight &&
          newShownHeight === shown.height
        ) {
          return;
        }

        hidden.height = newHiddenHeight;
        shown.height = newShownHeight;
        container.style.minHeight = `${hidden.height * 2 + shown.height}px`;

        clearScrollListener(listener);
        window.addEventListener('scroll', listener);
      }
    })
  );

  return { hidden, shown };
};

export default useScrollEvent;
