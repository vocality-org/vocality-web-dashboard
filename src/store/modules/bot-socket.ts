import { DiscordState } from '@/store';
import { MusicState } from './../index';
import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import { Song } from './music';

export interface IBotSocketState {}

@Module({
    name: 'botSocket',
    namespaced: true,
})
export class BotSocket extends VuexModule implements IBotSocketState {
    @Action
    socket_botGuilds(message: string[]) {
        console.log('socket event: botGuild', message);
        DiscordState.setBotGuildsWithId(message);
    }

    @Action
    socket_currentQueue(message: Song[]) {
        console.log('socket event: currentQueue', message);
        MusicState.setQueue(message);
    }

    @Action
    socket_currentSong(message: any) {
        console.log('socket event: currentSong', message);
        MusicState.setCurrentSong(message);
    }
}
