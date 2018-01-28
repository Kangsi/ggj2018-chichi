import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.game.scale.forceOrientation(true, false);
    this.game.time.advancedTiming = true;
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    });

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
    this.load.image('logo-bg', './assets/images/logo-bg.png');
    this.load.image('logo-text', './assets/images/logo-text.png');
    this.load.image('flawless-cloud-stars', './assets/images/flawless-cloud-stars.png');

  }

  render () {
    for (let i = 0; i < 8; i += 1) {
      game.input.addPointer();
    }
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
