<template lang="pug">
teleport(:to="teleportTo")
  transition(name="fade", appear)
    .sf-vue-animated-cursor(
      ref="cursor",
      v-bind="$attrs",
      v-if="visibility",
      :style="[position, styles]",
      :class="[clickClass, hoverClass]"
    )
</template>

<script setup>
import {computed, watch, ref} from 'vue'
// composables
import {
  mouseMove,
  mouseClick,
  mouseOver,
  cursorVisibility,
} from './composable/behavior';

const { cursorX, cursorY } = mouseMove(props.target);
const { clickEffect } = mouseClick(props.target, 300);
const { hoverEffect } = mouseOver(props.target, props.hoverable);
const { visible } = cursorVisibility(props.target);

// emits
const emit = defineEmits(['move', 'click', 'hover']);

// props
const props = defineProps({
  teleportTo: {
    type: String,
    default: 'body',
  },
  target: {
    type: String,
    default: '#app',
  },
  show: {
    type: Boolean,
    default: true,
  },
  watch: {
    type: Boolean,
    default: true,
  },
  width: {
    type: Number,
    default: 6,
  },
  height: {
    type: Number,
    default: 6,
  },
  bgColor: {
    type: String,
    default: '#657786',
  },
  borderColor: {
    type: String,
    default: '#657786',
  },
  borderWidth: {
    type: Number,
    default: 1,
  },
  borderRadius: {
    type: Number,
    default: 50,
  },
  slowDown: {
    type: Number,
    default: 0,
  },
  hoverable: {
    type: String,
    default: 'hoverable',
  },
  hoverAnimation: {
    type: Boolean,
    default: true,
  },
  clickAnimation: {
    type: Boolean,
    default: true,
  },
  mixBlendMode: {
    type: String,
    default: 'difference',
  },
  scaleOnClick: {
    type: Number,
    default: 2,
  },
  scaleOnHoverClick: {
    type: Number,
    default: 2,
  },
  scaleOnHover: {
    type: Number,
    default: 3,
  },
  opacityOnHover: {
    type: Number,
    default: 0.5,
  },
});

/* Visibility */

// cursor visibility
let visibility = computed(
  () => props.show && visible.value && cursorX.value > 0 && cursorY.value > 0
);

/* Move */

// the current position of the cursor in pixels
const position = computed(() => ({
  top: `${cursorY.value}px`,
  left: `${cursorX.value}px`,
}));

/* Styles */

// initialization of the styles
const styles = computed(() => ({
  marginLeft: `-${props.width / 2 + props.borderWidth}px`,
  marginTop: `-${props.height / 2 + props.borderWidth}px`,
  height: `${props.height}px`,
  width: `${props.width}px`,
  border: `${props.borderWidth}px ${props.borderColor} solid`,
  borderRadius: `${props.borderRadius}%`,
  background: props.bgColor,
  mixBlendMode: props.mixBlendMode,
  transition: `top ${props.slowDown}s linear, left ${props.slowDown}s linear, transform 0.3s ease-in-out, opacity 0.3s ease`,
}));

// I don't initialize these values in the onMounted hook because the cursor doesn't exist until we move the mouse

const cursor = ref(null);
const initialized = ref(false);

// overriding css variables
if (!initialized.value)
  watch(
    () => cursor.value,
    () => {
      if (cursor.value) {
        cursor.value.style.setProperty(
          '--click-default-scale',
          props.scaleOnClick
        );
        cursor.value.style.setProperty(
          '--click-hover-scale',
          props.scaleOnHoverClick
        );
        cursor.value.style.setProperty('--hover-scale', props.scaleOnHover);
        cursor.value.style.setProperty('--hover-opacity', props.opacityOnHover);
        initialized.value = true;
      }
    }
  );
/* Click */

// calculating the click animation
const clickClass = computed(() => {
  if (props.clickAnimation && clickEffect.value) {
    return hoverEffect.value && props.hoverAnimation
      ? 'click--hover-animation'
      : 'click--default-animation';
  }
  return false;
});

/* Hover */

// calculating the hover animation
const hoverClass = computed(() => {
  if (props.hoverAnimation && hoverEffect.value) {
    return 'hover--default-animation';
  }
  return null;
});

// emitting values on move and click event, if the watch attribute exists
if (props.watch) {
  watch(position, () => {
    emit('move', {
      x: cursorX,
      y: cursorY,
      visible: visibility,
    });
  });

  watch(
    () => hoverEffect.value,
    () => {
      emit('hover', hoverEffect);
    }
  );

  watch(
    () => clickEffect.value,
    () => {
      emit('click', clickEffect);
    }
  );
}
</script>

<style lang="scss" scoped>
@import './sf-vue-animated-cursor-style.scss';
</style>
