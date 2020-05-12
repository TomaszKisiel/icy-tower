class Wall {
	constructor(eng, img, num, y) {
		this.rebuild(eng, img, num, y);
	}

	updata(eng) {
		let div = (eng.data.objects.player.y / 100);
		if(div < 1) div = 1;
		if(eng.data.objects.player.y<600 && eng.data.objects.player.velY < 0 && Math.abs(eng.data.objects.player.velY) / (div) > eng.data.acceleration) {
			this.y += Math.abs(eng.data.objects.player.velY) / (div);
		} else {
			this.y += eng.data.acceleration;
		}

		if(eng.data.objects.player.y + eng.data.objects.player.h < this.y && !eng.data.objects.player.die && this.num > 0 && !this.pointed ) {
			eng.data.objects.player.score += ( 10 + Math.floor(Math.random() * 10) );
			this.pointed = true;
		}

		if(this.y > 700 && !eng.data.objects.player.die) {
			this.rebuild(eng, this.img, this.num + 10, this.y - 750);
		}
	}

	rebuild(eng, img, num, y) {
		if(num % 50 == 0) {
			this.currentImg = new Frame(img, 0,(Math.floor(num / 50) % 10) * 21,400,21);
			this.x = 0;
			this.w = 400;
			if(num > 0) eng.data.acceleration += 1;
			
		} else {
			this.x = Math.floor(Math.random() * ((400 - 200) - 0));
			this.w = Math.floor(Math.random() * (200 - 150)) + 150;
			this.currentImg = new Frame(img, 0,(Math.floor(num / 50) % 10) * 21,400,21);
		}
		this.img = img;		
		this.y = y;
		this.h = 20;
		this.num = num;
		this.pointed = false;
	}
}