import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';

import { IAuthState, Auth } from './modules/auth';
import { IDiscordState, Discord } from './modules/discord';

interface IRootState {
    auth: IAuthState;
    discord: IDiscordState;
}

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<IRootState>({
    storage: window.localStorage,
    modules: ['auth', 'discord'],
});

const store = new Vuex.Store<IRootState>({
    modules: {
        auth: Auth,
        discord: Discord,
    },
    plugins: [vuexLocal.plugin],
});

export const AuthState = getModule(Auth, store);
export const DiscordState = getModule(Discord, store);

export default store;
