<template>
    <div :style="{ minWidth: cardWidth + 'px' }">
        <div v-if="!isAdd" class="playlist">
            <v-hover v-slot:default="{ hover }">
                <v-card
                    :width="cardWidth"
                    :height="cardWidth"
                    class="image-grid"
                    @click="emitSelected()"
                >
                    <img
                        v-for="(song, index) in playlist.songs.slice(0, 4)"
                        :key="index"
                        :width="cardWidth / 2"
                        :height="cardWidth / 2"
                        :src="song.thumbnail_url"
                        alt="playlist song thumbnail"
                        class="image"
                    />
                    <div
                        v-for="n in 4 - playlist.songs.length"
                        :key="n + (playlist.songs.length - 1)"
                        class="image-placeholder"
                        :class="`image-placeholder__${n}`"
                    >
                        <span style="color: #fff">?</span>
                    </div>
                    <transition name="fade" v-if="!isSelect">
                        <div v-if="hover" class="popover">
                            <v-tooltip left>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        v-on="on"
                                        text
                                        icon
                                        x-large
                                        class="mx-1"
                                        @click="emitPlay()"
                                    >
                                        <v-icon color="white">
                                            {{ playIcon }}
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>{{ $t('add') }}</span>
                            </v-tooltip>
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        v-on="on"
                                        text
                                        icon
                                        x-large
                                        class="mx-1"
                                        @click="emitEdit()"
                                    >
                                        <v-icon color="white">
                                            {{ editIcon }}
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>{{ $t('edit') }}</span>
                            </v-tooltip>
                        </div>
                    </transition>
                </v-card>
            </v-hover>
            <h3 class="playlist-name mt-2">{{ playlist.name }}</h3>
            <h5 class="song-count">{{ playlist.songs.length }} Songs</h5>
        </div>
        <div v-if="isAdd">
            <v-card class="new-card" :width="cardWidth" :height="cardWidth">
                <v-btn
                    text
                    icon
                    x-large
                    class="mx-1"
                    @click="emitNewPlaylist()"
                >
                    <v-icon color="white">{{ createIcon }}</v-icon>
                </v-btn>
            </v-card>
            <h3 class="playlist-name mt-2">{{ $t('create') }}</h3>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Playlist } from '@/store/modules/persistent-user-data';
import { mdiPlaylistPlay, mdiPlaylistEdit, mdiViewGridPlus } from '@mdi/js';

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
    createIcon = mdiViewGridPlus;

    @Prop() readonly playlist: Playlist | undefined;
    @Prop() readonly isAdd: boolean | undefined;
    @Prop() readonly isSelect: boolean | undefined;

    @Emit('play')
    emitPlay() {}

    @Emit('edit')
    emitEdit() {}

    @Emit('new')
    emitNewPlaylist() {}

    @Emit('selected')
    emitSelected() {}
}
</script>

<style lang="scss" scoped>
.image-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    .image {
        border-radius: 0 !important;
        box-shadow: none !important;
    }
    .image-placeholder {
        width: 100%;
        height: 100%;
        font-size: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 !important;
        &__1 {
            background-color: var(--v-secondary-darken2);
        }
        &__2 {
            background-color: var(--v-secondary-darken1);
        }
        &__3 {
            background-color: var(--v-secondary-base);
        }
        &__4 {
            background-color: var(--v-secondary-darken2);
        }
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
    background-color: var(--v-primary-base) !important;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 150ms ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.new-card {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--v-primary-base) !important;
}
</style>

<i18n>
{
  "en": {
    "add": "Add to queue",
    "edit": "Edit Playlist",
    "create": "Create new Playlist"
  },
  "de": {
    "add": "Playlist in Warteschlange",
    "edit": "Playlist bearbeiten",
    "create": "Neue Playlist erstellen"
  }
}
</i18n>
