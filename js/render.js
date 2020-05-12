class Render {
	constructor() {}

	updata(eng) {
		this.draw(eng.data.objects.tower, eng.data.cvs.bgCtx);

		eng.data.objects.walls.forEach((wall) => {
			this.draw(wall, eng.data.cvs.bgCtx);
		})
		
		this.clear(eng.data.cvs.fgCtx, eng.data.cvs.fgCvs);
		this.draw(eng.data.objects.player, eng.data.cvs.fgCtx);
		
		if(eng.data.objects.player.die) {
			let text = "<span style=\"font-size: 81px;\">GAME OVER</span></br>" + "Score: " + Math.floor(eng.data.objects.player.score);
			this.write(text, document.getElementById("over"));
			this.write("", document.getElementById("score"));
		} else {
			this.write(Math.floor(eng.data.objects.player.score), document.getElementById("score"));
			this.write("", document.getElementById("over"));
		}
	}

	write(what, where) {
		where.innerHTML = what;
	}

	draw(what, where) {
		where.drawImage(what.currentImg.img,
			what.currentImg.x, what.currentImg.y,
			what.currentImg.w, what.currentImg.h,
			what.x, what.y,
			what.w, what.h);
	}

	clear(what, size) {
		what.clearRect(0,0, size.width, size.height);
	}
}