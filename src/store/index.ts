import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';

import { IAppState, App } from './modules/app';
import { IAuthState, Auth } from './modules/auth';
import { IBotSocketState, BotSocket } from './modules/bot-socket';
import { IDiscordState, Discord } from './modules/discord';
import { IMusicState, Music } from './modules/music';
import { IYouTubeState, YouTube } from './modules/youtube';

interface IRootState {
    app: IAppState;
    auth: IAuthState;
    botSocket: IBotSocketState;
    discord: IDiscordState;
    music: IMusicState;
    youtube: IYouTubeState;
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
        botSocket: BotSocket,
        discord: Discord,
        music: Music,
        youtube: YouTube,
    },
    plugins: [vuexLocal.plugin],
});

export const AppState = getModule(App, store);
export const AuthState = getModule(Auth, store);
export const BotSocketState = getModule(BotSocket, store);
export const DiscordState = getModule(Discord, store);
export const MusicState = getModule(Music, store);
export const YouTubeState = getModule(YouTube, store);

export default store;
