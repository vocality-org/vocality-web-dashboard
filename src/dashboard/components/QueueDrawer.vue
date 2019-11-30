<template>
    <div>
        <v-navigation-drawer
            v-model="isOpen"
            right
            app
            floating
            :width="width"
            stateless
        >
            <div class="list-container">
                <div class="header">
                    <h1 class="title">{{ $t('title') }}</h1>

                    <div class="flex-spacer"></div>

                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                fab
                                small
                                color="transparent"
                                class="elevation-0 shuffle-btn"
                                @click="autoplay()"
                            >
                                <v-icon
                                    :color="isAutoplaying ? 'primary' : 'grey'"
                                >
                                    {{ autoplayIcon }}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Autoplay</span>
                    </v-tooltip>

                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                fab
                                small
                                color="transparent"
                                class="elevation-0 shuffle-btn"
                                @click="shuffleQueue()"
                            >
                                <v-icon :color="isRandom ? 'primary' : 'grey'">
                                    {{ shuffleIcon }}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Shuffle</span>
                    </v-tooltip>

                    <v-btn
                        fab
                        small
                        color="transparent"
                        class="elevation-0 back-btn"
                        @click="closeDrawer()"
                    >
                        <v-icon>{{ arrowRight }}</v-icon>
                    </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list v-if="queue.length">
                    <draggable
                        v-model="queue"
                        v-bind="dragOptions"
                        tag="div"
                        @start="dragging = true"
                        @end="dragging = false"
                        @change="onDragMove($event)"
                    >
                        <transition-group
                            type="transition"
                            :name="
                                dragging
                                    ? 'drag-transition'
                                    : 'queue-list-transition'
                            "
                        >
                            <v-list-item
                                v-for="(song, index) in queue"
                                :key="song._id"
                                class="list-item"
                            >
                                <v-hover v-slot:default="{ hover }">
                                    <div
                                        class="song-container-wrapper"
                                        :class="
                                            hover && !dragging
                                                ? 'list-item-hover'
                                                : ''
                                        "
                                    >
                                        <div class="song-container">
                                            <img
                                                class="song-img"
                                                :src="song.thumbnail_url"
                                                height="32"
                                                width="32"
                                            />
                                            <v-btn
                                                fab
                                                small
                                                color="transparent"
                                                class="elevation-0 play-ico"
                                                @click="skipTo(index)"
                                            >
                                                <v-icon>{{ playIcon }}</v-icon>
                                            </v-btn>

                                            <span class="song-title">{{
                                                song.title
                                            }}</span>
                                            <span
                                                class="subtitle"
                                                style="margin-bottom: 1px;"
                                                >requested by
                                                {{ song.requested_by }}
                                            </span>
                                            <v-btn
                                                fab
                                                small
                                                color="transparent"
                                                class="elevation-0 remove-ico"
                                                @click="removeSong(index)"
                                            >
                                                <v-icon>{{ remove }}</v-icon>
                                            </v-btn>
                                            <div class="time-container">
                                                <span>{{
                                                    formatTime(song.max_time_ms)
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </v-hover>
                            </v-list-item>
                        </transition-group>
                    </draggable>
                </v-list>

                <div v-else class="no-queue mt-4 pt-3">
                    <span class="body-2">{{ $t('empty') }}</span>
                    <v-btn color="primary" class="mt-3" @click="searchSong()">
                        {{ $t('search') }}
                    </v-btn>
                    <div class="placeholder-container">
                        <div
                            v-for="i in 5"
                            :key="i"
                            class="song-placeholder"
                        ></div>
                    </div>
                </div>
            </div>
            <template v-slot:append v-if="isAutoplaying">
                <div class="autoplaying-footer py-4">
                    <svg
                        x="0px"
                        y="0px"
                        width="24px"
                        height="30px"
                        viewBox="0 0 24 30"
                        xml:space="preserve"
                        class="mr-4"
                    >
                        <rect
                            x="0"
                            y="10"
                            width="4"
                            height="10"
                            fill="#333"
                            opacity="0.2"
                        >
                            <animate
                                attributeName="opacity"
                                attributeType="XML"
                                values="0.2; 1; .2"
                                begin="0s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="height"
                                attributeType="XML"
                                values="10; 20; 10"
                                begin="0s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="y"
                                attributeType="XML"
                                values="10; 5; 10"
                                begin="0s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect
                            x="8"
                            y="10"
                            width="4"
                            height="10"
                            fill="#333"
                            opacity="0.2"
                        >
                            <animate
                                attributeName="opacity"
                                attributeType="XML"
                                values="0.2; 1; .2"
                                begin="0.15s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="height"
                                attributeType="XML"
                                values="10; 20; 10"
                                begin="0.15s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="y"
                                attributeType="XML"
                                values="10; 5; 10"
                                begin="0.15s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect
                            x="16"
                            y="10"
                            width="4"
                            height="10"
                            fill="#333"
                            opacity="0.2"
                        >
                            <animate
                                attributeName="opacity"
                                attributeType="XML"
                                values="0.2; 1; .2"
                                begin="0.3s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="height"
                                attributeType="XML"
                                values="10; 20; 10"
                                begin="0.3s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="y"
                                attributeType="XML"
                                values="10; 5; 10"
                                begin="0.3s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </svg>

                    <span>{{ $t('autoplay') }}</span>
                </div>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import { AppState, MusicState, DiscordState } from '@/store';
import {
    mdiArrowRight,
    mdiPlaylistRemove,
    mdiPlaylistMusic,
    mdiShuffle,
    mdiAnimationPlay,
    mdiPlay,
} from '@mdi/js';
import draggable from 'vuedraggable';

@Component({
    computed: {
        queue: {
            get() {
                return MusicState.queue;
            },
            set(newQueue) {
                MusicState.setQueue(newQueue);
            },
        },
        isOpen: {
            get() {
                return AppState.queueDrawer.isOpen;
            },
            set(state) {
                state
                    ? AppState.queueDrawer.open()
                    : AppState.queueDrawer.close();
            },
        },
        width() {
            return this.$vuetify.breakpoint.mdAndUp ? 300 : 240;
        },
        ...mapState('music', ['isRandom', 'isAutoplaying']),
    },
    components: {
        draggable,
    },
})
export default class QueueDrawer extends Vue {
    arrowRight = mdiArrowRight;
    remove = mdiPlaylistRemove;
    queueIcon = mdiPlaylistMusic;
    shuffleIcon = mdiShuffle;
    autoplayIcon = mdiAnimationPlay;
    playIcon = mdiPlay;
    dragging = false;

    dragOptions = {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
    };

    onDragMove(event: any) {
        if (event.moved) {
            this.$socket.client.emit('command', {
                name: 'move',
                args: [
                    `${event.moved.oldIndex + 1}`,
                    `${event.moved.newIndex + 1}`,
                ],
                messageData: {
                    guildId: DiscordState.currentGuildId,
                },
            });
        }
    }

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

    skipTo(index: number) {
        MusicState.setQueue(MusicState.queue.filter((s, i) => i >= index));
        this.$socket.client.emit('command', {
            name: 'skip',
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

    autoplay() {
        this.$socket.client.emit('command', {
            name: 'autoplay',
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
        MusicState.switchAutoplaying();
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
        .flex-spacer {
            flex: 1 1 auto;
        }
    }
    .list-item {
        cursor: grab;
        padding: 0;
    }
    .list-item-hover {
        background-color: var(--v-secondary-base);
        .song-title::after,
        .subtitle::after {
            display: none;
        }
        .song-img {
            filter: brightness(0.7);
        }
        .play-ico {
            display: initial;
        }
        .remove-ico {
            display: initial;
        }
        .time-container {
            display: none;
        }
    }
}
.song-container-wrapper {
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
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

    .play-ico {
        position: absolute;
        top: -4px;
        left: 12px;
        display: none;
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
            background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(66, 66, 66, 1) 100%
            );
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
            background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(66, 66, 66, 1) 100%
            );
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
        $color: var(--v-secondary-base);
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
.autoplaying-footer {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}
svg path,
svg rect {
    fill: var(--v-primary-base);
}

.queue-list-transition-enter-active,
.queue-list-transition-leave-active {
    transition: all 200ms;
}
.queue-list-transition-enter,
.queue-list-transition-leave-to {
    opacity: 0;
    transform: translateX(300px);
}
.drag-transition-move {
    transition: transform 0.5s;
}
</style>

<i18n>
{
  "en": {
    "title": "Queue",
    "empty": "There is nothing in Queue",
    "search": "Search a Song",
    "autoplay": "Autoplaying similar songs"
  },
  "de": {
    "title": "Warteschlange",
    "empty": "Warteschlange ist leer",
    "search": "Nach Song suchen",
    "autoplay": "Spielt ähnliche songs"
  }
}
</i18n>
