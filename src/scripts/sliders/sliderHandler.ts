import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types/swiper-options';

interface IMakeSlider {
  container: HTMLElement | null;
  className: string;
  isThumb?: boolean;
  thumb?: Swiper | undefined;
  config?: SwiperOptions | undefined;
}

const makeSlider = ({
  container,
  className,
  isThumb = false,
  thumb = undefined,
  config
}: IMakeSlider) => {
  if (!container || !className) {
    return undefined;
  }

  const slider =
    (container.querySelector(
      `.${className}-slider${isThumb ? '-thumb' : ''}.swiper`
    ) as HTMLElement) || null;

  if (!slider) {
    return undefined;
  }

  const arrowPrev = container.querySelector(
    `.${className}-slider${
      isThumb ? '-thumb' : ''
    }-controls .${className}-slider-prev`
  ) as HTMLElement | null;

  const arrowNext = container.querySelector(
    `.${className}-slider${
      isThumb ? '-thumb' : ''
    }-controls .${className}-slider-next`
  ) as HTMLElement | null;

  const sliderInit = new Swiper(slider, {
    modules: [Navigation, Thumbs],
    thumbs: {
      swiper: thumb
    },
    navigation: {
      nextEl: arrowNext,
      prevEl: arrowPrev
    },

    slidesPerView: 1,
    spaceBetween: 30,

    ...config
  });

  return sliderInit;
};

export default makeSlider;
