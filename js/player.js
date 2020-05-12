class Player {
	constructor(img, x, y) {
		let self = this;

		this.animations = {
			stand: {
				frames: [	new Frame(img, 0, 0, 24, 32),
							new Frame(img, 24, 0, 24, 32),
							new Frame(img, 48, 0, 24, 32),
							new Frame(img, 72, 0, 24, 32)],
				currentFrame: 0
			},
			walkRight: {
				frames: [	new Frame(img, 96, 0, 24, 32),
							new Frame(img, 120, 0, 24, 32),
							new Frame(img, 144, 0, 24, 32),
							new Frame(img, 168, 0, 24, 32)],
				currentFrame: 0
			}, 
			walkLeft: {
				frames: [	new Frame(img, 192, 0, 24, 32),
							new Frame(img, 216, 0, 24, 32),
							new Frame(img, 240, 0, 24, 32),
							new Frame(img, 264, 0, 24, 32)],
				currentFrame: 0
			},
			combo: {
				frames: [	new Frame(img, 0, 32, 32, 32),
							new Frame(img, 32, 32, 32, 32),
							new Frame(img, 64, 32, 32, 32),
							new Frame(img, 96, 32, 32, 32),
							new Frame(img, 128, 32, 32, 32),
							new Frame(img, 160, 32, 32, 32),
							new Frame(img, 192, 32, 32, 32),
							new Frame(img, 224, 32, 32, 32)],
				currentFrame: 0
			},
			stopLeft: new Frame(img, 312,0,24,32),
			stopRight: new Frame(img, 288,0,24,32),
			jumpLeft: new Frame(img, 312,32,24,32),
			jumpRight: new Frame(img, 288,32,24,32),
			squat: new Frame(img, 264, 32, 24, 32)
		};
		this.states = {
			stand: {
				movement() {
					return;
				},
				animation(eng) {
					self.currentImg = self.animations.stand.frames[self.animations.stand.currentFrame];
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
					if(eng.data.frameNum % 10 == 0) {
						self.animations.stand.currentFrame++;

						if(self.animations.stand.currentFrame > self.animations.stand.frames.length - 1) {
							self.animations.stand.currentFrame = 0;
						}
					}
				}
			}, 
			walkRight: {
				movement() {
					return;
				}, 
				animation(eng) {
					self.currentImg = self.animations.walkRight.frames[self.animations.walkRight.currentFrame];
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
					if(eng.data.frameNum % 5 == 0) {
						self.animations.walkRight.currentFrame++;

						if(self.animations.walkRight.currentFrame > self.animations.walkRight.frames.length - 1) {
							self.animations.walkRight.currentFrame = 0;
						}
					}
				}
			}, 
			walkLeft: {
				movement() {
					
				}, 
				animation(eng) {
					self.currentImg = self.animations.walkLeft.frames[self.animations.walkLeft.currentFrame];
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
					if(eng.data.frameNum % 5 == 0) {						
						self.animations.walkLeft.currentFrame++;

						if(self.animations.walkLeft.currentFrame > self.animations.walkLeft.frames.length - 1) {
							self.animations.walkLeft.currentFrame = 0;
						}
					}
				}
			},
			stopRight: {
				movement() {

				},
				animation(eng) {
					self.currentImg = self.animations.stopRight;
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
				}
			},
			stopLeft: {
				movement() {

				},
				animation(eng) {
					self.currentImg = self.animations.stopLeft;
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
				}
			},
			jumpRight: {
				movement() {

				},
				animation(eng) {
					self.currentImg = self.animations.jumpRight;
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
				}
			},
			jumpLeft: {
				movement() {

				},
				animation(eng) {
					self.currentImg = self.animations.jumpLeft;
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
				}
			},
			combo: {
				movement() {

				},
				animation(eng) {
					self.currentImg = self.animations.combo.frames[self.animations.combo.currentFrame];
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
					if(eng.data.frameNum % 2 == 0) {						
						if(self.velX < 0) self.animations.combo.currentFrame++;
						else if(self.velX > 0) self.animations.combo.currentFrame--;

						if(self.animations.combo.currentFrame > self.animations.combo.frames.length - 1) {
							self.animations.combo.currentFrame = 0;
						}
						if(self.animations.combo.currentFrame < 0) {
							self.animations.combo.currentFrame = self.animations.combo.frames.length - 1;
						}
					}
				}
			},
			squat: {
				movement() {

				},
				animation(eng) {
					self.currentImg = self.animations.squat;
					self.w = self.currentImg.w * 3;
					self.h = self.currentImg.h * 3;
				}
			}
		};
		this.currentImg = new Frame(img, 0, 0, 24, 32);
		this.currentState = this.states.stand;
		this.x = x;
		this.y = y;
		this.w = this.currentImg.w * 3;
		this.h = this.currentImg.h * 3;
		this.velX = 0;
		this.velY = 0;
		this.combo = false;
		this.die = false;
		this.stand = false;
		this.score = 0;
	}
}