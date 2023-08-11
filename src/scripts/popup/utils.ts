type TClickOutsideEvent = MouseEvent | TouchEvent;

export const useOutsideClick = (element: HTMLElement, callback: () => void) => {
  const listener = (event: TClickOutsideEvent) => {
    if (!element.contains(event?.target as Node) && event.which === 1) {
      callback();
    }
  };

  document.addEventListener('mousedown', listener);
};

export const useOnEscape = (callback: () => void) => {
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      callback();
    }
  });
};
