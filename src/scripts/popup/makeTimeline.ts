import { Timeline } from 'vevet';

interface IRenderModalAnimationProps {
  progress: number;
  easing: number;
  parent: HTMLElement;
  scroll: HTMLElement;
  overlay: HTMLElement;
  additional: HTMLElement | null;
}

const renderModalAnimation = ({
  progress,
  easing,
  parent,
  overlay,
  scroll,
  additional
}: IRenderModalAnimationProps) => {
  if (parent) {
    const element = parent;
    element.style.display = `${progress > 0 ? 'flex' : 'none'}`;
    element.style.opacity = `${progress > 0 ? 1 : 0}`;
  }

  if (overlay) {
    const element = overlay;
    element.style.opacity = `${easing}`;
  }

  if (scroll) {
    const element = scroll;
    element.style.opacity = `${easing}`;
    if (parent.classList.contains('popup-menu')) {
      element.style.transform = `translateX(${(easing - 1) * 100}%)`;
    } else {
      element.style.transform = `translateY(${(1 - easing) * 2}rem)`;
    }
  }

  if (additional) {
    const element = additional;
    element.style.opacity = `${easing}`;
    if (parent.classList.contains('popup-menu')) {
      element.style.transform = `translateX(${(easing - 1) * 100}%)`;
    } else {
      element.style.transform = `translateY(${(1 - easing) * 2}rem)`;
    }
  }
};

const makeTimeline = (
  parent: HTMLElement,
  scroll: HTMLElement | null,
  overlay: HTMLElement | null,
  additional: HTMLElement | null,
  video?: HTMLVideoElement | null
) => {
  if (!parent || !scroll || !overlay) {
    return undefined;
  }

  const timeline = new Timeline({
    duration: 600,
    easing: [0.25, 0.1, 0.25, 1]
  });
  timeline.addCallback('start', () => {
    if (!timeline.isReversed) {
      document.querySelector('html')?.classList.add('lock');
      document.querySelector('body')?.classList.add('lock');
      parent.classList.add('_opened');

      if (video) {
        video.play();
      }
    }
  });

  timeline.addCallback('progress', ({ progress, easing }) => {
    renderModalAnimation({
      parent,
      scroll,
      overlay,
      progress,
      easing,
      additional
    });
  });

  timeline.addCallback('end', () => {
    if (timeline.isReversed) {
      document.querySelector('html')?.classList.remove('lock');
      document.querySelector('body')?.classList.remove('lock');
      parent.classList.remove('_opened');

      if (video) {
        video.pause();
      }
    }
  });

  return timeline;
};

export default makeTimeline;
