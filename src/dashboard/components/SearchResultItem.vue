<template>
    <div>
        <div v-if="youtubeResult">
            <v-hover v-slot:default="{ hover }">
                <v-card class="card">
                    <div
                        class="card__image"
                        :style="{
                            backgroundImage: `url(${youtubeResult.thumbnail_url})`,
                        }"
                    >
                        <v-icon
                            @click="emitPlay()"
                            class="play-icon"
                            large
                            color="white"
                            >{{ playIcon }}</v-icon
                        >
                    </div>
                    <h3 class="card__title ml-4">
                        <span
                            class="title-text"
                            v-html="youtubeResult.title"
                        ></span>
                    </h3>
                    <div
                        v-if="hover"
                        class="card__image"
                        style="background: transparent"
                    >
                        <v-icon
                            @click="openPlaylistSelect()"
                            class="play-icon"
                            large
                            >{{ addToPlaylistIcon }}</v-icon
                        >
                    </div>
                    <span v-else class="card__duration mr-4">{{
                        msTimeToDisplayString(youtubeResult.max_time_ms)
                    }}</span>
                </v-card>
            </v-hover>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Song } from '@/store/modules/music';
import { DiscordState, AppState, MusicState } from '@/store';
import { mdiPlay, mdiPlaylistPlus } from '@mdi/js';

@Component
export default class SearchResultItem extends Vue {
    playIcon = mdiPlay;
    addToPlaylistIcon = mdiPlaylistPlus;

    @Prop() readonly youtubeResult: Song | undefined;

    @Emit('play')
    emitPlay() {}

    openPlaylistSelect() {
        MusicState.setPendingPlaylistAdd(this.youtubeResult!);
        AppState.playlistSelectSheet.open();
    }

    msTimeToDisplayString(ms: number) {
        const t = new Date('0');
        t.setMilliseconds(ms);
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
.card {
    $height: 60px;
    height: $height;
    display: grid;
    grid-template-columns: $height auto $height;
    overflow: hidden;

    &:hover {
        background-color: var(--v-secondary-base);
        .card__image {
            background-color: #30303094;
            background-blend-mode: overlay;
        }
        .play-icon {
            display: initial;
        }
    }

    &__image {
        height: $height;
        background-size: auto $height;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .play-icon {
            display: none;
        }
    }

    &__title {
        font-size: 20px;
        font-weight: normal;
        line-height: $height;
        overflow: hidden;
        white-space: nowrap;
    }

    &__duration {
        line-height: $height;
        text-align: right;
    }
}
</style>
