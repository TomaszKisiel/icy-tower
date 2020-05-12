class Objects {
	constructor(eng) {

		let _tower = {
			currentImg: new Frame(eng.data.img.bgImage, 0, 702, 400, 1302),
			x: 0, y: 0, w: 400, h: 1302
		}

		let _player = new Player(eng.data.img.plImage, 160, 450);

		let _walls = [	new Wall(eng, eng.data.img.stImage, 0, 550),
						new Wall(eng, eng.data.img.stImage, 1, 475),
						new Wall(eng, eng.data.img.stImage, 2, 400),
						new Wall(eng, eng.data.img.stImage, 3, 325),
						new Wall(eng, eng.data.img.stImage, 4, 250),
						new Wall(eng, eng.data.img.stImage, 5, 175),
						new Wall(eng, eng.data.img.stImage, 6, 100),
						new Wall(eng, eng.data.img.stImage, 7, 25),
						new Wall(eng, eng.data.img.stImage, 8, -50),
						new Wall(eng, eng.data.img.stImage, 9, -125)];

		eng.data.objects = {};
		eng.data.objects.tower = _tower;
		eng.data.objects.player = _player;
		eng.data.objects.walls = _walls;

	}

	updata(eng) {
		eng.data.objects.walls.forEach((wall) => {
			wall.updata(eng);
		});

		if(eng.data.objects.player.y<600 && eng.data.objects.player.velY < 0 ) {
			let div = (eng.data.objects.player.y / 100);
			if(div < 1) div = 1;
			eng.data.objects.tower.currentImg.y -= (Math.abs(eng.data.objects.player.velY) / (div)) / 2;
		} else {
			eng.data.objects.tower.currentImg.y -= eng.data.acceleration / 2;
		}

		if(eng.data.objects.tower.currentImg.y<=0) eng.data.objects.tower.currentImg.y = 516;
	}
}