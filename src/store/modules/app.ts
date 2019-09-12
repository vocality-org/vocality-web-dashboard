import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

class GuildBarState {
    isOpen: boolean;
    activeGuildId: string;

    constructor() {
        this.isOpen = false;
        this.activeGuildId = '';
    }
}

export interface IAppState {
    guildBar: GuildBarState;
}

@Module({
    name: 'app',
    namespaced: true,
})
export class App extends VuexModule implements IAppState {
    guildBar = new GuildBarState();

    @Mutation
    setGuildBar(state: boolean) {
        this.guildBar.isOpen = state;
    }
    @Mutation
    setActiveGuildId(id: string) {
        this.guildBar.activeGuildId = id;
    }
}
