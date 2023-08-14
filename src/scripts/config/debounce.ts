type TCallback = () => void;

interface IDebounce {
  callback: TCallback;
  wait?: number;
  isImmediate?: boolean;
}

const debounce = ({ callback, wait = 250, isImmediate = false }: IDebounce) => {
  let timeout: NodeJS.Timeout | undefined;

  return () => {
    const later = () => {
      timeout = undefined;
      callback();
    };

    const isCallNow = isImmediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (isCallNow) {
      callback();
    }
  };
};

export default debounce;
