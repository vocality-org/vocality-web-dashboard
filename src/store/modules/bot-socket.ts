import { DiscordState } from '@/store';
import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import axios from 'axios';

export interface IBotSocketState {
    /**
     * The Bots Discord user ID
     */
    botId: string;
}

@Module({
    name: 'botSocket',
    namespaced: true,
})
export class BotSocket extends VuexModule implements IBotSocketState {
    botId = '';

    @Mutation
    setBotId(id: string) {
        this.botId = id;
    }

    @Action
    socket_botid(message: string) {
        this.context.commit('setBotId', message);
        DiscordState.fetchBotGuilds(message);
    }
}
