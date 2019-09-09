import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { AuthState } from './modules';

interface State {
    auth: AuthState;
}

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<State>({
    storage: window.localStorage,
    reducer: state => ({ navigation: state.auth }), //only presist auth
    // filter: mutation => mutation.type == '', // filter, all true by default
});

const store = new Vuex.Store<State>({
    modules: {
        auth: AuthState,
    },
    plugins: [vuexLocal.plugin],
});

export default store;
