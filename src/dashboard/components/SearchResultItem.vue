<template>
    <div>
        <div v-if="youtubeResult">
            <v-card class="card">
                <div class="card__image"></div>
                <h3 class="card__title ml-4">
                    {{ youtubeResult.title }}
                </h3>
                <span class="card__duration mr-4">3:32</span>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Song } from '@/store/modules/music';

@Component
export default class SearchResultItem extends Vue {
    @Prop() readonly youtubeResult: Song | undefined;
}
</script>

<style lang="scss" scoped>
.card {
    $height: 60px;
    height: $height;
    display: grid;
    grid-template-columns: $height auto $height;
    &__image {
        overflow: hidden;
        background-image: url(https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80);
        background-size: auto $height;
        background-repeat: no-repeat;
        background-position: center;
    }
    &__title {
        font-size: 20px;
        font-weight: normal;
        line-height: $height;
    }

    &__duration {
        line-height: $height;
        text-align: right;
    }
}
</style>
