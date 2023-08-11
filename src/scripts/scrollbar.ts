import { ScrollBar } from 'vevet';
import vevet from './config/vevet';

const scrollBarInit = () => {
  let scrollBar;
  if (!vevet.isMobile) {
    scrollBar = new ScrollBar({ container: window });
  }

  return scrollBar;
};

export default scrollBarInit;
