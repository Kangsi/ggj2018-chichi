import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init () {
    for (let i = 0; i < 8; i += 1) {
      game.input.addPointer();
    }
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('shoe', 'assets/images/shoe.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('bg', 'assets/images/bg.png');
    this.load.image('player-button', 'assets/images/player-button.png');
    this.load.image('play-button', 'assets/images/play-button.png');
  }

  create () {
    this.state.start('Game');
    this.load.image('shoe', 'assets/images/shoe.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
  }
}
