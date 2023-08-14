import nodeMarquee from 'node-marquee';

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
    console.log(section);
  });
};

export default marqueeInit;
