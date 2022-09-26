import { createApp } from 'vue';
import App from './App.vue';
import 'vue-global-api';

import SfVueAnimatedCursor from './install';

const app = createApp(App);

app.use(SfVueAnimatedCursor, { basic: false });

app.mount('#app');
