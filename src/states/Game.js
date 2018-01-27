/* globals __DEV__ */
import Phaser from 'phaser';
import AllBalls from '../sprites/AllBalls';
import Questions from '../sprites/Questions';
import CountDown from '../sprites/CountDown';
import GameTimer from '../sprites/GameTimer';
import CreateBG from '../sprites/CreateBG';

export default class extends Phaser.State {
  init () {
    game.physics.startSystem(Phaser.Physics.arcade);
    this.game.startCountDown = new Phaser.Signal();
    this.game.startGameTimer = new Phaser.Signal();
    this.game.endRound = new Phaser.Signal();

    this.game.endRound.add(() => {
      setTimeout(() => {
        this.game.state.start('Game');
      }, 500)
    });
  }
  preload () {}

  create () {
    this.createBG = new CreateBG(game);
    this.allBalls = new AllBalls(game);
    this.questions = new Questions(game, 'Placeholder?');
    this.countDown = new CountDown(game);
    this.gameTimer = new GameTimer(game, 5);
  }

  render () {
    if (__DEV__) {
    }
  }
}
