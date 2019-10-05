<template>
    <v-dialog v-model="dialogState" max-width="500" @keydown="submitOnEnter($event)">
        <v-card class="pa-4">
            <v-card-title>Play per URL</v-card-title>
            <v-card-text>
                <v-text-field autofocus label="Enter Url" v-model="inputValue" :error-messages="inputErrors">
                    <template v-slot:append>
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    v-if="isInputEmpty()"
                                    v-on="on"
                                    @click="pasteFromClipboard()"
                                    fab
                                    small
                                    color="transparent"
                                    class="elevation-0"
                                >
                                    <v-icon>{{ pasteIcon }}</v-icon>
                                </v-btn>
                            </template>
                            <span>Paste from Clipboard</span>
                        </v-tooltip>
                    </template>
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text @click="submitUrl()">Play</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, DiscordState } from '@/store';
import { mdiContentPaste } from '@mdi/js';

@Component({
    computed: {
        dialogState: {
            get() {
                return AppState.playUrlModal.isOpen;
            },
            set(state: boolean) {
                state ? AppState.playUrlModal.open() : AppState.playUrlModal.close();
            },
        },
    },
})
export default class PlayUrlModal extends Vue {
    pasteIcon = mdiContentPaste;
    inputValue = '';
    inputErrors: Array<String> = [];

    submitUrl() {
        if (this.inputValue === '') {
            this.inputErrors.push('URL is required');
        } else if (!this.inputValue.match('((https)|(http)):\/\/')) {
            this.inputErrors.push("This doesn't look like an url");
        } else {
            AppState.playUrlModal.close();
            this.$socket.client.emit('command', {
                name: 'play',
                args: [this.inputValue],
                messageData: {
                    guildId: DiscordState.currentGuildId,
                },
            });
            this.inputValue = '';
        }
    }

    submitOnEnter(event: KeyboardEvent) {
        if (event.key === 'Enter' && event.code === 'Enter') {
            this.submitUrl();
        }
    }

    isInputEmpty() {
        return this.inputValue.length === 0;
    }

    pasteFromClipboard() {
        navigator.clipboard.readText().then(text => {
            this.inputValue = text;
        });
    }
}
</script>
