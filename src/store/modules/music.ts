import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

export interface IMusicState {
    isPlaying: boolean;
    volume: number;
    isLooping: boolean;
}

@Module({
    name: 'music',
    namespaced: true,
})
export class Music extends VuexModule implements IMusicState {
    isPlaying = false;
    private lastVolume = 0;
    volume = 0;
    isLooping = false;

    get isMuted() {
        return this.volume === 0;
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
            this.volume = 100; //! probably bad but needed to test
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
}
