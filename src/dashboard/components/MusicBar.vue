<template>
    <v-bottom-navigation app>
        <div class="music-bar">
            <div class="current-song song-container" v-if="$vuetify.breakpoint.mdAndUp">
                <img class="song-img" src="https://i1.sndcdn.com/artworks-000576266747-svvc65-t500x500.jpg" height="32" />
                <span class="song-title">Will Sparks - Egypt</span>
                <span class="subtitle" style="margin-bottom: 1px;">requested by boolean</span>
            </div>
            <div class="controls" :class="{ 'center-on-sm': $vuetify.breakpoint.smAndDown }">
                <v-icon class="mx-2 ico-btn" :class="{ 'ico-btn-active': isLooping }" @click="switchLooping()">
                    {{ loopIcon }}
                </v-icon>
                <v-icon class="mx-2 ico-btn">{{ previousIcon }}</v-icon>
                <v-icon v-if="isPlaying" class="mx-2 ico-btn" @click="setPlaying(false)">{{ pauseIcon }}</v-icon>
                <v-icon v-else class="mx-2 ico-btn" @click="setPlaying(true)">{{ playIcon }}</v-icon>
                <v-icon class="mx-2 ico-btn">{{ skipIcon }}</v-icon>
                <div class="volume">
                    <v-icon v-if="isMuted" class="mx-2 ico-btn" @click="unmute()">{{ mutedIcon }}</v-icon>
                    <v-icon v-else class="mx-2 ico-btn" @click="mute()">{{ volumeIcon }}</v-icon>
                </div>
            </div>
            <div class="next-song song-container" @click="openQueueDrawer()" v-if="$vuetify.breakpoint.mdAndUp">
                <img class="song-img" src="https://i1.sndcdn.com/artworks-000097107321-1mn0be-t500x500.jpg" height="32" />
                <span class="subtitle" style="margin-top: 1px;">Up Next</span>
                <span class="song-title">Will Sparks - Ah Yeah So What (feat. Wiley & Elen Levon) [OUT NOW]</span>
            </div>
            <div v-else>
                <v-icon class="ico-btn" @click="openQueueDrawer()">{{ queue }}</v-icon>
            </div>
        </div>
    </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
    mdiPlay,
    mdiSkipNext,
    mdiSkipPrevious,
    mdiVolumeHigh,
    mdiVolumeOff,
    mdiReplay,
    mdiPause,
    mdiPlaylistMusic,
} from '@mdi/js';
import { mapState, mapGetters } from 'vuex';
import { MusicState, AppState } from '@/store';

@Component({
    computed: {
        ...mapGetters('music', ['isMuted']),
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
    queue = mdiPlaylistMusic;

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
}
</script>

<style lang="scss" scoped>
.volume {
    display: inline;
    position: relative;
}
.music-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
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
</style>
