import Phaser from 'phaser';

export default class Overlay extends Phaser.Graphics {
  constructor ({
    lineStyle, color, alpha, x = 0, y = 0,
    width = game.width, height = game.height, inputEnabled = true, visible = true
  }) {
    super(game);

    this.x = x;
    this.y = y

    this.lineStyle(lineStyle);
    this.beginFill(color);
    this.drawRect(0, 0, width, height);
    this.endFill();

    this.alpha = alpha;
    this.inputEnabled = inputEnabled;
    this.visible = visible;
  }
}
