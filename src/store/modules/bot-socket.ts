import { DiscordState } from '@/store';
import { MusicState } from './../index';
import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

export interface IBotSocketState {}

@Module({
    name: 'botSocket',
    namespaced: true,
})
export class BotSocket extends VuexModule implements IBotSocketState {
    @Action
    socket_botGuilds(message: string[]) {
        console.log(message);
        DiscordState.setBotGuildsWithId(message);
    }

    @Action
    socket_currentQueue(message: any) {
        console.log(message);
        MusicState.setQueue(message);
    }

    @Action
    socket_currentSong(message: any) {
        console.log(message);
        MusicState.setCurrentSong(message);
    }
}
