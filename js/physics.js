class Physics {
	constructor() {}

	updata(eng) {
		if(!eng.data.objects.player.die) {
			this.gravity(eng);	 
			this.collision(eng.data.objects.player, eng.data.objects.walls);
			this.wallLimit(eng);
		}
	}

	gravity(eng) {
		let player = eng.data.objects.player;
		if(player.velY == 0 || ( player.stand && player.velX != 0) ) {
			player.currentState = player.states.stand;
		} else {
			if(player.velX < 0 && player.velX > -30 && !player.combo) {
				player.currentState = player.states.jumpLeft;
			} else if(player.velX > 0 && player.velX < 30 && !player.combo) {	
				player.currentState = player.states.jumpRight;
			} else if(player.velX >= 20 || player.velX <= -20 || player.combo) {
				player.combo = true;
				player.currentState = player.states.combo;
				player.score += .3;
			} 
		}
		if(player.combo) {
			player.velY += .8;
		} else {
			player.velY += 1;
		}		
		if(player.y < 600 && player.velY < 0) {
			let div = (player.y / 100);
			if(div < 1) div = 1;
			player.y += Math.abs(player.velY) / (div);
		}
		if(player.stand) {
			player.y += eng.data.acceleration;
		}
		player.y += player.velY;

		if(player.y > eng.data.cvs.fgCvs.height) {
			player.die = true;
		}
	}

	collision(player, walls) {
		player.stand = walls.some((wall) => {
			if( player.x + ( player.w - 18 ) >= wall.x && player.x <= wall.x + ( wall.w - 18 ) && player.y + player.h >= wall.y && player.y <= wall.y + wall.h) {
				if(player.y - player.velY + player.h <= wall.y) {
					player.y = wall.y - player.h;
					player.velY = 0;
					player.combo = false;
					return true;	
				}
			}
		});
	}

	wallLimit(eng) {
		let player = eng.data.objects.player;
		if(player.x + player.w + player.velX > 400) {
			player.x = 400 - player.w;
			if(player.stand) player.velX = -player.velX/2;
			else player.velX = -player.velX * .7;

			if(player.velY<0) player.velY *= 1.3;
		}
		if(player.x + player.velX < 0) {
			player.x = 0;			
			if(player.stand) player.velX = -player.velX/2;
			else player.velX = -player.velX * .7;

			if(player.velY<0) player.velY *= (1 + (0.02 * Math.abs(player.velX)));
		}
	}
}