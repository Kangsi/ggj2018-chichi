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
    this.load.json('flaws', 'assets/values/flaws.json');

    // All flaws
    this.load.image('shoe', 'assets/images/shoe.png');
    this.load.image('smile', 'assets/images/smile.png');
    this.load.image('hangry', 'assets/images/hangry.png');
    this.load.image('nose', 'assets/images/nose.png');

    this.load.image('question-bg', 'assets/images/question-bg.png');

    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('bg', 'assets/images/bg.png');

    this.load.image('bluePlayer', 'assets/images/blue-player-bg.png');
    this.load.image('orangePlayer', 'assets/images/orange-player-bg.png');
    this.load.image('yellowPlayer', 'assets/images/yellow-player-bg.png');
    this.load.image('greenPlayer', 'assets/images/green-player-bg.png');

    this.load.image('blue-player-bg-rays', 'assets/images/blue-player-bg-rays.png');
    this.load.image('orange-player-bg-rays', 'assets/images/orange-player-bg-rays.png');
    this.load.image('yellow-player-bg-rays', 'assets/images/yellow-player-bg-rays.png');
    this.load.image('green-player-bg-rays', 'assets/images/green-player-bg-rays.png');

    this.load.image('player-button', 'assets/images/player-button.png');
    this.load.image('player-button-mirror', 'assets/images/player-button-mirror.png');
    this.load.image('play-button', 'assets/images/play-button.png');
    this.load.bitmapFont('awesome-font', 'assets/images/awesome-font-export.png', 'assets/images/awesome-font-export.xml');
    this.load.image('player-button2', 'assets/images/player-button2.png');
    this.load.image('play-buttonbg', 'assets/images/play-buttonbg.png');
    this.load.image('cross', 'assets/images/cross.png');
    this.load.image('star', 'assets/images/star.png');
  }

  create () {
    this.state.start('TapToJoin');



    this.load.image('shoe', 'assets/images/shoe.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
  }
}
