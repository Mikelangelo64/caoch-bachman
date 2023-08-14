type TCallback = (element: Element) => void;

interface IUseObserverProps {
  target: HTMLElement | null;
  callbackIn?: TCallback;
  callbackOut?: TCallback;
  isCallOnce?: boolean;
}

const useObserver: (
  props: IUseObserverProps
) => IntersectionObserver | undefined = ({
  target,
  callbackIn,
  callbackOut,
  isCallOnce = false
}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
          // console.log(entry, element);
          if (!callbackIn) {
            return;
          }
          callbackIn(element);

          if (isCallOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!callbackOut) {
            return;
          }
          callbackOut(element);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
      }
    );
  });

  if (!target) {
    return undefined;
  }

  observer.observe(target);
  return observer;
};

export default useObserver;
