import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';
import TapToJoin from './states/TapToJoin';
import ScoreState from './states/ScoreState';

import config from './config';

class Game extends Phaser.Game {
  constructor (config) {
    super(config);

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('TapToJoin', TapToJoin, false)
    this.state.add('ScoreState', ScoreState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}

window.game = new Game(config)

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
