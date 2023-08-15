// import { Preloader } from 'vevet';
import { init } from '@/scripts/main';
// import '@/scripts/video';
// import '@/styles/styles.scss';
// import 'normalize.css/normalize.css';
import vevet from './scripts/config/vevet';

// document.addEventListener('DOMContentLoaded', () => {
//   init();
// });
// eslint-disable-next-line no-new
// new Preloader({
//   container: '#v-preloader',
//   hide: 300
// });

vevet.pageLoad.onLoaded(() => {
  init();
});
