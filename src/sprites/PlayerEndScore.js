import Phaser from 'phaser';
import Ball from '../sprites/Ball';

export default class PlayerEndScore extends Phaser.Group {
  constructor(game, id, x = 0, y = 0, info, placement) {
    super(game);
    this.x = x;
    this.y = y;
    this.info = info;
    this.id = id;
    this.placement = placement;
    this.buildBalls();
  }

  getPlacement (placement) {
    switch (placement) {
      case 1:
        return 'e';
      case 2:
        return 't';
      case 3:
        return 'd';
      case 4:
        return 'v';
    }
  }

  buildText(placement, id) {
    console.log(placement)
    this.timer = new Phaser.BitmapText(game, game.width / 4 - 100, game.height / 4 + 80, 'awesome-font', this.getPlacement(placement));
    this.timer.scale.setTo(20);
    this.timer.anchor.setTo(0.5, 0.5);
    switch (id) {
      case 0:
        this.timer.y = game.height / 4 - 80;
        this.timer.angle = 180 - 55;
        break;
      case 1:
        this.timer.x = game.width / 4 + 100;
        this.timer.y = game.height / 4 - 80;
        this.timer.angle = 180 + 55;
        break;
      case 2:
        this.timer.angle = 55;
        break;
      case 3:
        this.timer.x = game.width / 4 + 100;
        this.timer.angle = -55;
        break;
    }

    game.add.tween(this.timer.scale).to({ x: 2, y: 2 }, 200, null, true)
    this.add(this.timer);
  }

  buildBalls() {
    let maxIndex = 0;
    for (let k = 0; k < this.info.scoreList.length; k += 1) {
      if (this.info.scoreList[k] > 0) {
        maxIndex = k;
      }
    }

    if (maxIndex === 0 && this.info.scoreList[maxIndex] === 0) {
      console.log("nothing")
      console.log(this.placement)
      this.buildText(this.placement, this.id);

      game.showNextPerson.dispatch();
      return;
    }

    console.log("max index " + maxIndex)
    for (let i = 0; i < this.info.scoreList.length; i += 1) {
      for (let j = 0; j < this.info.scoreList[i]; j += 1) {
        const offset = 0;
        setTimeout(() => {
          const ball = new Ball({
            asset: this.info.itemList[i],
            x: 100 + Math.random() * (game.width / 2 - 200),
            y: 100 + Math.random() * (game.height / 2 - 200),
            anchorX: 0.5,
            anchorY: 0.5,
          });
          console.log("TEST 1 " + i, maxIndex)
          console.log("TEST 2 " + j, this.info.scoreList[maxIndex] - 1)
          if (i === maxIndex && j === this.info.scoreList[maxIndex] - 1) {


            setTimeout(() => {
              this.buildText(this.placement, this.id);
              game.showNextPerson.dispatch()
            }, 400);
          }
          this.add(ball);
        }, i * (500 + this.info.scoreList[i] * 100) + j * 100);
      }
    }
  }

  update() {
    if (this.timer) {
      this.bringToTop(this.timer);
    }
  }
}
