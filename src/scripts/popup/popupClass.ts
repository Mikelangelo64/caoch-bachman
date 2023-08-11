import { Timeline } from 'vevet';
import { useOnEscape, useOutsideClick } from './utils';
import makeTimeline from './makeTimeline';

class Popup {
  get parent() {
    return this._parent;
  }

  private _parent: HTMLElement;

  get name() {
    return this._name;
  }

  private _name: string | undefined;

  get isThanks() {
    return this._isThanks;
  }

  private _isThanks: boolean = false;

  get isError() {
    return this._isError;
  }

  private _isError: boolean = false;

  get scroll() {
    return this._scroll;
  }

  private _scroll: HTMLElement | null;

  get overlay() {
    return this._overlay;
  }

  private _overlay: HTMLElement | null;

  get additional() {
    return this._additional;
  }

  private _additional: HTMLElement | null;

  get wrapper() {
    return this._wrapper;
  }

  private _wrapper: HTMLElement | null;

  get video() {
    return this._video;
  }

  private _video: HTMLVideoElement | null;

  get timeline() {
    return this._timeline;
  }

  private _timeline: Timeline | undefined;

  get closeButtons() {
    return this._closeButtons;
  }

  private _closeButtons: Array<HTMLElement | null> = [];

  get openButtons() {
    return this._openButtons;
  }

  private _openButtons: HTMLElement[] = [];

  constructor(domElement: HTMLElement) {
    this._parent = domElement;
    this._name = domElement.dataset.popupname;
    this._scroll = this._parent.querySelector('.popup__scroll');
    this._overlay = this._parent.querySelector('.popup__overlay');
    this._wrapper = this._parent.querySelector('.popup__wrapper');
    this._additional = this._parent.querySelector('.popup__additional');
    this._video = this._parent.querySelector('.video');

    if (!this._name || !this._scroll || !this._overlay || !this._wrapper) {
      return;
    }
    this._isThanks = this._name === '_popup-thanks';
    this._isError = this._name === '_popup-error';

    this._timeline = makeTimeline(
      this._parent,
      this._scroll,
      this._overlay,
      this._additional,
      this._video
    );

    this._openButtons = Array.from(
      document.querySelectorAll(`[data-popup="${this._name}"]`)
    );
    this._closeButtons = Array.from(
      this._parent.querySelectorAll(
        '.popup__close, .popup__button'
      ) as NodeListOf<HTMLElement>
    );

    if (this._closeButtons.length !== 0) {
      this._closeButtons.forEach((button) => {
        if (!button) {
          return;
        }

        button.addEventListener('click', () => {
          this._timeline?.reverse();
        });
      });
    }

    useOutsideClick(this._wrapper, () => {
      if (this._parent.classList.contains('_opened')) {
        this._timeline?.reverse();
        document.querySelector('html')?.classList.remove('lock');
        document.querySelector('body')?.classList.remove('lock');

        this._video?.pause();
      }
    });

    useOnEscape(() => {
      if (this._parent.classList.contains('_opened')) {
        this._timeline?.reverse();

        document.querySelector('html')?.classList.remove('lock');
        document.querySelector('body')?.classList.remove('lock');

        this._video?.pause();
      }
    });
  }

  initOpen(popupArr: Popup[]) {
    if (popupArr.length === 0 || !this._openButtons) {
      return;
    }
    this._openButtons.forEach((openBtn) => {
      openBtn.addEventListener('click', (evt) => {
        evt.preventDefault();

        popupArr.forEach((popup) => {
          if (
            popup.parent.classList.contains('_opened') &&
            popup.name !== this._name
          ) {
            popup.timeline?.reverse();
          }
        });

        this._timeline?.play();
      });
    });
  }
}

export default Popup;
