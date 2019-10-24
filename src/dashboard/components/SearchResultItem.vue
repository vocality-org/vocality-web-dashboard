<template>
    <div>
        <div v-if="youtubeResult">
            <v-card class="card" @click="emitPlay()">
                <div class="card__image" :style="{ backgroundImage: `url(${youtubeResult.thumbnail_url})` }">
                    <v-icon class="play-icon" large>{{ playIcon }}</v-icon>
                </div>
                <h3 class="card__title ml-4">
                    <span class="title-text" v-html="youtubeResult.title"></span>
                </h3>
                <span class="card__duration mr-4">{{ msTimeToDisplayString(youtubeResult.max_time_ms) }}</span>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Song } from '@/store/modules/music';
import { mdiPlay } from '@mdi/js';
import { DiscordState } from '@/store';

@Component
export default class SearchResultItem extends Vue {
    playIcon = mdiPlay;

    @Prop() readonly youtubeResult: Song | undefined;

    @Emit('play')
    emitPlay() {
        this.$socket.client.emit('command', {
            name: 'play',
            args: [this.youtubeResult!.url],
            messageData: {
                guildId: DiscordState.currentGuildId,
            },
        });
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
        background-color: rgb(88, 88, 88);
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
        background-image: url(https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80);
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
