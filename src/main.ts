import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/vuex';
import vuetify from '@/plugins/vuetify';
import './registerServiceWorker';

import interceptorsSetup from '@/interceptors/tokenBearer';
interceptorsSetup();

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
