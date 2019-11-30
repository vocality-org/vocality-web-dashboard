<template>
    <div class="page-not-found">
        <div class="header">
            <h1 class="title">404</h1>
            <div style="display: flex; flex-direction: column">
                <p class="text">
                    <br />
                    The page you requested could not be found. <br />
                    You can go back to the dashboard or
                    <a
                        href="https://vocality-landing-page.juliankaindl.now.sh/contact"
                        class="contact"
                    >
                        contact us
                    </a>
                </p>
                <router-link to="/dashboard" tag="a" class="db-btn">
                    Go to Dashboard
                </router-link>
            </div>
        </div>
        <div class="content">
            <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/nu8-7huFyvo"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <br />
            ...you can also listen to this nice song if you want :)
        </div>
        <svg
            viewBox="0 0 1920 1080"
            fill="none"
            class="bg"
            preserveAspectRatio="none"
        >
            <mask
                id="mask0"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100%"
                height="100%"
            >
                <rect width="100%" height="100%" fill="#fff" />
            </mask>
            <g mask="url(#mask0)">
                <g opacity="0.4">
                    <rect
                        x="-129"
                        y="708.59"
                        width="2273.32"
                        height="873.457"
                        transform="rotate(-9.50995 -129 1008.59)"
                        fill="#264D5D"
                    />
                    <rect
                        x="-71"
                        y="805.59"
                        width="2273.32"
                        height="876.457"
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
export default class PageNotFound extends Vue {}
</script>

<style lang="scss" scoped>
.page-not-found {
    position: relative;
    color: #f2f2f2cb;
    overflow: hidden;
    min-height: 100vh;
    background-color: #252525;
    z-index: 0;
}
.bg {
    position: fixed;
    top: 0;
    z-index: 2;
    height: 100vh;
    width: 100vw;
    transform: scaleX(-1) rotate(180deg);
}
.header {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    @include mq(sm) {
        flex-direction: row;
        align-items: center;
    }
}
.title {
    position: relative;
    font-size: 150px;
    margin-top: 32px;
    display: flex;
    justify-content: center;
    z-index: 3;
    letter-spacing: 10px;
    @include mq(sm) {
        display: block;
        margin-top: 50px;
        margin-left: 100px;
    }
}
.text {
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    @include mq(sm) {
        display: block;
        margin-left: 160px;
    }
}
.db-btn {
    text-decoration: none;
    color: #fff;
    background-color: #29abe2;
    padding: 5px 10px;
    max-width: 170px;
    text-align: center;
    border-radius: 4px;
    margin: auto;
    margin-top: 20px;

    @include mq(sm) {
        margin-left: 160px;
    }

    &:hover {
        transform: translateY(1px);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.164);
    }

    transition: transform 200ms ease box-shadow 200ms ease;
}
.contact {
    text-decoration: none;
    color: #29abe2;
    &:hover {
        text-decoration: underline;
    }
}
.content {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    @include mq(sm) {
        display: block;
        margin-left: 100px;
    }
}
</style>
