import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';

import { IAppState, App } from './modules/app';
import { IAuthState, Auth } from './modules/auth';
import { IDiscordState, Discord } from './modules/discord';
import { IMusicState, Music } from './modules/music';

interface IRootState {
    app: IAppState;
    auth: IAuthState;
    discord: IDiscordState;
    music: IMusicState;
}

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<IRootState>({
    storage: window.localStorage,
    modules: ['auth', 'discord'],
});

const store = new Vuex.Store<IRootState>({
    modules: {
        app: App,
        auth: Auth,
        discord: Discord,
        music: Music,
    },
    plugins: [vuexLocal.plugin],
});

export const AppState = getModule(App, store);
export const AuthState = getModule(Auth, store);
export const DiscordState = getModule(Discord, store);
export const MusicState = getModule(Music, store);

export default store;
