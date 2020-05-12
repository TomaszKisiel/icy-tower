class Input {
	constructor() {
		var self = this;

		this.keyPressed = {};

		document.addEventListener("keydown", (e) => {
			this.keyPressed[e.keyCode] = true;
		});
		
		document.addEventListener("keyup", (e) => {
			this.keyPressed[e.keyCode] = false;
		});
	}

	updata(eng) {
		let player = eng.data.objects.player;
		if(!player.die) {			
			if(this.keyPressed[39] && player.velX < 30) {
				if(player.velY == 0) {
					player.velX += 3;
				} else {
					player.velX += 2;
				}
				player.x += player.velX;
				if(player.stand) player.currentState = player.states.walkRight;
			} else if(this.keyPressed[39]) {
				player.x += player.velX;
				if(player.stand) player.currentState = player.states.walkRight;
			} else if(player.velX > 0) {
				player.velX -= 1;
				player.x += player.velX;
				if(player.velX < 0) player.velX = 0;
				if(player.stand && player.velX < 10) { 
					player.currentState = player.states.stopRight;
				} else if(player.stand) {
					player.currentState = player.states.walkRight;
				}
			}

			if(this.keyPressed[37] && player.velX > -30) {
				if(player.velY == 0) {
					player.velX -= 3;
				} else {
					player.velX -= 2;
				}
				player.x += player.velX;
				if(player.stand) player.currentState = player.states.walkLeft;
			} else if(this.keyPressed[37]) {
				player.x += player.velX;
				if(player.velY == 0  || player.stand) player.currentState = player.states.walkLeft;
			} else if(player.velX < 0) {
				player.velX += 1;
				player.x += player.velX;
				if(player.velX > 0) player.velX = 0;
				if(player.stand && player.velX > -10) {
					player.currentState = player.states.stopLeft;
				} else if(player.stand) {
					player.currentState = player.states.walkLeft;
				}
			}
			
			if(this.keyPressed[40] && player.velX == 0 && player.stand) {
				player.currentState = player.states.squat;
			}

			if(this.keyPressed[32]) {
				
				if(eng.data.acceleration == 0) {
					eng.data.acceleration = 1;
				}
				
				if(player.velX < 0 && !player.combo) {
					player.currentState = player.states.jumpLeft;
				} else if(player.velX > 0  && !player.combo) {
					player.currentState = player.states.jumpRight;
				}

				if(player.stand) {
					player.velY -= 20.5
					player.y += player.velY;
					player.stand = false;
				}
			}
		} else {
			if(player.die && this.keyPressed[32]) {
				eng.restart();
			}
		}
	}
}