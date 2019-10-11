<template>
    <div>
        <v-container class="px-10">
            <PlaylistItem :playlist="p" @play="startPlaylist()" />
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PlaylistItem from '@/dashboard/components/PlaylistItem.vue';
import { Playlist } from '@/store/modules/persistent-user-data';
import { DiscordState } from '@/store';

@Component({
    components: {
        PlaylistItem,
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
}
</script>

<style lang="scss" scoped></style>
