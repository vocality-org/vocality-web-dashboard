import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';

import { IAuthState, Auth } from './modules/auth';

interface IRootState {
    auth: IAuthState;
}

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<IRootState>({
    storage: window.localStorage,
    modules: ['auth'],
});

const store = new Vuex.Store<IRootState>({
    modules: {
        auth: Auth,
    },
    plugins: [vuexLocal.plugin],
});

export default store;
export const AuthState = getModule(Auth, store);
