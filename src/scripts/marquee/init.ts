import nodeMarquee from 'node-marquee';
import rotateItem from './rotate';
import { AnimationFrame } from 'vevet';
import useObserver from '../config/useObserver';
import clearScrollListener from '../config/clearScrollListener';

const marqueeInit = () => {
  const list = document.querySelectorAll(
    '.marquee'
  ) as NodeListOf<HTMLDivElement>;

  if (list.length === 0) {
    return;
  }

  list.forEach((item) => {
    nodeMarquee({
      parent: item,
      resize: 'w',
      prependWhitespace: false,
      speed: item.classList.contains('reversed') ? -1 : 1
    });
  });
};

export const marqueeRotate = () => {
  const sectionArray = document.querySelectorAll(
    'section.dark'
  ) as NodeListOf<HTMLElement>;

  if (sectionArray.length === 0) {
    return;
  }

  sectionArray.forEach((section) => {
    const marqueeArray = section.querySelectorAll(
      '.marquee'
    ) as NodeListOf<HTMLElement>;

    if (marqueeArray.length === 0) {
      return;
    }

    let listenerArray: Array<() => void> = [];
    let frameArray: Array<AnimationFrame> = [];

    useObserver({
      target: section,
      callbackIn: () => {
        marqueeArray.forEach((item) => {
          if (!item) {
            return;
          }

          const { listener, frame } = rotateItem(item, section);
          listenerArray.push(listener);
          frameArray.push(frame);
        });
      },
      callbackOut: () => {
        marqueeArray.forEach((itemProp) => {
          const item = itemProp;

          if (!item) {
            return;
          }
          item.style.transform = '';
        });

        listenerArray.forEach((listener) => {
          clearScrollListener(listener);
        });

        frameArray.forEach((frame) => {
          frame.destroy();
        });

        listenerArray = [];
        frameArray = [];
      }
    });

    // marqueeArray.forEach((marquee, indexMarq) => {
    //   if (indexMarq !== 0) {
    //     return
    //   }
    //   console.log(marquee);

    //   rotateItem(marquee, section);
    // });
  });
};

export default marqueeInit;
