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
                    @input="debounceInput($event)"
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
            <div class="results">
                <v-row v-if="ytResults.length === 0 && searchInputValue" justify="center" class="pt-5">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
                <div v-else class="mt-5">
                    <SearchResultItem :youtubeResult="ytResults[0]" />
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
import { Song } from '@/store/modules/music';
import { debounce } from 'debounce';
import SearchResultItem from '@/dashboard/components/SearchResultItem.vue';

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
    components: {
        SearchResultItem,
    },
})
export default class Search extends Vue {
    searchIcon = mdiMagnify;
    youtubeIcon = mdiYoutube;
    soundcloudIcon = mdiSoundcloud;

    searchInputValue = '';
    ytResults: Song[] = [];

    debounceInput = debounce((event: string) => {
        if (event) {
            this.ytResults.push({
                title: 'Will Sparks - Egypt',
                url:
                    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                thumbnail_url:
                    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                requested_by: '',
                max_time_ms: 320000,
                current_time_ms: 0,
            });
        }
    }, 500);

    submitInput(value: string) {
        YouTubeState.search(value);
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
