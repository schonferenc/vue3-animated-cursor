import { ref } from 'vue';
import useEventListener from './events';

// move behavior
export const mouseMove = (target) => {

  const cursorX = ref(0);
  const cursorY = ref(0);

  useEventListener(target, 'mousemove', (event) => {
    cursorX.value = event.clientX;
    cursorY.value = event.clientY;
  });

  return { cursorX, cursorY };

};

// click behavior
export const mouseClick = (target, duration) => {

  let clickEffect = ref(null);

  const animateMouseClick = () => {
    clickEffect.value = true;
    setTimeout(() => {
      clickEffect.value = false;
    }, duration);
  };

  useEventListener(target, 'click', animateMouseClick);

  return { clickEffect };

};

// hover behavior
export const mouseOver = (target, hoverable) => {

  const hoverEffect = ref(false);

  const hoverDetection = (e) => {

    hoverEffect.value = e.target.classList.contains(hoverable);
  };

  useEventListener(target, 'mouseover', hoverDetection);

  return { hoverEffect };

};

// cursor visibility
export const cursorVisibility = (target) => {

  const visible = ref(false);

  const hideCursor = () => {
    visible.value = false;
  };

  const showCursor = () => {
    visible.value = true;
  };

  useEventListener(target, 'mouseleave', hideCursor);
  useEventListener(target, 'mouseenter', showCursor);

  return { visible };

};
