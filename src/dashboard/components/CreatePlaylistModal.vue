<template>
    <v-dialog v-model="dialogState" max-width="400" persistent>
        <v-card class="pa-10">
            <v-card-title class="headline" style="padding-left: 0">Create a new Playlist!</v-card-title>
            <v-form v-model="isFormValid" ref="form" lazy-validation>
                <v-text-field
                    v-model="playlistName"
                    :rules="nameRules"
                    :counter="32"
                    label="Playlist name"
                    required
                ></v-text-field>
            </v-form>
            <v-card-actions class="mt-5">
                <div class="flex-grow-1"></div>
                <v-btn
                    color="grey"
                    text
                    @click="
                        resetForm();
                        dialogState = false;
                    "
                    >Cancel</v-btn
                >
                <v-btn color="green" text @click="submitForm() ? (dialogState = false) : {}">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, PersistentUserDataState } from '@/store';

@Component({
    computed: {
        dialogState: {
            get() {
                return AppState.createPlaylistModal.isOpen;
            },
            set(state: boolean) {
                state ? AppState.createPlaylistModal.open() : AppState.createPlaylistModal.close();
            },
        },
    },
})
export default class CreatePlaylistModal extends Vue {
    isFormValid = true;
    playlistName = '';
    nameRules = [
        (v: any) => !!v || 'Name is required',
        (v: any) => (v && v.length <= 32) || 'Name can have a maximum of 32 characters',
    ];

    resetForm() {
        (this.$refs.form as any).resetValidation();
        this.playlistName = '';
    }

    submitForm() {
        if ((this.$refs.form as any).validate()) {
            PersistentUserDataState.createNewPlaylist({
                name: this.playlistName,
                id: -1,
                songs: [],
            });
            this.resetForm();
            return true;
        }
        return false;
    }
}
</script>

<style lang="scss" scoped></style>
