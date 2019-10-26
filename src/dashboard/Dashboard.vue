<template>
    <v-app>
        <AppBar />

        <QueueDrawerHandle />
        <QueueDrawer />
        <AppDrawer />
        <GuildDrawer />

        <v-content>
            <GlobalAlert :message="alertMessage" @close="alertMessage = ''" />
            <PlayUrlModal />
            <CreatePlaylistModal />
            <RenamePlaylistModal />
            <router-view></router-view>
        </v-content>

        <PlaylistSelectSheet />

        <MusicBar />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router/types/router';
import { AuthState, DiscordState, YouTubeState } from '@/store';

import AppBar from './components/AppBar.vue';
import AppDrawer from './components/AppDrawer.vue';
import CreatePlaylistModal from './components/CreatePlaylistModal.vue';
import RenamePlaylistModal from './components/RenamePlaylistModal.vue';
import GlobalAlert from './components/GlobalAlert.vue';
import GuildDrawer from './components/GuildDrawer.vue';
import QueueDrawer from './components/QueueDrawer.vue';
import QueueDrawerHandle from './components/QueueDrawerHandle.vue';
import MusicBar from './components/MusicBar.vue';
import PlayUrlModal from './components/PlayUrlModal.vue';
import PlaylistSelectSheet from './components/PlaylistSelectSheet.vue';

Component.registerHooks(['beforeRouteUpdate']);

@Component({
    async beforeRouteEnter(to, from, next) {
        const code = to.query['code'];
        if (code && !AuthState.hasPermission) {
            await AuthState.discordAuth(to.query['code'].toString());
        }

        if (AuthState.hasPermission) {
            if (!DiscordState.hasAccountData) {
                await DiscordState.fetchAccount();
            }
            next();
            return;
        } else {
            next({
                path: '/login',
                query: {
                    redirectFrom: to.name,
                    code: code ? code : null,
                },
            });
        }
    },
    components: {
        AppBar,
        AppDrawer,
        CreatePlaylistModal,
        RenamePlaylistModal,
        GlobalAlert,
        GuildDrawer,
        QueueDrawer,
        QueueDrawerHandle,
        MusicBar,
        PlayUrlModal,
        PlaylistSelectSheet,
    },
})
export default class Dashboard extends Vue {
    alertMessage = '';

    mounted() {
        this.connectToSocket();
        this.getBotGuilds();
        this.initYoutube();
    }

    connectToSocket() {
        this.$socket.client.io.opts.query = { discordKey: AuthState.token, userId: DiscordState.userId };
        this.$socket.client.open();
    }

    getBotGuilds() {
        DiscordState.fetchUserGuilds();
        this.$socket.client.emit('userGuilds', DiscordState.userGuilds.map(g => g.id));
    }

    async initYoutube() {
        await YouTubeState.setup();
    }

    beforeRouteUpdate(to: Route, from: Route, next: any) {
        if (from.query.redirectFrom === 'editPlaylist') {
            this.alertMessage = 'You dont have this playlist';
            setTimeout(() => {
                this.alertMessage = '';
            }, 5000);
        }
        next();
    }
}
</script>
