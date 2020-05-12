class Engine {
	constructor() {
		let _bgCvs = document.getElementById("c1");
		let _fgCvs = document.getElementById("c2");

		let _cvs = {
			bgCvs: _bgCvs,
			fgCvs: _fgCvs,
			bgCtx: _bgCvs.getContext("2d"),
			fgCtx: _fgCvs.getContext("2d")
		}

		_cvs.bgCtx.imageSmoothingEnabled = false;
		_cvs.fgCtx.imageSmoothingEnabled = false;

		let _bgImage = new Image();
		_bgImage.src = "img/tower.png";
		_bgImage.addEventListener("load", () => {
			_bgImage = this;
		});	

		let _plImage = new Image();
		_plImage.src = "img/player.png";
		_plImage.addEventListener("load", () => {
			_plImage = this;
		});		

		let _stImage = new Image();
		_stImage.src = "img/step.png";
		_stImage.addEventListener("load", () => {
			_stImage = this;
		});		

		let _img = {
			bgImage: _bgImage,
			plImage: _plImage,
			stImage: _stImage
		}

		this.data = {
			cvs: _cvs,
			img: _img,
			frameNum: 0,
			acceleration: 0
		}
		this.start();
	}

	start() {
		let _controllers = {
			input: new Input(),
			objects: new Objects(this),
			animation: new Animation(),
			render: new Render(),
			physics: new Physics(),
		}

		this.data.ctr = _controllers;
		
		this.tm = setInterval(() => {
			this.data.frameNum++;
			this.data.ctr.objects.updata(this);
			this.data.ctr.physics.updata(this);
			this.data.ctr.input.updata(this);
			this.data.ctr.animation.updata(this);
			this.data.ctr.render.updata(this);
		}, 1000/30);
	}

	restart() {
		clearInterval(this.tm);
		this.data.frameNum = 0;
		this.data.acceleration = 0;
		this.start();
	}
}

window.onload = () => {
	new Engine();
}