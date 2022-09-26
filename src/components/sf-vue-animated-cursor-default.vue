<template lang="pug">
//- outer cursor
sf-vue-animated-cursor(
  :target="target",
  :teleport-to="teleportTo"
  :watch="watch"
  :click-animation="false",
  :hover-animation="false",
  :width="30",
  :height="30",
  bg-color="none"
)
//- inner cursor
sf-vue-animated-cursor(
  :target="target",
  :teleport-to="teleportTo"
  :watch="watch"
  :slow-down="0.02",
  @move="$emit('move', $event)",
  @click="$emit('click', $event)"
  @hover="$emit('hover', $event)"
)

</template>

<script setup>
import SfVueAnimatedCursor from './sf-vue-animated-cursor';

const emit = defineEmits(['move', 'click', 'hover']);

const props = defineProps({
  target: {
    type: String,
    default: '#app',
  },
  teleportTo: {
    type: String,
    default: 'body',
  },
  watch: {
    type: Boolean,
    default: true,
  },
});
</script>
