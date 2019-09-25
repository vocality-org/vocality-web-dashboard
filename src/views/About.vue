<template>
    <div class="about">
        <h1 class="c">This is an about page</h1>
        <v-text-field label="Label"></v-text-field>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { VTextField } from 'vuetify/lib';

@Component({
    components: {
        VTextField,
    },
})
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
.c {
    color: clr(brand, pink);
}
</style>
