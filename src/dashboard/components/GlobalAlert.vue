<template>
    <div>
        <transition name="fade">
            <div class="alert-container">
                <v-alert :value="message !== ''" dense border="left" type="error" transition="slide-y-transition" class="alert">
                    {{ message }}
                    <v-btn text icon small @click="emitClose()" class="close-button">
                        <v-icon>{{ closeIcon }}</v-icon>
                    </v-btn>
                </v-alert>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { mdiCloseCircle } from '@mdi/js';

@Component({})
export default class GlobalAlert extends Vue {
    closeIcon = mdiCloseCircle;

    @Prop({ required: true }) readonly message: string | undefined;

    @Emit('close')
    emitClose() {}
}
</script>

<style lang="scss" scoped>
.alert-container {
    position: absolute;
    width: 100%;
    z-index: 999;
    padding: 0 150px 0;
    .alert {
        position: relative;
    }
    .close-button {
        position: absolute;
        right: 6px;
        top: 6px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 300ms, transform 300ms ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(50px);
}
</style>
