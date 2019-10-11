<template>
    <div class="playlist" :style="{ width: cardWidth + 'px' }">
        <v-hover v-slot:default="{ hover }">
            <v-card :width="cardWidth" :height="cardWidth" class="image-grid">
                <img
                    v-for="(song, index) in playlist.songs.slice(0, 4)"
                    :key="index"
                    :width="cardWidth / 2"
                    :height="cardWidth / 2"
                    :src="song.thumbnail_url"
                    alt="playlist song thumbnail"
                    class="image"
                />
                <div v-if="playlist.songs.length < 4">
                    <div class="image-placeholder" v-for="n in 4 - playlist.songs.length" :key="n + (playlist.songs.length - 1)">
                        ?
                    </div>
                </div>
                <transition name="fade">
                    <div v-if="hover" class="popover">
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text icon x-large class="mx-1" @click="emitPlay()">
                                    <v-icon>{{ playIcon }}</v-icon>
                                </v-btn>
                            </template>
                            <span>Add to queue</span>
                        </v-tooltip>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text icon x-large class="mx-1" @click="emitEdit()">
                                    <v-icon>{{ editIcon }}</v-icon>
                                </v-btn>
                            </template>
                            <span>Add and remove songs</span>
                        </v-tooltip>
                    </div>
                </transition>
            </v-card>
        </v-hover>
        <h3 class="playlist-name mt-2">{{ playlist.name }}</h3>
        <h5 class="song-count">{{ playlist.songs.length }} Songs</h5>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Playlist } from '@/store/modules/persistent-user-data';
import { mdiPlaylistPlay, mdiPlaylistEdit } from '@mdi/js';

@Component({
    computed: {
        cardWidth() {
            return this.$vuetify.breakpoint.mdAndUp ? 200 : 150;
        },
    },
})
export default class PlaylistItem extends Vue {
    playIcon = mdiPlaylistPlay;
    editIcon = mdiPlaylistEdit;

    @Prop({ required: true }) readonly playlist: Playlist | undefined;

    @Emit('play')
    emitPlay() {}

    @Emit('edit')
    emitEdit() {}

    getThumbnailFromIndex(index: number) {
        if (this.playlist!.songs.length >= index + 1) {
            return this.playlist!.songs[index].thumbnail_url;
        }
    }
}
</script>

<style lang="scss" scoped>
.image-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    .image-placeholder {
        width: 100%;
        height: 100%;
        font-size: 32px;
        line-height: 100px;
        text-align: center;
    }
}
.playlist-name {
    font-size: 18px;
    text-align: center;
    font-weight: 400;
    max-height: 27px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.song-count {
    text-align: center;
    font-weight: 300;
}
.popover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: hsla(350, 67%, 52%, 0.5);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 150ms ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
