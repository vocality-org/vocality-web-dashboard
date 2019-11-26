<template>
    <div>
        <div class="container">
            <h1 class="my-5 pt-5">History</h1>
            <virtual-list :size="70" :remain="10">
                <HistoryEntry
                    v-for="entry in history"
                    :key="entry.dateTime.toString()"
                    :dateTime="entry.dateTime"
                    :song="entry.song"
                />
            </virtual-list>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HistoryEntry from '../components/HistoryEntry.vue';
import virtualList from 'vue-virtual-scroll-list';
import { mapGetters, mapState } from 'vuex';
import { PersistentUserDataState } from '@/store';

@Component({
    components: {
        'virtual-list': virtualList,
        HistoryEntry,
    },
    computed: {
        ...mapState('persistentUserData', ['history']),
        ...mapGetters('persistentUserData', ['historyLength']),
    },
})
export default class History extends Vue {
    entry = new HistoryEntry();

    getEntryProps(index: number) {
        const entry = PersistentUserDataState.getHistoryEntryByIndex(index);
        return {
            props: {
                song: entry.song,
                dateTime: entry.dateTime,
            },
        };
    }

    created() {
        PersistentUserDataState.addToHistory({
            _id:
                '_' +
                Math.random()
                    .toString(36)
                    .substr(2, 9),
            title: 'Lister - Show Me 0',
            url:
                'https://i1.sndcdn.com/artworks-000544332270-1udbxe-t500x500.jpg',
            thumbnail_url:
                'https://i1.sndcdn.com/artworks-000544332270-1udbxe-t500x500.jpg',
            requested_by: 'boolean',
            max_time_ms: 320000,
            current_time_ms: 0,
        });
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 720px;
    padding: 32px, 64px;
}
</style>
