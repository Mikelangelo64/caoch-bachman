import makeSlider from './sliderHandler';
import Swiper from 'swiper';

interface IInitializedSlider {
  name: string;
  slider: Swiper | undefined;
}

const slidersInit = () => {
  const sliders: Array<IInitializedSlider> = [];

  const resultsArray = document.querySelectorAll(
    '.results'
  ) as NodeListOf<HTMLElement>;

  if (resultsArray.length === 0) {
    return undefined;
  }

  resultsArray.forEach((item) => {
    const slider = makeSlider({
      container: item,
      className: 'results',
      config: {
        slidesPerView: 1,
        spaceBetween: 30,

        breakpoints: {
          660: {
            slidesPerView: 2
          },

          899: {
            slidesPerView: 'auto',
            spaceBetween: 54
          }
        }
      }
    });

    sliders.push({ name: 'results', slider });
  });

  return sliders;
};

export default slidersInit;
