<template>
    <div>
        <v-container class="grid px-10">
            <PlaylistItem
                v-for="p in playlists"
                :key="p.id"
                :playlist="p"
                @play="startPlaylist(p)"
                @edit="editPlaylist(p)"
                class="grid-item py-5 px-2"
            />
            <PlaylistItem isAdd="true" class="grid-item py-5 px-2" @new="createPlaylist()" />
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PlaylistItem from '@/dashboard/components/PlaylistItem.vue';
import { Playlist } from '@/store/modules/persistent-user-data';
import { AppState, DiscordState } from '@/store';
import { mapState } from 'vuex';

@Component({
    components: {
        PlaylistItem,
    },
    computed: {
        ...mapState('persistentUserData', ['playlists']),
    },
})
export default class Playlists extends Vue {
    startPlaylist(playlist: Playlist) {
        // for each? Pepega
    }

    editPlaylist(playlist: Playlist) {
        this.$router.push({ path: `playlists/${playlist.id}_${playlist.name.split(' ').join('-')}` });
    }

    createPlaylist() {
        AppState.createPlaylistModal.open();
    }
}
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include mq(sm) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @include mq(md) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @include mq(lg) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .grid-item {
        justify-self: center;
    }
}
</style>
