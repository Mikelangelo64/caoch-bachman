const clearScrollListener = (listener: () => void) => {
  window.removeEventListener('scroll', listener);
};

export default clearScrollListener;
