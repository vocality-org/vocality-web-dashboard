import {
    Module,
    VuexModule,
    MutationAction,
    Action,
    Mutation,
} from 'vuex-module-decorators';
import { PersistentUserDataState } from '..';

export interface IMusicState {
    isPlaying: boolean;
    volume: number;
    isAutoplaying: boolean;
    isLooping: boolean;
    isRandom: boolean;
    lastSong: Song | null;
    currentSong: Song | null;
    queue: Song[];
    pendingPlaylistAdd: Song | null;
}

export interface Song {
    _id?: string;
    title: string;
    url: string;
    thumbnail_url: string;
    requested_by: string;
    max_time_ms: number;
    current_time_ms: number;
    length_ms?: number;
    length?: string;
    author?: {
        avatarURL: string;
        channelUrl: string;
        name: string;
    };
}

@Module({
    name: 'music',
    namespaced: true,
})
export class Music extends VuexModule implements IMusicState {
    private lastVolume = 0;
    volume = 0;
    isPlaying = false;
    isAutoplaying = false;
    isLooping = false;
    isRandom = false;
    lastSong: Song | null = null;
    currentSong: Song | null = null;
    queue: Song[] = [];
    pendingPlaylistAdd: Song | null = null;

    get isMuted() {
        return this.volume === 0;
    }

    get nextUpSong(): Song | null {
        if (this.queue.length >= 1) {
            return this.queue[0];
        } else {
            return null;
        }
    }

    get queueDuration() {
        let duration_ms = 0;
        if (this.queue) {
            this.queue.forEach(s => (duration_ms += s.max_time_ms));
        }
        return msTimeToDisplayString(duration_ms);
    }

    get currentSongTimeSeconds(): number | null {
        return this.currentSong
            ? this.currentSong.current_time_ms / 1000
            : null;
    }

    get currentSongMaxTimeSeconds(): number | null {
        return this.currentSong ? this.currentSong.max_time_ms / 1000 : null;
    }

    @Mutation
    increaseCurrentSongTime(seconds: number) {
        this.currentSong!.current_time_ms += 1000;
    }

    @Mutation
    pause() {
        this.isPlaying = false;
    }

    @Mutation
    play() {
        this.isPlaying = true;
    }

    @Mutation
    mute() {
        this.lastVolume = this.volume;
        this.volume = 0;
    }

    @Mutation
    unmute() {
        if (this.lastVolume === 0) {
            this.volume = 100;
        } else {
            this.volume = this.lastVolume;
        }
    }

    @Mutation
    setVolume(volume: number) {
        if (volume < 0 || volume > 100) {
            throw 'Expected volume between 0 and 100';
        }
        this.volume = volume;
        this.lastVolume = volume;
    }

    @Mutation
    switchAutoplaying() {
        this.isAutoplaying = !this.isAutoplaying;
    }

    @Mutation
    switchLooping() {
        this.isLooping = !this.isLooping;
    }

    @Mutation
    switchRandom() {
        this.isRandom = !this.isRandom;
    }

    @Mutation
    setState(state: {
        autoplaying: boolean;
        looping: boolean;
        shuffling: boolean;
    }) {
        this.isAutoplaying = state.autoplaying;
        this.isLooping = state.looping;
        this.isRandom = state.shuffling;
    }

    @Mutation
    setCurrentSong(song: Song) {
        this.currentSong = song;
        PersistentUserDataState.addToHistory(song);
    }

    @Mutation
    setQueue(queue: Song[]) {
        queue.forEach(s => {
            if (!s._id) {
                s._id =
                    '_' +
                    Math.random()
                        .toString(36)
                        .substr(2, 9);
            }
        });
        this.queue = queue;
    }

    @Mutation
    removeFromQueueAt(index: number) {
        this.queue.splice(index, 1);
    }

    @Mutation
    nextSong() {
        this.lastSong = this.currentSong;
        if (this.queue.length > 0) {
            this.currentSong = this.queue.shift()!;
        }
    }

    @Mutation
    addToQueue(song: Song) {
        this.queue.push(song);
    }

    @Mutation
    setPendingPlaylistAdd(song: Song | null) {
        this.pendingPlaylistAdd = song;
    }

    @Action
    fetchSongLyrics(title: string) {
        return 'sd';
    }
}

/**
 * Converts given ms to a HH:mm:ss string
 *
 * @private
 * @param {number} ms Time to convert in milliseconds
 */
function msTimeToDisplayString(ms: number) {
    const t = new Date('0');
    t.setMilliseconds(ms);
    return [
        t.getHours() > 0 ? t.getHours() : '',
        t.getHours() ? ':' : '',
        t.getHours() && t.getMinutes() < 10 ? '0' : '',
        t.getMinutes() > 0 ? t.getMinutes() : '',
        t.getMinutes() ? ':' : '',
        t.getMinutes() && t.getSeconds() < 10 ? '0' : '',
        t.getSeconds(),
    ].join('');
}
