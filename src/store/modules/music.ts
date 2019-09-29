import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

export interface IMusicState {
    isPlaying: boolean;
    volume: number;
    isLooping: boolean;
    lastSong: Song | undefined;
    currentSong: Song | undefined;
    queue: Song[];
}

@Module({
    name: 'music',
    namespaced: true,
})
export class Music extends VuexModule implements IMusicState {
    private lastVolume = 0;
    volume = 0;
    isPlaying = false;
    isLooping = false;
    lastSong: Song | undefined = undefined;
    currentSong: Song | undefined = undefined;
    queue: Song[] = [];

    get isMuted() {
        return this.volume === 0;
    }

    get nextUpSong(): Song | undefined {
        if (this.queue.length >= 1) {
            return this.queue[1];
        } else {
            return undefined;
        }
    }

    get songCurrentTime(): number | undefined {
        return this.currentSong ? this.currentSong.currentTimeMs / 1000 : undefined;
    }

    get songMaxTime(): number | undefined {
        return this.currentSong ? this.currentSong.maxTimeMs / 1000 : undefined;
    }

    @Mutation
    increaseCurrentSongTime(seconds: number) {
        this.currentSong!.currentTimeMs += 1000;
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
    switchLooping() {
        this.isLooping = !this.isLooping;
    }

    @Mutation
    setCurrentSong(song: Song) {
        this.currentSong = song;
    }

    @Mutation
    setQueue(queue: Song[]) {
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
}

export interface Song {
    title: string;
    thumbnailUrl: string;
    requestedBy: string;
    maxTimeMs: number;
    currentTimeMs: number;
}
