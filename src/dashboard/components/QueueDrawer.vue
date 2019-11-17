<template>
    <div>
        <v-navigation-drawer v-model="isOpen" right app floating :width="width" stateless>
            <div class="list-container">
                <div class="header">
                    <h1 class="title">In Queue</h1>

                    <div class="flex-spacer"></div>

                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                fab
                                small
                                :color="isRandom ? 'cyan' : 'transparent'"
                                class="elevation-0 shuffle-btn"
                                @click="shuffleQueue()"
                            >
                                <v-icon>{{ shuffleIcon }}</v-icon>
                            </v-btn>
                        </template>
                        <span>Play in random order</span>
                    </v-tooltip>

                    <v-btn fab small color="transparent" class="elevation-0 back-btn" @click="closeDrawer()">
                        <v-icon>{{ arrowRight }}</v-icon>
                    </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list v-if="queue.length">
                    <v-list-item v-for="(song, index) in queue" :key="index" class="list-item">
                        <div class="song-container" @hover="hoverIndex = index">
                            <img class="song-img" :src="song.thumbnail_url" height="32" width="32" />
                            <span class="song-title">{{ song.title }}</span>
                            <span class="subtitle" style="margin-bottom: 1px;">requested by {{ song.requested_by }}</span>
                            <v-btn fab small color="transparent" class="elevation-0 remove-ico" @click="removeSong(index)">
                                <v-icon>{{ remove }}</v-icon>
                            </v-btn>
                            <div class="time-container">
                                <span>{{ formatTime(song.max_time_ms) }}</span>
                            </div>
                        </div>
                    </v-list-item>
                </v-list>

                <div v-else class="no-queue mt-4 pt-3">
                    <span class="body-2">There is nohing in queue</span>
                    <v-btn color="primary" class="mt-3" @click="searchSong()">Search a song</v-btn>
                    <div class="placeholder-container"><div v-for="i in 5" :key="i" class="song-placeholder"></div></div>
                </div>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { AppState, MusicState, DiscordState } from '@/store';
import { mdiArrowRight, mdiPlaylistRemove, mdiPlaylistMusic, mdiShuffle } from '@mdi/js';

@Component({
    computed: {
        isOpen: {
            get() {
                return AppState.queueDrawer.isOpen;
            },
            set(state) {
                state ? AppState.queueDrawer.open() : AppState.queueDrawer.close();
            },
        },
        width() {
            return this.$vuetify.breakpoint.mdAndUp ? 300 : 200;
        },
        ...mapState('music', ['queue', 'isRandom']),
    },
})
export default class QueueDrawer extends Vue {
    arrowRight = mdiArrowRight;
    remove = mdiPlaylistRemove;
    queueIcon = mdiPlaylistMusic;
    shuffleIcon = mdiShuffle;
    hoverIndex = -1;

    closeDrawer() {
        AppState.queueDrawer.close();
    }

    removeSong(index: number) {
        MusicState.removeFromQueueAt(index);
        this.$socket.client.emit('command', {
            name: 'remove',
            args: [index],
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
    }

    shuffleQueue() {
        this.$socket.client.emit('command', {
            name: 'shuffle',
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
        MusicState.switchRandom();
    }

    searchSong() {
        this.$router.push({ name: 'search' });
        AppState.queueDrawer.close();
    }

    formatTime(s: number): string {
        const t = new Date('0');
        t.setSeconds(s / 1000);
        return [
            t.getHours() > 0 ? t.getHours() : '',
            t.getHours() ? ':' : '',
            t.getHours() && t.getMinutes() < 10 ? '0' : '',
            t.getMinutes() > 0 ? t.getMinutes() : '',
            t.getMinutes() ? ':' : '',
            t.getMinutes() && t.getSeconds() < 10 ? '0' : '',
            t.getSeconds(),
        ].join('');
    }
}
</script>

<style lang="scss" scoped>
.list-container {
    .header {
        padding: 8px 16px;
        display: flex;
        .title {
            font-weight: normal;
            margin-top: 4px;
        }
        .back-btn {
            margin-top: -2px;
        }
        .flex-spacer {
            flex: 1 1 auto;
        }
    }
    .list-item {
        padding: 0;
        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
            .song-title::after,
            .subtitle::after {
                display: none;
            }
            .remove-ico {
                display: initial;
            }
            .time-container {
                display: none;
            }
        }
    }
}
.song-container {
    display: grid;
    height: 32px;
    column-gap: 8px;
    width: 100%;
    grid-template-columns: 32px 1fr 32px;
    position: relative;
    padding: 0 16px;
    white-space: nowrap;

    .song-img {
        grid-row: span 2;
        border-radius: 4px;
    }

    .song-title {
        font-size: 17px;
        line-height: 18px;
        font-weight: 300;
        overflow: hidden;
        position: relative;
        grid-column: 2;

        &::after {
            content: '';
            position: absolute;
            right: 0;
            width: 16px;
            height: 100%;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(66, 66, 66, 1) 100%);
        }
    }

    .subtitle {
        font-size: 11px;
        line-height: 11px;
        font-weight: 300;
        opacity: 0.7;
        grid-column: 2;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            right: 0;
            width: 16px;
            height: 100%;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(66, 66, 66, 1) 100%);
        }
    }

    .remove-ico {
        grid-column: 3;
        grid-row: 1 / span 2;
        position: absolute;
        top: -4px;
        left: -4px;
        display: none;
    }
    .time-container {
        font-size: 11px;
        line-height: 11px;
        font-weight: 300;
        opacity: 0.7;
        grid-column: 3;
        grid-row: span 2;
        position: absolute;
        bottom: 0;
        right: 16px;
    }
}

.no-queue {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .placeholder-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: -1;
    }
    .song-placeholder {
        $color: rgba(255, 255, 255, 0.13);
        height: 11px;
        width: calc(100% - 72px);
        border-radius: 4px;
        background-color: $color;
        position: relative;
        left: 56px;
        top: 8px;
        margin-bottom: 32px;
        &::after {
            content: '';
            height: 7px;
            width: 150px;
            border-radius: 4px;
            background-color: $color;
            position: absolute;
            top: 18px;
        }
        &::before {
            content: '';
            height: 32px;
            width: 32px;
            border-radius: 4px;
            background-color: $color;
            position: absolute;
            left: -38px;
            top: -3px;
        }
    }
}
</style>
