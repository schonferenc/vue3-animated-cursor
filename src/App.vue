<template lang="pug">
.header
    pre target: {{ target }}
    pre y: {{ cursor.move.y }}
    pre x: {{ cursor.move.x }}
    pre visible: {{ cursor.move.visible }}
    pre hover: {{ cursor.hover }}
    pre click: {{ cursor.click }}

.row
  pre #app

.row 
  .col
      h3 Set the target to:  
      button.hoverable(@click.prevent="target = '#app'") #app
      button.hoverable(@click.prevent="target = '.container'") .container
      button.hoverable(@click.prevent="target = 'null'") null

  .col
    .container
      pre .container
    button.hoverable.secondary Click me

sf-vue-animated-cursor(
  @move="onMove",
  @click="onClick",
  @hover="onHover",
  :target="target",
  :key="target"
)

</template>

<script setup>
// import SfVueAnimatedCursor from './components/sf-vue-animated-cursor';
// import SfVueAnimatedCursorDefault from './components/sf-vue-animated-cursor-default';

let target = ref('#app');

let cursor = reactive({
  move: '',
  click: '',
  hover: '',
});

const onMove = (e) => {
  cursor.move = e;
};
const onClick = (e) => {
  cursor.click = e;
};
const onHover = (e) => {
  cursor.hover = e;
};
</script>

<style lang="scss">
html,
body {
  display: flex;
  margin: 0;
  padding: 0;
  background: #90acd111;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  user-select: none;
  font-size: 12px;

  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #app {
    margin: auto;
    background: rgba(255, 255, 255, 0.845);
    color: #e45447;
    border: 1px #e454474f solid;
    border-radius: 5px;

    .header {
      display: flex;
      justify-content: space-between;
      padding: 24px;
      flex-wrap: wrap;
      background: #e45447;
      color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      padding: 16px;
    }

    .col {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-right: 24px;
      margin-inline: 16px;
    }

    pre {
      margin-inline: 16px;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 200px;
      background: #90acd1;
      color: #fff;
      border-radius: 5px;
    }

    button {
      background: #90acd1;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-weight: 400;
      letter-spacing: 1px;
      line-height: 0;
      padding: 24px 32px;
      margin-block: 8px;
      border-radius: 5px;
      transition: color 0.4s linear;
      position: relative;
      z-index: 1;
      border: 0;
      overflow: hidden;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #e45447;
        z-index: 1;
        border-radius: 5px;
        transition: transform 0.5s;
        transition-timing-function: ease;
        transform-origin: 0 0;
        transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
        -webkit-transform: scaleX(0);
        -ms-transform: scaleX(0);
        transform: scaleX(0);
        z-index: -1;
      }

      &:hover {
        &::before {
          -webkit-transform: scaleX(1);
          -ms-transform: scaleX(1);
          transform: scaleX(1);
          z-index: -1;
        }
      }
      &.secondary {
        background: #e45447;

        &:hover {
          &::before {
            background: #90acd1;
          }
        }
      }
    }
  }
}
</style>
