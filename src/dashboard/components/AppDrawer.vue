<template>
    <div>
        <v-navigation-drawer
            app
            v-model="isOpen"
            :expand-on-hover="$vuetify.breakpoint.lgAndUp"
            mini-variant-width="64"
        >
            <v-list nav dense>
                <v-list-item class="logo-item">
                    <v-list-item-avatar @click="navigateTo('dashboard')">
                        <v-img
                            class="logo"
                            src="@/assets/vocality/logo.svg"
                        ></v-img>
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-item link @click="navigateTo('search')">
                    <v-list-item-icon>
                        <v-icon>{{ searchIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Search</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="navigateTo('history')">
                    <v-list-item-icon>
                        <v-icon>{{ historyIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>History</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="openUrlModal()">
                    <v-list-item-icon>
                        <v-icon>{{ urlIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Play URL</v-list-item-title>
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
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <path
                                :class="fillColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M23.6164 27.0139C23.6164 27.0139 22.6301 25.8358 21.8082 24.7948C25.3973 23.7811 26.7671 21.5345 26.7671 21.5345C25.6438 22.2742 24.5753 22.7948 23.6164 23.1509C22.2466 23.7263 20.9315 24.1098 19.6438 24.329C17.0137 24.8221 14.6027 24.6852 12.5479 24.3016C10.9863 24.0002 9.64384 23.5619 8.52055 23.1235C7.89041 22.8769 7.20548 22.5756 6.52055 22.192C6.47946 22.1646 6.43836 22.1441 6.39726 22.1235C6.35616 22.103 6.31507 22.0824 6.27397 22.055C6.21918 22.0276 6.19179 22.0002 6.16439 21.9728L6.16438 21.9728C5.67123 21.6989 5.39726 21.5071 5.39726 21.5071C5.39726 21.5071 6.71233 23.6989 10.1918 24.74C9.36987 25.7811 8.35616 27.0139 8.35616 27.0139C2.30137 26.8221 0 22.8495 0 22.8495C0 14.0276 3.9452 6.87694 3.9452 6.87694C7.89041 3.91804 11.6438 4.00023 11.6438 4.00023L11.9178 4.329C6.9863 5.75365 4.71233 7.91804 4.71233 7.91804C4.71233 7.91804 5.31507 7.58927 6.32877 7.12352C9.26027 5.83584 11.589 5.47968 12.5479 5.39749C12.5688 5.39401 12.5893 5.39053 12.6094 5.3871C12.7476 5.36357 12.8702 5.34269 13.0137 5.34269C14.6849 5.12352 16.5753 5.06872 18.5479 5.2879C21.1507 5.58927 23.9452 6.35639 26.7945 7.91804C26.7945 7.91804 24.6301 5.86324 19.9726 4.43858L20.3562 4.00023C20.3562 4.00023 24.1096 3.91804 28.0548 6.87694C28.0548 6.87694 32 14.0276 32 22.8495C32 22.8495 29.6712 26.8221 23.6164 27.0139ZM8.24657 16.7399C8.24657 15.0687 9.47945 13.6988 11.0411 13.6988C12.6027 13.6988 13.863 15.0687 13.8356 16.7399C13.8356 18.4112 12.6027 19.781 11.0411 19.781C9.50684 19.781 8.24657 18.4112 8.24657 16.7399ZM18.2466 16.7399C18.2466 15.0687 19.4794 13.6988 21.0411 13.6988C22.6027 13.6988 23.8356 15.0687 23.8356 16.7399C23.8356 18.4112 22.6027 19.781 21.0411 19.781C19.5068 19.781 18.2466 18.4112 18.2466 16.7399Z"
                            />
                        </svg>
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
import {
    mdiMagnify,
    mdiCodeTags,
    mdiHistory,
    mdiPlaylistMusic,
    mdiPlaylistPlay,
} from '@mdi/js';

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
        fillColor() {
            return this.$vuetify.theme.dark
                ? 'discord-icon-dark'
                : 'discord-icon-light';
        },
    },
})
export default class AppDrawer extends Vue {
    searchIcon = mdiMagnify;
    urlIcon = mdiCodeTags;
    historyIcon = mdiHistory;
    playlistIcon = mdiPlaylistPlay;
    queueIcon = mdiPlaylistMusic;

    openGuildsBar() {
        AppState.appDrawer.close();
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

    openUrlModal() {
        AppState.playUrlModal.open();
    }
}
</script>

<style lang="scss" scoped>
.logo-item {
    display: flex;
    justify-content: center;
}
.logo {
    transition: transform 100ms ease;
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
    }
}
.discord-icon-dark {
    fill: #fff;
}
.discord-icon-light {
    fill: rgba(0, 0, 0, 0.54);
}
</style>
