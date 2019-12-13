<template>
    <div>
        <div class="containerr">
            <h1 class="my-5">{{ $t('h1') }}</h1>

            <div v-if="currentSongLyrics" class="lyrics">
                <SongLyrics :content="currentSongLyrics" />
            </div>

            <div v-else>
                <span>
                    {{ $t('hint') }}
                </span>
                <div class="cta">
                    <v-btn color="primary" class="mt-5" @click="searchSong()">
                        {{ $t('search') }}
                    </v-btn>
                    <v-btn color="primary" class="ml-2 mt-5" @click="playUrl()">
                        {{ $t('playUrl') }}
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { MusicState, AppState } from '@/store';
import SongLyrics from '../components/SongLyircs.vue';

@Component({
    computed: {
        currentSongLyrics() {
            if (MusicState.currentSong) {
                return MusicState.fetchSongLyrics(
                    MusicState.currentSong!.title
                );
            }
            return '';
        },
    },
    components: {
        SongLyrics,
    },
})
export default class Lyrics extends Vue {
    searchSong() {
        this.$router.push({ name: 'search' });
    }

    playUrl() {
        AppState.playUrlModal.open();
    }
}
</script>

<style lang="scss" scoped>
.containerr {
    max-width: 720px;
    padding: 32px 64px;
    margin: 0 auto;
    height: calc(100vh - 300px);
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

<i18n>
{
  "en": {
    "h1": "Lyrics",
    "hint": "Play a song to see lyrics!",
    "search": "search",
    "playUrl": "play url"
  },
  "de": {
    "h1": "Songtext",
    "hint": "Song starten um den text anzuzeigen!",
    "search": "suchen",
    "playUrl": "url abspielen"
  }
}
</i18n>
