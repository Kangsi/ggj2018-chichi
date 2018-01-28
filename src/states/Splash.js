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
    this.load.image('chin', 'assets/images/chins.png');
    this.load.image('crybaby', 'assets/images/crybaby.png');
    this.load.image('beer', 'assets/images/beer.png');
    this.load.image('nerd', 'assets/images/nerd.png');
    this.load.image('gamer', 'assets/images/gamer.png');
    this.load.image('poop', 'assets/images/poop.png');
    this.load.image('penis', 'assets/images/penis.png');

    this.load.image('question-bg', 'assets/images/question-bg.png');

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
    this.load.image('play-buttonbg', 'assets/images/play-buttonbg.png');
    this.load.image('player-button2', 'assets/images/player-button2.png');

    this.load.bitmapFont('awesome-font', 'assets/images/awesome-font-export.png', 'assets/images/awesome-font-export.xml');

    this.load.image('cross', 'assets/images/cross.png');
    this.load.image('danger', 'assets/images/danger.png');
    this.load.image('star', 'assets/images/star.png');

    this.load.image('orangeBg', 'assets/images/orange-bg.png');
    this.load.image('greenBg', 'assets/images/green-bg.png');
    this.load.image('blueBg', 'assets/images/blue-bg.png');
    this.load.image('yellowBg', 'assets/images/yellow-bg.png');

    this.load.image('flawless', 'assets/images/flawless.png');

    this.load.image('curtain', 'assets/images/curtain.png');
    this.load.image('results', 'assets/images/results.png');
    this.load.image('plop', 'assets/images/plop-particle.png');

    //AudioFiles
    this.load.audio('drum', 'assets/sounds/drums.mp3');
    this.load.audio('guitar', 'assets/sounds/guitar.mp3');
    this.load.audio('melody', 'assets/sounds/melody.mp3');
    this.load.audio('join1', 'assets/sounds/clickPlayerToJoin.mp3');
    this.load.audio('join2', 'assets/sounds/clickPlayerToJoin1.mp3');
    this.load.audio('join3', 'assets/sounds/clickPlayerToJoin2.mp3');
    this.load.audio('pop', 'assets/sounds/pop.mp3');
    this.load.audio('start', 'assets/sounds/boing.wav');
    this.load.audio('spawn', 'assets/sounds/spawn.mp3');
    this.load.audio('slide', 'assets/sounds/slide.mp3');
    this.load.audio('boom', 'assets/sounds/boom.mp3');
    this.load.audio('inflate', 'assets/sounds/inflate.wav');
  }

  create () {
    this.state.start('TapToJoin');

    this.load.image('shoe', 'assets/images/shoe.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
  }
}
