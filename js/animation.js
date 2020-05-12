class Animation {
	constructor() {}

	updata(eng) {
		eng.data.objects.player.currentState.animation(eng);
	}
}