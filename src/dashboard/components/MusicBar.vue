<template>
    <v-bottom-navigation app>
        <div class="music-bar">
            <div class="playback-bar">
                <v-progress-linear
                    :value="(currentSongTimeSeconds / currentSongMaxTimeSeconds) * 100"
                    height="2"
                    background-color="#595959"
                ></v-progress-linear>
            </div>
            <div v-if="currentSong && $vuetify.breakpoint.mdAndUp" class="current-song song-container">
                <img class="song-img" :src="currentSong.thumbnail_url" height="32" width="32" />
                <span class="song-title">{{ currentSong.title }}</span>
                <span class="subtitle" style="margin-bottom: 1px;">requested by {{ currentSong.requested_by }}</span>
            </div>
            <div v-if="!currentSong && $vuetify.breakpoint.mdAndUp">
                <div class="song-placeholder" style="margin-left: 38px"></div>
            </div>

            <span v-if="currentSong" class="caption" style="margin-top: 2px">{{ formatTime(currentSongTimeSeconds) }}</span>

            <div class="controls" :class="{ 'center-on-sm': $vuetify.breakpoint.smAndDown }">
                <v-icon class="mx-2 ico-btn" :class="{ 'ico-btn-active': isLooping }" @click="switchLooping()">
                    {{ loopIcon }}
                </v-icon>
                <v-icon class="mx-2 ico-btn">{{ previousIcon }}</v-icon>
                <v-icon v-if="isPlaying" class="mx-2 ico-btn" @click="setPlaying(false)">{{ pauseIcon }}</v-icon>
                <v-icon v-else class="mx-2 ico-btn" @click="setPlaying(true)">{{ playIcon }}</v-icon>
                <v-icon class="mx-2 ico-btn">{{ skipIcon }}</v-icon>
                <v-menu
                    top
                    offset-y
                    open-on-hover
                    nudge-top="4"
                    transition="slide-y-reverse-transition"
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ on }">
                        <div v-on="on" class="volume">
                            <v-icon v-if="isMuted" class="mx-2 ico-btn" @click="unmute()">{{ mutedIcon }}</v-icon>
                            <v-icon v-else class="mx-2 ico-btn" @click="mute()">{{ volumeIcon }}</v-icon>
                        </div>
                    </template>
                    <v-card class="volume-slider">
                        <v-slider class="my-2" v-model="volume" vertical></v-slider>
                    </v-card>
                </v-menu>
            </div>

            <span v-if="currentSong" class="caption" style="margin-top: 2px">{{ formatTime(currentSongMaxTimeSeconds) }}</span>

            <div v-if="nextUpSong && $vuetify.breakpoint.mdAndUp" class="next-song song-container" @click="openQueueDrawer()">
                <img class="song-img" :src="nextUpSong.thumbnail_url" height="32" width="32" />
                <span class="subtitle" style="margin-top: 1px;">Up Next</span>
                <span class="song-title">{{ nextUpSong.title }}</span>
            </div>
            <div v-if="!nextUpSong && $vuetify.breakpoint.mdAndUp">
                <div style="left: -205px" class="song-placeholder"></div>
            </div>
        </div>
    </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mdiPlay, mdiSkipNext, mdiSkipPrevious, mdiVolumeHigh, mdiVolumeOff, mdiReplay, mdiPause } from '@mdi/js';
import { mapState, mapGetters } from 'vuex';
import { MusicState, AppState } from '@/store';

@Component({
    computed: {
        volume: {
            get() {
                return MusicState.volume;
            },
            set(value: number) {
                MusicState.setVolume(value);
            },
        },
        ...mapGetters('music', ['isMuted', 'nextUpSong', 'currentSongTimeSeconds', 'currentSongMaxTimeSeconds']),
        ...mapState('music', ['isPlaying', 'isLooping']),
    },
})
export default class MusicBar extends Vue {
    loopIcon = mdiReplay;
    playIcon = mdiPlay;
    pauseIcon = mdiPause;
    skipIcon = mdiSkipNext;
    previousIcon = mdiSkipPrevious;
    volumeIcon = mdiVolumeHigh;
    mutedIcon = mdiVolumeOff;
    progress = 0.0;

    get currentSong() {
        return MusicState.currentSong;
    }

    setPlaying(state: boolean) {
        state ? MusicState.play() : MusicState.pause();
    }

    switchLooping() {
        MusicState.switchLooping();
    }

    mute() {
        MusicState.mute();
    }

    unmute() {
        MusicState.unmute();
    }

    openQueueDrawer() {
        AppState.queueDrawer.open();
    }

    formatTime(s: number): string {
        const t = new Date('0');
        t.setSeconds(s);
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

    updateProgress() {
        if (this.currentSong && this.currentSong.current_time_ms < this.currentSong.max_time_ms) {
            MusicState.increaseCurrentSongTime(1);
        }
    }

    created() {
        setInterval(() => {
            this.updateProgress();
        }, 1000);
    }
}
</script>

<style lang="scss" scoped>
.volume {
    display: inline;
    position: relative;
}

.volume-slider {
    overflow: hidden;
}

.music-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    margin-top: 2px; // progress bar
}

.song-container {
    display: grid;
    height: 32px;
    column-gap: 8px;
    grid-template-columns: 32px minmax(100px, 250px);
    position: relative;
    border-radius: 4px;
    white-space: nowrap;
    transition: background-color 100ms ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.13);
        cursor: pointer;
        &::after {
            display: none;
        }
    }

    &::after {
        content: '';
        position: absolute;
        right: 0;
        width: 16px;
        height: 100%;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(66, 66, 66, 1) 100%);
    }

    .song-img {
        grid-area: img;
        border-radius: 4px;
    }

    .song-title {
        font-size: 17px;
        line-height: 18px;
        font-weight: 300;
        overflow: hidden;
    }

    .subtitle {
        font-size: 11px;
        line-height: 11px;
        font-weight: 300;
        opacity: 0.7;
    }
}

.current-song {
    grid-template-areas:
        'img title'
        'img subtitle';
}

.next-song {
    grid-template-areas:
        'img subtitle'
        'img title';
}

.ico-btn {
    height: 32px;
    width: 32px;
    padding: 4px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.13);
    }
    &-active {
        fill: clr(brand, cyan);
    }
}

.center-on-sm {
    margin: 0 auto !important;
}

.playback-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .bar {
        position: absolute;
        top: 0;
        height: 1.5px;
    }

    .progress {
        background-color: clr(brand, cyan);
        width: 50%;
    }
}

.song-placeholder {
    $color: rgba(255, 255, 255, 0.164);
    left: -42px;
    height: 32px;
    width: 32px;
    border-radius: 4px;
    background-color: $color;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        height: 7px;
        left: 38px;
        width: 150px;
        border-radius: 4px;
        background-color: $color;
        top: 18px;
        transform-origin: left;
        animation: 300ms ease-in 0s 1 slideInOnLoad;
    }
    &::before {
        content: '';
        position: absolute;
        height: 11px;
        left: 38px;
        width: 200px;
        margin-bottom: 14px;
        border-radius: 4px;
        background-color: $color;
        transform-origin: left;
        animation: 300ms ease-in 0s 1 slideInOnLoad;
    }
}

@keyframes slideInOnLoad {
    0% {
        transform: scaleX(0.5);
    }
    100% {
        transform: scaleX(1);
    }
}
</style>
