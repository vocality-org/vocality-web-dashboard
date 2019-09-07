import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: auth,
    },
});
