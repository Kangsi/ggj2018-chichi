import Phaser from 'phaser';

export default class Sprite extends Phaser.Sprite {
  constructor({ asset, x, y, frame, anchorX = 0, anchorY = 0, inputEnabled = true }) {
    super(game, x, y, asset, frame);

    this.game = game;
    //this.scale.setTo(this.game.scaleRatio);
    this.anchor.setTo(anchorX, anchorY);
    this.inputEnabled = inputEnabled;
  }

  center() {
    this.x += this.width / 2;
    this.y += this.height / 2;
  }
}
