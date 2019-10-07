<template>
    <div>
        <div class="container">
            <div class="search">
                <v-text-field
                    v-model="searchInputValue"
                    solo
                    hide-details
                    :prepend-inner-icon="searchIcon"
                    label="Search for a song"
                    @change="inputChanged(value)"
                ></v-text-field>
                <div class="row api-select">
                    <v-checkbox
                        class="mx-4"
                        :on-icon="youtubeIcon"
                        label="YouTube"
                        color="#ff0000"
                        v-model="ytState"
                    ></v-checkbox>
                    <v-checkbox
                        class="mx-4"
                        :on-icon="soundcloudIcon"
                        label="SoundCloud"
                        color="#f95738"
                        v-model="scState"
                    ></v-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mdiMagnify, mdiYoutube, mdiSoundcloud } from '@mdi/js';
import { AppState, YouTubeState } from '@/store';
import { debounce } from 'debounce';

@Component({
    computed: {
        ytState: {
            get() {
                return AppState.isYoutubeSearchActive;
            },
            set(state: boolean) {
                AppState.changeYoutubeSearchState(state);
            },
        },
        scState: {
            get() {
                return AppState.isSoundcloudSearchActive;
            },
            set(state: boolean) {
                AppState.changeSoundcloudSearchState(state);
            },
        },
    },
})
export default class Search extends Vue {
    searchIcon = mdiMagnify;
    youtubeIcon = mdiYoutube;
    soundcloudIcon = mdiSoundcloud;
    searchInputValue = '';
    isLoadingResults = false;

    ytResults = [];

    inputChanged(value: string) {
        this.isLoadingResults = true;
        debounce(() => {
            this.isLoadingResults = false;
            //YouTubeState.search(value)
            console.log('value');
        }, 1000);
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 720px;
    padding: 32px, 64px;
    @include mq(sm) {
        padding: 32px 128px;
    }
}
</style>
