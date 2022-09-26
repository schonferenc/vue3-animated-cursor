import { SfVueAnimatedCursor, SfVueAnimatedCursorDefault } from './components';

export default {
  install: (app, options={}) => {

    if (options['basic'] === false)
      app.component(
        'sf-vue-animated-cursor',
        SfVueAnimatedCursorDefault
      );
    else app.component('sf-vue-animated-cursor', SfVueAnimatedCursor);
  },
};

