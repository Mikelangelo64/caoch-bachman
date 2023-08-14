const videoHandler = () => {
  const videoArr = document.querySelectorAll(
    '.video'
  ) as NodeListOf<HTMLVideoElement>;

  if (videoArr.length === 0) {
    return;
  }

  videoArr.forEach((video) => {
    if (!video) {
      return;
    }

    const source = video.querySelector('source');

    if (!source) {
      return;
    }

    const dataSrc = source.dataset.src;

    if (!dataSrc) {
      return;
    }

    source.src = dataSrc;

    video.load();

    video.addEventListener('loadeddata', () => {
      setTimeout(() => {
        video.classList.add('loaded');
      }, 0);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  videoHandler();
});
