import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';

import './plugins/socket';
import './registerServiceWorker';

import { setupInterceptorTokenBearer } from '@/interceptors/tokenBearer';
setupInterceptorTokenBearer();

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,

    sockets: {
        connect() {
            console.log('socket connected');
        },
        disconnect() {
            console.log('socket disconnected');
        },
    },

    i18n,
    render: h => h(App),
}).$mount('#app');
