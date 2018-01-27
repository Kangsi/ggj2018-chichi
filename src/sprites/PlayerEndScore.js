import Phaser from 'phaser';
import Ball from '../sprites/Ball';

export default class PlayerEndScore extends Phaser.Group {
  constructor(game, id, x = 0, y = 0, info, placement) {
    super(game);

    this.x = x;
    this.y = y;
    this.info = info;

    this.buildBalls();
    this.buildText(placement);
  }

  buildText(id) {
    this.timer = new Phaser.BitmapText(game, game.width / 4, game.height / 4 + 100, 'awesome-font', `#${id}`);
    this.timer.anchor.setTo(0.5, 0.5);

    this.add(this.timer);
  }

  buildBalls() {
    for (let i = 0; i < this.info.scoreList.length; i += 1) {
      for (let j = 0; j < this.info.scoreList[i]; j += 1) {
        setTimeout(() => {
          const ball = new Ball({
            asset: this.info.itemList[i],
            x: 100 + Math.random() * (game.width / 2 - 200),
            y: 100 + Math.random() * (game.height / 2 - 200),
            anchorX: 0.5,
            anchorY: 0.5,
          });

          this.add(ball);
        }, i * 500 + j * 100);
      }
    }
  }

  update() {
    this.bringToTop(this.timer);
  }
}
