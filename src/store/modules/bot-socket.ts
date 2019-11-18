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
        MusicState.setCurrentSong(toSong(message));
    }

    @Action
    socket_currentState(message: any) {
        console.log('socket event: currentState', message);
        MusicState.isAutoplaying = message.autoplay;
        MusicState.isLooping = message.loop;
        MusicState.isRandom = message.shuffle;
    }
}

function toSong(currentSong: any): Song {
    return {
        title: currentSong.song.title,
        current_time_ms: currentSong.current_time_ms,
        max_time_ms: currentSong.song.length_ms,
        requested_by: currentSong.song.requested_by,
        thumbnail_url: currentSong.song.thumbnail_url,
        url: currentSong.song.url,
        length_ms: currentSong.song.length_ms,
        length: currentSong.song.length,
        author: currentSong.song.author,
    };
}

function toSongArray(currentQueue: any): Song[] {
    const songs = new Array<Song>();
    currentQueue.forEach((s: any) => {
        songs.push({
            url: s.url,
            title: s.title,
            thumbnail_url: s.thumbnail_url,
            requested_by: s.requested_by,
            current_time_ms: 0,
            max_time_ms: s.length_ms,
            length: s.length,
            length_ms: s.length_ms,
            author: s.author,
        });
    });
    return songs;
}
