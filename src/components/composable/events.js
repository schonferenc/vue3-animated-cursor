import { onMounted, onUnmounted } from 'vue';

// managing event listeners
const useEventListener = (targets, event, callback) => {
  if (!targets) return;
  let targetsArray = null;

  onMounted(() => {
    targetsArray = document.querySelectorAll(targets);
    addEventListeners(targetsArray, event, callback);
  });

  onUnmounted(() => removeEventListeners(targetsArray, event, callback));
};

// add event listeners to all elements of the array
const addEventListeners = (targetsArray, event, callback) => {
  if (!targetsArray.length) return;

  targetsArray.forEach((target) => {
    target.addEventListener(event, callback);
  });
};

// remove event listeners from all elements of the array
const removeEventListeners = (targetsArray, event, callback) => {
  if (!targetsArray.length) return;

  targetsArray.forEach((target) => {
    target.removeEventListener(event, callback);
  });
};

export default useEventListener;
