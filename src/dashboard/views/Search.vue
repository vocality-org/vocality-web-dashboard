<template>
    <div>
        <div class="container">
            <div class="search">
                <v-text-field label="sd"></v-text-field>
                <v-overflow-btn
                    class="my-2"
                    :items="dropdownFont"
                    label="Overflow Btn"
                    target="#dropdown-example-1"
                ></v-overflow-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { VTextField } from 'vuetify/lib';
import { mdiMagnify } from '@mdi/js';

@Component({
    components: {
        VTextField,
    },
})
export default class Search extends Vue {
    searchIcon = mdiMagnify;
    dropdownFont = ['Arial', 'Calibri', 'Courier', 'Verdana'];
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 720px;
    padding: 32px, 64px;
    @include mq(sm) {
        padding: 32px 128px;
    }
}
</style>
