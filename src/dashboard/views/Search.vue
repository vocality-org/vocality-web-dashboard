<template>
    <div>
        <div class="container">
            <div class="search">
                <v-text-field
                    v-model="searchInputValue"
                    solo
                    hide-details
                    :prepend-inner-icon="searchIcon"
                    :label="$t('label')"
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
                        disabled
                        class="mx-4"
                        :on-icon="soundcloudIcon"
                        label="SoundCloud"
                        color="#f95738"
                        v-model="scState"
                    ></v-checkbox>
                </div>
            </div>
            <div class="results">
                <v-row
                    v-if="resultsAsSong.length === 0 && searchInputValue"
                    justify="center"
                    class="pt-5"
                >
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </v-row>
                <div
                    v-if="resultsAsSong.length > 0"
                    class="scroll-container mt-5"
                >
                    <div v-if="ytState">
                        <div
                            v-for="yt in resultsAsSong"
                            :key="yt.id"
                            class="my-3"
                        >
                            <SearchResultItem
                                :youtubeResult="yt"
                                @play="onPlaySong(yt)"
                            />
                        </div>
                    </div>
                    <v-row justify="center">
                        <v-btn @click="loadMore()" text small>{{
                            $t('more')
                        }}</v-btn>
                    </v-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { debounce } from 'debounce';
import { mapGetters } from 'vuex';
import { AppState, YouTubeState, DiscordState } from '@/store';
import { Song } from '@/store/modules/music';
import { mdiMagnify, mdiYoutube, mdiSoundcloud } from '@mdi/js';

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
        ...mapGetters('youtube', ['resultsAsSong']),
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

    debounceInput = debounce((event: string) => {
        if (event) {
            this.submitInput(event);
        }
    }, 600);

    loadMore() {
        if (AppState.isYoutubeSearchActive) {
            YouTubeState.loadNextPage();
        }
    }

    submitInput(value: string) {
        if (AppState.isYoutubeSearchActive) {
            YouTubeState.search(value);
        }
    }

    onPlaySong(song: Song) {
        this.$socket.client.emit('command', {
            name: 'play',
            args: [song.url],
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 720px;
    padding: 32px 64px;
    margin: 0 auto;
}

.api-select {
    max-width: 696px;
    margin: auto;
}

.scroll-container {
    height: calc(100vh - 300px);
    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: 0;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>

<i18n>
{
  "en": {
    "label": "Search for a song",
    "more": "Show more"
  },
  "de": {
    "label": "Nach einem Song suchen",
    "more": "Mehr Anzeigen"
  }
}
</i18n>
