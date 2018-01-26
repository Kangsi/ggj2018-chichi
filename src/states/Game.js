/* globals __DEV__ */
import Phaser from 'phaser';
import AllBalls from '../sprites/AllBalls';
import Questions from '../sprites/Questions';
import CountDown from '../sprites/CountDown';


export default class extends Phaser.State {
  init () {
    game.physics.startSystem(Phaser.Physics.arcade);
    this.game.startCountDown = new Phaser.Signal();
  }
  preload () {}

  create () {
    this.allBalls = new AllBalls(game);
    this.questions = new Questions(game, 'Placeholder?');
    this.countDown = new CountDown(game);
  }

  render () {
    if (__DEV__) {
    }
  }
}
