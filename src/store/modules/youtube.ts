import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import { Song } from './music';

// The gapi type is declared via tsconfig

interface SearchResult {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
}

export interface IYouTubeState {
    isLoaded: boolean;
    nextPageToken: string;
    results: SearchResult[];
}

@Module({
    name: 'youtube',
    namespaced: true,
})
export class YouTube extends VuexModule implements IYouTubeState {
    isLoaded = false;
    nextPageToken = '';
    results: SearchResult[] = [];

    get resultsAsSong(): Song[] {
        return this.results.map(result => {
            return {
                url: `https://www.youtube.com/watch?v=${result.id}`,
                title: result.title,
                thumbnail_url: result.thumbnail,
                requested_by: 'You',
                current_time_ms: 0,
                max_time_ms: parseYtDuration(result.duration),
            };
        });
    }

    @Mutation
    setNextPageToken(token: string) {
        this.nextPageToken = token;
    }

    @Mutation
    setSearchResults(results: SearchResult[]) {
        this.results = results;
    }

    @Mutation
    addSearchResults(results: SearchResult[]) {
        this.results.push(...results);
    }

    @Mutation
    setResultDurationForId(id: string, duration: string) {
        console.log(id);

        this.results.find(result => {
            result.id === id;
        })!.duration = duration;
    }

    @MutationAction({ mutate: ['isLoaded'] })
    async setup() {
        const options = {
            apiKey: process.env.VUE_APP_YOUTUBE_API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        };

        const loader = new Promise((resolve, reject) => {
            gapi.load('client', {
                callback: resolve,
                onerror: reject,
                ontimeout: reject,
                timeout: 1000,
            });
        });

        await loader;
        await gapi.client.init(options);

        await gapi.client
            .load('youtube', 'v3')
            .then(() => {
                console.log('youtube ready');
            })
            .catch((err: any) => {
                console.log(err);
            });

        return {
            isLoaded: true,
        };
    }

    /**
     * Loads the first page of search results
     *
     * Reference:
     * https://developers.google.com/youtube/v3/docs/search/list
     */
    @Action
    search(query: string) {
        const request = (gapi.client as any).youtube.search.list({
            part: 'snippet',
            type: 'video',
            maxResults: 10,
            q: query,
        });

        request.execute((result: any) => {
            this.setNextPageToken(result.nextPageToken);
            console.log(result);
            this.setSearchResults(parseSnippetResults(result.items));
            this.loadDurations();
        });
    }

    /**
     * Loads the next page in the result set
     */
    @Action
    loadNextPage() {
        const request = (gapi.client as any).youtube.search.list({
            part: 'contentDetails',
            type: 'video',
            maxResults: 10,
            pageToken: this.nextPageToken,
        });

        request.execute((result: any) => {
            this.setNextPageToken(result.nextPageToken);
            this.addSearchResults(parseSnippetResults(result.items));
        });
    }

    /**
     * Duration is not included in `search.list` so we need
     * another request to `video.list` to get the durations via the `id` filter
     * and `contentDetails` part
     *
     * References:
     * - https://developers.google.com/youtube/v3/docs/videos/list
     * - https://developers.google.com/youtube/v3/docs/videos#contentDetails
     */
    @Action
    loadDurations() {
        const request = (gapi.client as any).youtube.videos.list({
            part: 'id, contentDetails',
            id: this.results.map(r => r.id).join(','),
            maxResults: this.results.length,
        });

        request.execute((result: any) => {
            result.items.forEach((item: any) => {
                console.log(item);

                this.setResultDurationForId(item.id, item.contentDetails.duration);
            });
        });
    }
}

/**
 * Parses the search results.
 */
function parseSnippetResults(items: any[]): SearchResult[] {
    return items.map(item => {
        return {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            duration: '',
        };
    });
}

/**
 * Parsing the yt time format to milliseconds
 *
 * References:
 * - https://developers.google.com/youtube/v3/docs/videos#contentDetails.duration
 * - https://en.wikipedia.org/wiki/ISO_8601#Durations
 *
 * Since yt doesn't store the date in a duration string we can assume a structure like:
 * `PT1H10M33S`
 */
function parseYtDuration(duration: string): number {
    return duration
        .match(/\d+/g)!
        .reverse()
        .map(string => parseInt(string))
        .reduce((acc, cur, idx) => {
            return (acc += cur * 1000 * (idx > 0 ? Math.pow(60, idx) : 1));
        }, 0);
}
