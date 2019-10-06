import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import { DiscordState, MusicState } from '@/store';
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
    socket_currentQueue(message: any) {
        console.log('socket event: currentQueue', message);
        MusicState.setQueue(toSongArray(message));
    }

    @Action
    socket_currentSong(message: any) {
        console.log('socket event: currentSong', message);
        MusicState.setCurrentSong(message);
    }
}

function toSongArray(message: any): Song[] {
    const songs = new Array<Song>();
    message.forEach((s: any) => {
        songs.push({
            url: s.url,
            title: s.title,
            thumbnail_url: s.thumbnail_url,
            requested_by: s.requested_by,
            current_time_ms: 0,
            max_time_ms: s.length_ms,
        });
    });
    return songs;
}
