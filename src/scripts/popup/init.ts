import Popup from './popupClass';

const initPopups = (): Popup[] => {
  const popupDomArr = document.querySelectorAll('.popup');

  if (popupDomArr.length === 0) {
    return [];
  }

  const popupArr: Popup[] = [];

  popupDomArr.forEach((element) => {
    const popup = new Popup(element as HTMLElement);
    popupArr.push(popup);
  });

  popupArr.forEach((popup) => {
    popup.initOpen(popupArr);
  });

  return popupArr;
};

export default initPopups;
