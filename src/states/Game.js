/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';
import AllBalls from '../sprites/AllBalls';

export default class extends Phaser.State {
  init () {
    game.physics.startSystem(Phaser.Physics.arcade);
  }
  preload () {}

  create () {
    this.allBalls = new AllBalls(game);


    this.mushroom = new Mushroom({
      game: game,
      asset: 'mushroom',
      x: 100,
      y: 100,
    });

  }

  render () {
    if (__DEV__) {
      this.allBalls.render()
    }
  }
}
