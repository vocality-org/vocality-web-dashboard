<template>
    <div>
        <v-container>
            <h1 class="mb-5">
                <v-btn
                    text
                    icon
                    x-large
                    class="mr-2 mb-1"
                    @click="navigateBack()"
                >
                    <v-icon>{{ backIcon }}</v-icon>
                </v-btn>
                {{ name }}
            </h1>
            <v-list-item class="controls-row">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-checkbox
                            v-on="on"
                            :value="totalSelected === songs.length"
                            @change="toggleAllSelect($event)"
                            class="mt-5 ml-2"
                            color="primary"
                        ></v-checkbox>
                    </template>
                    <span>Select all</span>
                </v-tooltip>

                <v-tooltip top v-if="totalSelected !== 0">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-on="on"
                            text
                            icon
                            class="mx-3"
                            @click="removeSelected()"
                        >
                            <v-icon>{{ deleteIcon }}</v-icon>
                        </v-btn>
                    </template>
                    <span>Remove selected</span>
                </v-tooltip>

                <v-tooltip top v-if="totalSelected !== 0">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text icon @click="playSelected()">
                            <v-icon>{{ playIcon }}</v-icon>
                        </v-btn>
                    </template>
                    <span>Add selected to Queue</span>
                </v-tooltip>

                <v-menu offset-x right>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text>More</v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="renamePlaylist()">
                            <v-list-item-title
                                >Rename Playlist</v-list-item-title
                            >
                        </v-list-item>
                        <v-list-item @click="deletePlaylist()">
                            <v-list-item-title
                                >Delete Playlist</v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>

                <div class="flex-spacer"></div>
                <div
                    class="counter mr-4"
                    :class="{ 'counter-on-zero': totalSelected === 0 }"
                >
                    {{ totalSelected }} / {{ songs.length }}
                </div>
            </v-list-item>
            <v-list subheader class="playlist-list">
                <v-list-item v-for="(s, index) in songs" :key="index">
                    <v-list-item-avatar>
                        <v-checkbox
                            v-if="s.isSelected"
                            v-model="songs[index].isSelected"
                            class="mt-5 ml-5 mr-3"
                            color="primary"
                        ></v-checkbox>
                        <v-img
                            v-else
                            :src="s.song.thumbnail_url"
                            @click="s.isSelected = true"
                            class="song-thumbnail"
                        >
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{
                            s.song.title
                        }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-menu offset-y left>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text icon class="mx-1">
                                    <v-icon>{{ menuIcon }}</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="removeFromPlaylist(s)">
                                    <v-list-item-title>
                                        Remove from Playlist
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="playSingle(s)">
                                    <v-list-item-title>
                                        Add to Queue
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list-item-icon>
                </v-list-item>
                <div v-if="songs.length === 0">
                    <v-row justify="center" class="my-2" style="width: 100%">
                        This playlist is empty, add songs with
                    </v-row>
                    <v-row justify="center" class="my-2" style="width: 100%">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text icon>
                                    <v-icon>{{ playlistAddIcon }}</v-icon>
                                </v-btn>
                            </template>
                            <span>Add this Song to a Playlist</span>
                        </v-tooltip>
                    </v-row>
                </div>
            </v-list>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router/types/router';
import { PersistentUserDataState, AppState, DiscordState } from '@/store';
import {
    mdiDelete,
    mdiDotsVertical,
    mdiPlaylistPlus,
    mdiArrowLeft,
    mdiPlay,
} from '@mdi/js';
import { Song } from '@/store/modules/music';

Component.registerHooks(['beforeRouteEnter']);

@Component({})
export default class EditPlaylist extends Vue {
    id: number = 0;
    name: string = '';
    songs: SelectableSong[] = [];

    deleteIcon = mdiDelete;
    menuIcon = mdiDotsVertical;
    playlistAddIcon = mdiPlaylistPlus;
    backIcon = mdiArrowLeft;
    playIcon = mdiPlay;

    get totalSelected() {
        return this.songs.reduce((acc, cur) => {
            return cur.isSelected ? (acc += 1) : acc;
        }, 0);
    }

    toggleAllSelect(event: any) {
        if (event) {
            this.songs.forEach(s => (s.isSelected = true));
        } else {
            this.songs.forEach(s => (s.isSelected = false));
        }
    }

    deletePlaylist() {
        PersistentUserDataState.deletePlaylist(this.id);
        this.$router.back();
    }

    renamePlaylist() {
        AppState.renamePlaylistModal.open();
    }

    playSelected() {
        const songs = this.songs.filter(s => s.isSelected).map(s => s.song);
        this.$socket.client.emit('playDashboardPlaylist', {
            songs: songs,
            guildId: DiscordState.currentGuildId,
        });
    }

    removeSelected() {
        this.songs
            .filter(s => s.isSelected)
            .forEach(s => this.removeFromPlaylist(s));
    }

    removeFromPlaylist(s: SelectableSong) {
        this.songs.splice(this.songs.indexOf(s), 1);
        PersistentUserDataState.removeSongFromPlaylist(this.id, s.song);
    }

    playSingle(s: SelectableSong) {
        this.$socket.client.emit('command', {
            name: 'play',
            args: [s.song.url],
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
    }

    navigateBack() {
        this.$router.back();
    }

    beforeRouteEnter(to: Route, from: Route, next: any) {
        const id = to.params.id_name.split('_')[0];
        const playlist = PersistentUserDataState.getPlaylistById(
            parseInt(id, 10)
        );

        if (playlist) {
            const name = playlist.name;
            next((vm: any) => {
                vm.$data.id = id;
                vm.$data.name = name;
                vm.$data.songs = playlist.songs.map(s => {
                    return {
                        song: s,
                        isSelected: false,
                    };
                });
            });
        } else {
            next({
                path: from.path,
                query: {
                    redirectFrom: to.name,
                },
            });
        }
    }
}

interface SelectableSong {
    song: Song;
    isSelected: boolean;
}
</script>

<style lang="scss" scoped>
.playlist-list {
    max-height: 67vh;
    overflow-y: scroll;
}
.controls-row {
    display: flex;
}
.flex-spacer {
    flex: 1 0 auto;
}
.counter {
    transition: transform 150ms ease;
    transform-origin: top right;
    &-on-zero {
        opacity: 0.6;
        transform: scale(0.8);
    }
}
.song-thumbnail {
    cursor: pointer;
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
