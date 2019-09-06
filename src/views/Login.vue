<template>
    <div class="login">
        <div class="nav">
            <div class="nav__logo">
                <img src="@/assets/logo.svg" alt="logo" height="48" />
            </div>
            <div style="flex: 1 0 auto"></div>
            <ul>
                <li>
                    <a href="#">Website</a>
                </li>
            </ul>
        </div>
        <div class="content">
            <h1 class="title">Dashboard</h1>
            <p>
                Sed sit hic quae aut maxime at commodi aperiam. Ullam ut aliquam rerum vel quasi mollitia sunt doloribus. Nemo
                quia odit ipsam qui.
            </p>
            <button class="discord"><img src="@/assets/discord.svg" alt="discord" height="48" /></button>
        </div>

        <svg viewBox="0 0 1920 1080" fill="none" class="bg" preserveAspectRatio="none">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <rect width="100%" height="100%" fill="#fff" />
            </mask>
            <g mask="url(#mask0)">
                <g opacity="0.4">
                    <rect
                        x="-129"
                        y="1008.59"
                        width="2273.32"
                        height="573.457"
                        transform="rotate(-9.50995 -129 1008.59)"
                        fill="#264D5D"
                    />
                    <rect
                        x="-71"
                        y="1105.59"
                        width="2273.32"
                        height="573.457"
                        transform="rotate(-9.50995 -71 1105.59)"
                        fill="#29ABE2"
                    />
                    <rect
                        x="916.81"
                        y="-440"
                        width="1943.88"
                        height="387.586"
                        transform="rotate(46.0009 916.81 -440)"
                        fill="#332729"
                    />
                    <rect
                        x="1078.81"
                        y="-535"
                        width="1943.88"
                        height="387.586"
                        transform="rotate(46.0009 1078.81 -535)"
                        fill="#48292F"
                    />
                    <rect
                        x="689.178"
                        y="-535"
                        width="1917.87"
                        height="387.586"
                        transform="rotate(27.2022 689.178 -535)"
                        fill="#7C2F3D"
                    />
                    <rect
                        x="1497.44"
                        y="-418"
                        width="848.935"
                        height="387.586"
                        transform="rotate(35.9315 1497.44 -418)"
                        fill="#FF3F60"
                    />
                </g>
            </g>
        </svg>
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
    position: relative;
    color: #f2f2f2;
    overflow: hidden;
    min-height: 100vh;
    background-color: #252525;
}
.bg {
    position: fixed;
    top: 0;
    z-index: 1;
    height: 100vh;
    width: 100vw;
}
.nav {
    position: relative;
    z-index: 3;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: rgba(37, 37, 37, 0.8);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    @include mq(sm) {
        background-color: transparent;
        box-shadow: none;
    }

    &__logo {
        display: flex;
        align-items: center;
    }
    ul {
        list-style: none;
        a {
            text-decoration: none;
            color: #f2f2f2cc;
            &:hover,
            &:focus {
                color: #f2f2f2;
            }
        }
    }
    padding: 0 20px;
}
.content {
    position: relative;
    z-index: 2;
    margin-top: 200px;
    padding: 0 20px;
    @include mq(sm) {
        padding: 0 150px;
    }
    .title {
        --title-size: 55px;
        @include mq(sm) {
            --title-size: 90px;
        }
        position: relative;
        font-size: var(--title-size);
        line-height: var(--title-size);
        font-weight: 300;
        letter-spacing: 2px;
        margin-bottom: 60px;
        &::after {
            content: 'VOCALITY';
            opacity: 0.15;
            font-weight: 900;
            font-size: 150px;
            line-height: 150px;
            position: absolute;
            top: calc(var(--title-size) - 134px);
            left: 0;
            @include mq(sm) {
                top: calc(var(--title-size) - 140px);
                left: -60px;
            }
        }
    }
    p {
        font-size: 19px;
        max-width: 700px;
        opacity: 0.7;
        margin-bottom: 60px;
        @include mq(sm) {
            font-size: 24px;
        }
    }
    .discord {
        background-color: clr(discord, purple);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 35px;

        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
        &:hover,
        &:focus {
            transform: translateY(-1px);
            opacity: 0.7;
            box-shadow: none;
        }
    }
}
</style>
