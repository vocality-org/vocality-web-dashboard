<template>
    <div>
        <v-navigation-drawer v-model="isOpen" right app floating width="300" stateless>
            <div class="list-container">
                <div class="header">
                    <h1 class="title">In Queue</h1>

                    <v-btn fab small color="transparent" class="elevation-0 back-btn" @click="closeDrawer()">
                        <v-icon>{{ arrowRight }}</v-icon>
                    </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item style="padding: 0;" class="list-item">
                        <div class="current-song song-container">
                            <img
                                class="song-img"
                                src="https://i1.sndcdn.com/artworks-000576266747-svvc65-t500x500.jpg"
                                height="32"
                            />
                            <span class="song-title">Will Sparks - Egypt</span>
                            <span class="subtitle" style="margin-bottom: 1px;">requested by boolean</span>
                            <v-btn fab small color="transparent" class="elevation-0 remove-ico">
                                <v-icon>{{ remove }}</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState } from '@/store';
import { mdiArrowRight, mdiPlaylistRemove } from '@mdi/js';

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
    },
})
export default class QueueDrawer extends Vue {
    arrowRight = mdiArrowRight;
    remove = mdiPlaylistRemove;

    closeDrawer() {
        AppState.queueDrawer.close();
    }
}
</script>

<style lang="scss" scoped>
.list-container {
    .header {
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        .title {
            font-weight: normal;
        }
        .back-btn {
            margin-top: -8px;
        }
    }
    .list-item {
        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
            .song-title::after,
            .subtitle::after {
                display: none;
            }
            .remove-ico {
                display: initial;
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
}
</style>
