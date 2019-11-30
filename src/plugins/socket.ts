import Vue from 'vue';
import store from '@/store';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socketUrl = process.env.VUE_APP_SOCKET_URL;

if (socketUrl) {
    const socket = io(socketUrl, {
        autoConnect: false,
        reconnectionAttempts: 10,
    });

    Vue.use(VueSocketIOExt, socket, { store });
}
