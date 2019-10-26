<template>
    <v-bottom-sheet v-model="dialogState">
        <v-sheet height="300px" class="py-7 playlists-container text-center">
            <PlaylistItem
                class="mx-5"
                v-for="p in playlists"
                :key="p.id"
                :playlist="p"
                isSelect="true"
                @selected="addToPlaylist(p.id)"
            />
            <PlaylistItem isAdd="true" class="grid-item mx-5" @new="createPlaylist()" />
        </v-sheet>
    </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, PersistentUserDataState, MusicState } from '@/store';
import { mapState } from 'vuex';
import PlaylistItem from './PlaylistItem.vue';

@Component({
    computed: {
        dialogState: {
            get() {
                return AppState.playlistSelectSheet.isOpen;
            },
            set(state: boolean) {
                state ? AppState.playlistSelectSheet.open() : AppState.playlistSelectSheet.close();
            },
        },
        ...mapState('persistentUserData', ['playlists']),
    },
    components: {
        PlaylistItem,
    },
})
export default class PlaylistSelectSheet extends Vue {
    addToPlaylist(playlistId: number) {
        PersistentUserDataState.addSongToPlaylist({ id: playlistId, song: MusicState.pendingPlaylistAdd! });
        MusicState.pendingPlaylistAdd = null;
    }

    createPlaylist() {
        AppState.createPlaylistModal.open();
    }
}
</script>

<style lang="scss" scoped>
.playlists-container {
    display: flex;
    overflow-x: scroll;
    box-sizing: border-box;
}

/* width */
::-webkit-scrollbar {
    height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: clr(brand, pink);
    opacity: 0.3;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: clr(brand, pink);
    opacity: 1;
}
</style>
