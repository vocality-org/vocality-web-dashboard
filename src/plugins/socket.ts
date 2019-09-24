import Vue from 'vue';
import store from '@/store';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socketUrl = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'https://bass-bot-app.herokuapp.com/io';

const socket = io(socketUrl, { autoConnect: false });

Vue.use(VueSocketIOExt, socket, { store });
