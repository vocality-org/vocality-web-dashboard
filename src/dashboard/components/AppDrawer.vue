<template>
    <div>
        <v-navigation-drawer app v-model="isOpen" :expand-on-hover="$vuetify.breakpoint.lgAndUp" mini-variant-width="64">
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="@/assets/vocality/logo.svg"></v-img>
                </v-list-item-avatar>
            </v-list-item>
            <v-list nav dense>
                <v-list-item link @click="navigateTo('search')">
                    <v-list-item-icon>
                        <v-icon>{{ searchIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Search</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="navigateTo('favorites')">
                    <v-list-item-icon>
                        <v-icon>{{ favoriteIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Favorites</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="toggleQueueDrawer()">
                    <v-list-item-icon>
                        <v-icon>{{ queueIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Music Queue</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="navigateTo('playlists')">
                    <v-list-item-icon>
                        <v-icon>{{ playlistIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Playlists</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="openGuildsBar()">
                    <v-list-item-icon>
                        <v-img src="@/assets/icons/discord.svg" width="28"></v-img>
                    </v-list-item-icon>
                    <v-list-item-title>Change Server</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState } from '@/store';
import { mdiMagnify, mdiStar, mdiPlaylistMusic, mdiPlaylistPlay } from '@mdi/js';

@Component({
    computed: {
        isOpen: {
            get() {
                if (this.$vuetify.breakpoint.lgAndUp) {
                    return true;
                }
                return AppState.appDrawer.isOpen;
            },
            set(state) {
                state ? AppState.appDrawer.open() : AppState.appDrawer.close();
            },
        },
    },
})
export default class AppDrawer extends Vue {
    searchIcon = mdiMagnify;
    favoriteIcon = mdiStar;
    playlistIcon = mdiPlaylistPlay;
    queueIcon = mdiPlaylistMusic;

    openGuildsBar() {
        AppState.guildDrawer.open();
    }

    toggleQueueDrawer() {
        if (AppState.queueDrawer.isOpen) {
            AppState.queueDrawer.close();
        } else {
            AppState.queueDrawer.open();
        }
    }

    navigateTo(path: string) {
        this.$router.push({ name: path });
    }
}
</script>
