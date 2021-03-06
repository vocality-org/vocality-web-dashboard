import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Song } from './music';

// maybe make these adjustable in settings
const HISTORY_LENGTH = 100;
const LOCALE = 'en-US';

export interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}

export interface HistoryEntry {
    dateTime: string;
    song: Song;
}

export interface IPersistentUserData {
    playlists: Playlist[];
    history: HistoryEntry[];
    historyLength: number;
    isDarkmodeActive: boolean;
    userLocale: string;
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
    historyLength: number = HISTORY_LENGTH;
    isDarkmodeActive = true;
    userLocale = 'en';

    get getPlaylistById() {
        return (id: number) => {
            return this.playlists.find(p => p.id === id);
        };
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
        if (this.history.length >= HISTORY_LENGTH) {
            this.history.shift();
        }

        const now = new Date();
        const newEntry = {
            song: song,
            dateTime: `${now.toLocaleDateString(
                LOCALE
            )}  ${now.toLocaleTimeString(LOCALE)}`,
        };

        this.history = [newEntry, ...this.history];
    }

    @Mutation
    removeEntryFromHistory(entry: HistoryEntry) {
        this.history.splice(this.history.indexOf(entry), 1);
    }

    @Mutation
    removeAllEntriesfromHistory() {
        this.history = [];
    }

    @Mutation
    setHistoryLength(size: number) {
        if (size >= 10 && size <= 10000) {
            this.historyLength = size;
        }
    }

    @Mutation
    changeDarkmodeActive(state: boolean) {
        this.isDarkmodeActive = state;
    }

    @Mutation
    changeUserLocale(locale: string) {
        if (locale === 'en' || locale === 'de') {
            console.log(locale);
            this.userLocale = locale;
        }
    }
}
