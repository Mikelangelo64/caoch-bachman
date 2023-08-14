import { AnimationFrame } from 'vevet';
import useObserver from '../config/useObserver';
import parallaxItem from './parallax';
import vevet from '../config/vevet';
import clearScrollListener from '../config/clearScrollListener';

const paralaxInit = () => {
  if (vevet.isMobile) {
    return;
  }

  const sectionArray = Array.from(
    document.querySelectorAll('.statistic') as NodeListOf<HTMLElement>
  );

  if (sectionArray.length === 0) {
    return;
  }

  sectionArray.forEach((section) => {
    const itemArray = Array.from(
      section.querySelectorAll('.statistic__img') as NodeListOf<HTMLElement>
    );

    if (itemArray.length === 0) {
      return;
    }

    let listenerArray: Array<() => void> = [];
    let frameArray: Array<AnimationFrame> = [];

    useObserver({
      target: section,
      callbackIn: () => {
        itemArray.forEach((item) => {
          if (!item) {
            return;
          }
          const { listener, frame } = parallaxItem(item, section);
          listenerArray.push(listener);
          frameArray.push(frame);
        });
      },
      callbackOut: () => {
        itemArray.forEach((itemProp) => {
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
  });
};

export default paralaxInit;
