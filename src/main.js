const { createApp, ref } = require('vue');
window.collect = require('collect.js');
import App from './App.vue';

let app = createApp(App);

// Init peerjs, imported from CDN.  Couldnet get import to work on Stackblitz for some reason
const peer = new Peer();

app.config.globalProperties.$peer = peer;

app.mount('#app');
