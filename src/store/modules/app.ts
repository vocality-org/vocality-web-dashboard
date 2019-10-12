import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';

class ToggleableState {
    isOpen = false;

    @Mutation
    open() {
        this.isOpen = true;
    }

    @Mutation
    close() {
        this.isOpen = false;
    }
}

class AppDrawerState extends ToggleableState {}

class GuildDrawerState extends ToggleableState {}

class QueueDrawerState extends ToggleableState {}

class PlayUrlModalState extends ToggleableState {}

class CreatePlaylistModalState extends ToggleableState {}

export interface IAppState {
    appDrawer: AppDrawerState;
    guildDrawer: GuildDrawerState;
    queueDrawer: QueueDrawerState;
    playUrlModal: PlayUrlModalState;
    createPlaylistModal: CreatePlaylistModalState;
    isYoutubeSearchActive: boolean;
    isSoundcloudSearchActive: boolean;
}

@Module({
    name: 'app',
    namespaced: true,
})
export class App extends VuexModule implements IAppState {
    appDrawer = new AppDrawerState();
    guildDrawer = new GuildDrawerState();
    queueDrawer = new QueueDrawerState();
    playUrlModal = new PlayUrlModalState();
    createPlaylistModal = new CreatePlaylistModalState();

    isYoutubeSearchActive = true;
    isSoundcloudSearchActive = true;

    @Mutation
    changeYoutubeSearchState(state: boolean) {
        this.isYoutubeSearchActive = state;
    }

    @Mutation
    changeSoundcloudSearchState(state: boolean) {
        this.isSoundcloudSearchActive = state;
    }
}
