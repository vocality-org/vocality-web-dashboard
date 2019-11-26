import {
    Module,
    VuexModule,
    MutationAction,
    Action,
    Mutation,
} from 'vuex-module-decorators';
import { Song } from './music';

export interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}

export interface HistoryEntry {
    dateTime: Date;
    song: Song;
}

export interface IPersistentUserData {
    playlists: Playlist[];
    history: HistoryEntry[];
}

@Module({
    name: 'persistentUserData',
    namespaced: true,
})
export class PersistentUserData extends VuexModule
    implements IPersistentUserData {
    playlists: Playlist[] = [];
    idTracker: number = 0;
    history: HistoryEntry[] = [];

    get getPlaylistById() {
        return (id: number) => {
            return this.playlists.find(p => p.id === id);
        };
    }

    get historyLength() {
        return this.history.length;
    }

    get getHistoryEntryByIndex() {
        return (index: number) => {
            return this.history[index];
        };
    }

    @Mutation
    createNewPlaylist(playlist: Playlist) {
        this.idTracker++;
        playlist.id = this.idTracker;
        this.playlists.push(playlist);
    }

    @Mutation
    deletePlaylist(id: number) {
        this.playlists.splice(this.playlists.findIndex(p => p.id === id), 1);
    }

    @Mutation
    renamePlaylist(newName: string) {}

    @Mutation
    addSongToPlaylist(data: { id: number; song: Song }) {
        if (data.song) {
            if (this.playlists.find(p => p.id === data.id)) {
                this.playlists
                    .find(p => p.id === data.id)!
                    .songs.push(data.song);
            }
        }
    }

    @Mutation
    removeSongFromPlaylist(id: number, song: Song) {
        const playlist = this.playlists.find(p => p.id === id);
        if (playlist) {
            playlist.songs.splice(playlist.songs.indexOf(song), 1);
        }
    }

    @Mutation
    addToHistory(song: Song) {
        if (this.history.length >= 100) {
            this.history.shift();
        }
        this.history.push({
            song: song,
            dateTime: new Date(),
        });
    }

    @Mutation
    removeEntryFromHistory(song: Song) {
        const entry = this.history.find(e => e.song === song);
        if (entry) {
            this.history.splice(this.history.indexOf(entry), 1);
        }
    }
}
