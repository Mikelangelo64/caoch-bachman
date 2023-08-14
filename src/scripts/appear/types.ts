export type TAppearAnimation = 'opacity' | 'clip-path';

export type TRender = (props: {
  progress: number;
  itemDom: HTMLElement;
}) => void;

export type TScrollCallback = (props: {
  progress: number;
  hidden: IUppearElement;
  shown: IUppearElement;
}) => void;

export interface IUseScrollEventProps {
  target: HTMLElement | null;
  callback?: TScrollCallback;
  isImmediate?: boolean;
}

export interface IUppearElement {
  dom: HTMLElement;
  height: number;
}

export interface IMakeAppearAnimation {
  container: HTMLElement;
  renderFunc?: TRender;
  animateElement?: HTMLElement | null;
}
