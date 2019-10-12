<template>
    <div>
        <v-container class="grid px-10">
            <PlaylistItem
                v-for="playlist in 10"
                :key="playlist"
                :playlist="p"
                @play="startPlaylist(p)"
                @edit="editPlaylist(p)"
                class="grid-item py-5 px-2"
            />
            <PlaylistItem isAdd="true" class="grid-item py-5 px-2" />
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PlaylistItem from '@/dashboard/components/PlaylistItem.vue';
import { Playlist } from '@/store/modules/persistent-user-data';
import { DiscordState } from '@/store';
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
    p = {
        id: 2,
        name: 'Certified Hood Classics',
        songs: [
            {
                url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Song1',
                thumbnail_url:
                    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                requested_by: 'You',
                current_time_ms: 0,
                max_time_ms: 0,
            },
            {
                url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Song1',
                thumbnail_url:
                    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                requested_by: 'You',
                current_time_ms: 0,
                max_time_ms: 0,
            },
            {
                url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Song2',
                thumbnail_url:
                    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                requested_by: 'You',
                current_time_ms: 0,
                max_time_ms: 0,
            },
            {
                url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Song3',
                thumbnail_url:
                    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                requested_by: 'You',
                current_time_ms: 0,
                max_time_ms: 0,
            },
            {
                url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Song4',
                thumbnail_url:
                    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                requested_by: 'You',
                current_time_ms: 0,
                max_time_ms: 0,
            },
        ],
    };

    startPlaylist(playlist: Playlist) {
        // for each? Pepega
    }

    editPlaylist(playlist: Playlists) {
        // navigate to /:id or /:name
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
