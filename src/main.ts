import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import './registerServiceWorker';

import { setupInterceptorTokenBearer } from '@/interceptors/tokenBearer';
setupInterceptorTokenBearer();

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
