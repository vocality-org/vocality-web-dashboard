<template>
    <div class="login">
        <div class="card login__card">
            <div class="login__card__avatar">
                <img src="@/assets/logo.svg" alt="logo" />
            </div>
            <div class="login__card__content">
                <h1>Vocality Web Dashboard</h1>
                <div class="login__card__content__features">
                    <img src="@/assets/checkmark.svg" alt="checkmark" />
                    <span>Noice</span>
                    <img src="@/assets/checkmark.svg" alt="checkmark" />
                    <span>Very Noice</span>
                    <img src="@/assets/checkmark.svg" alt="checkmark" />
                    <span>Very Noice</span>
                    <img src="@/assets/checkmark.svg" alt="checkmark" />
                    <span>Very </span>
                </div>
            </div>
            <div class="login__card__divider">
                CONTINUE WITH
            </div>
            <div class="login__card__discord">
                <button><img src="@/assets/discord.svg" alt="discord" height="32" /></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    &__card {
        width: 100%;
        height: 100%;
        padding: 24px;
        text-align: center;
        @include mq(sm) {
            height: unset;
            max-width: 500px;
        }
        &__avatar {
            margin: 0 auto;
            $avatar-height: 100px;
            width: $avatar-height;
            height: $avatar-height;
            display: flex;
            align-items: center;
            justify-content: center;
            @include mq(sm) {
                margin-top: -$avatar-height/2-24px !important;
                border-radius: 50%;
                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
            }
            img {
                margin-top: 10px;
                height: $avatar-height - 16px;
            }
        }
        &__content {
            padding-top: 32px;
            &__features {
                margin-top: 32px;
                display: grid;
                justify-content: center;
                grid-template-columns: 24px auto;
                grid-row-gap: 4px;
                span {
                    text-align: left;
                    padding-left: 16px;
                }
            }
        }
        &__divider {
            position: relative;
            margin: 32px 0;
            font-size: 14px;
            color: #b1b1b1;
            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 7px;
                height: 2px;
                width: 35%;
                background-color: #b1b1b1;
            }
            &::after {
                left: 0;
            }
            &::before {
                right: 0;
            }
        }
        &__discord {
            button {
                width: 160px;
                height: 48px;
                padding: 8px;
                color: #f2f2f2;
                background-color: clr(discord, purple);
                border-radius: 4px;
                &:hover,
                &:focus {
                    transform: translateY(-1px);
                    opacity: 0.8;
                }
            }
        }
    }
}
.card {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>
