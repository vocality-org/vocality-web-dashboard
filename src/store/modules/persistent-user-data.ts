import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import { Song } from './music';

interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}

export interface IPersistentUserData {
    playlists: Playlist[];
    favourites: Song[];
}

@Module({
    name: 'persistentUserData',
    namespaced: true,
})
export class PersistentUserData extends VuexModule implements IPersistentUserData {
    playlists: Playlist[] = [];
    favourites: Song[] = [];

    @Mutation
    addNewPlaylist(playlist: Playlist) {
        if (this.playlists.length > 1) {
            playlist.id = this.playlists[this.playlists.length - 1].id++;
        } else {
            playlist.id = 0;
        }
        this.playlists.push(playlist);
    }

    @Mutation
    addSongToPlaylist(id: number, song: Song) {
        if (this.playlists.find(p => p.id === id)) {
            this.playlists.find(p => p.id === id)!.songs.push(song);
        }
    }

    @Mutation
    removeSongFromPlaylist(id: number, song: Song) {
        if (this.playlists.find(p => p.id === id)) {
            this.playlists.find(p => p.id === id)!.songs.splice(this.playlists.find(p => p.id === id)!.songs.indexOf(song), 1);
        }
    }

    @Mutation
    addFavourite(song: Song) {
        this.favourites.push(song);
    }

    @Mutation
    removeFavourite(song: Song) {
        this.favourites.splice(this.favourites.indexOf(song), 1);
    }
}
