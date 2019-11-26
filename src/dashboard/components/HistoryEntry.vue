<template>
    <div class="entry">
        <div class="grid">
            <div class="image">
                <img
                    :src="song.thumbnail_url"
                    alt="thumnail"
                    height="54"
                    width="54"
                />
                <v-btn
                    fab
                    small
                    color="transparent"
                    class="elevation-0 play-ico"
                    @click="play()"
                >
                    <v-icon>{{ playIcon }}</v-icon>
                </v-btn>
            </div>
            <div class="title">
                <h4>{{ song.title }}</h4>
                <h6>{{ dateTime }}</h6>
            </div>
            <div class="playlist">
                <v-btn
                    fab
                    small
                    color="transparent"
                    class="elevation-0"
                    @click="play()"
                >
                    <v-icon>{{ playlistIcon }}</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Song } from '@/store/modules/music';
import { mdiPlay, mdiPlaylistPlus } from '@mdi/js';

@Component
export default class HistoryEntry extends Vue {
    playIcon = mdiPlay;
    playlistIcon = mdiPlaylistPlus;

    @Prop() readonly song: Song | undefined;
    @Prop() readonly dateTime: Date | undefined;
}
</script>

<style lang="scss" scoped>
.entry {
    max-height: 70px;
    height: 70px;
    width: 100%;
    padding: 8px 0;
    border-radius: 4px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
}
.grid {
    display: grid;
    grid-template-columns: 54px auto 54px;
    height: 54px;
    margin-left: 10px;
    .image {
        position: relative;
        max-width: 54px;
        img {
            border-radius: 4px;
        }
        &:hover {
            .play-ico {
                display: initial;
            }
            img {
                filter: brightness(0.5);
            }
        }
        .play-ico {
            position: absolute;
            display: none;
            left: 8px;
            top: 8px;
        }
    }
    .title {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 18px;
        h6 {
            margin-top: -4px;
        }
    }
    .playlist {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
