<template>
    <div>
        <div class="containerr">
            <div class="line">
                <h1 class="my-5">{{ $t('h1') }}</h1>
                <div v-if="history.length >= 1">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                fab
                                small
                                color="transparent"
                                class="elevation-0 play-ico"
                                @click="deleteAll()"
                            >
                                <v-icon>{{ deleteAllIcon }}</v-icon>
                            </v-btn>
                        </template>
                        <span>{{ $t('deleteA') }}</span>
                    </v-tooltip>
                </div>
            </div>
            <div v-if="history.length === 0">
                {{ $t('hint') }}
            </div>
            <virtual-list :size="70" :remain="10">
                <HistoryEntryItem
                    v-for="entry in history"
                    :key="entry.dateTime.toString()"
                    :dateTime="entry.dateTime"
                    :song="entry.song"
                    @play="playEntry(entry)"
                    @addPlaylist="openPlaylistSheet(entry)"
                    @delete="deleteEntry(entry)"
                />
            </virtual-list>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters, mapState } from 'vuex';
import virtualList from 'vue-virtual-scroll-list';
import HistoryEntryItem from '../components/HistoryEntryItem.vue';
import {
    PersistentUserDataState,
    DiscordState,
    MusicState,
    AppState,
} from '@/store';
import { HistoryEntry } from '@/store/modules/persistent-user-data';
import { mdiDeleteSweep } from '@mdi/js';

@Component({
    components: {
        'virtual-list': virtualList,
        HistoryEntryItem,
    },
    computed: {
        ...mapState('persistentUserData', ['history']),
        ...mapGetters('persistentUserData', ['historyLength']),
    },
})
export default class History extends Vue {
    deleteAllIcon = mdiDeleteSweep;

    getEntryProps(index: number) {
        const entry = PersistentUserDataState.getHistoryEntryByIndex(index);
        return {
            props: {
                song: entry.song,
                dateTime: entry.dateTime,
            },
        };
    }

    playEntry(entry: HistoryEntry) {
        this.$socket.client.emit('command', {
            name: 'play',
            args: [entry.song.url],
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
    }

    deleteEntry(entry: HistoryEntry) {
        PersistentUserDataState.removeEntryFromHistory(entry);
    }

    deleteAll() {
        PersistentUserDataState.removeAllEntriesfromHistory();
    }

    openPlaylistSheet(entry: HistoryEntry) {
        MusicState.setPendingPlaylistAdd(entry.song);
        AppState.playlistSelectSheet.open();
    }
}
</script>

<style lang="scss" scoped>
.containerr {
    max-width: 720px;
    padding: 32px 64px;
    margin: 0 auto;
    height: calc(100vh - 300px);
    .line {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
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
    "h1": "History",
    "deleteA": "delete all",
    "hint": "Recently played songs will appear here."
  },
  "de": {
    "h1": "Verlauf",
    "deleteA": "leeren",
    "hint": "Gespielte songs werden hier gelistet."
  }
}
</i18n>
