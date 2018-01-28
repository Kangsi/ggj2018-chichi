import Phaser from 'phaser';
import Sprite from '../services/Sprite';

export default class RedGlow extends Phaser.Group {
  constructor (game) {
    super(game);

    this.alpha = 0;
    this.buildSprite();

    this.game.lastThreeSeconds.add(() => {
      this.showGlow();
    })
  }

  buildSprite () {
    this.glow = new Sprite({
      asset: 'danger',
    });

    this.add(this.glow);
  }

  showGlow () {
    console.log("show glow")
    game.add.tween(this).to({ alpha: 1 }, 500, null, true, 0, 0, true);
  }
}