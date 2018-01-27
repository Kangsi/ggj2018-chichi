/* globals __DEV__ */
import Phaser from 'phaser';
import AllBalls from '../sprites/AllBalls';
import Questions from '../sprites/Questions';
import CountDown from '../sprites/CountDown';
import GameTimer from '../sprites/GameTimer';
import PlayersScore from '../sprites/PlayersScore';
import CreateBG from '../sprites/CreateBG';
import Overlay from '../services/Overlay';

export default class extends Phaser.State {
  init () {
    game.physics.startSystem(Phaser.Physics.arcade);
    this.game.startCountDown = new Phaser.Signal();
    this.pointers = [];
    this.game.playerScore = [ 0, 0, 0, 0 ];
    this.game.startGameTimer = new Phaser.Signal();
    this.game.endRound = new Phaser.Signal();
    this.game.updateScore = new Phaser.Signal()
    this.game.saveScore = new Phaser.Signal();
    this.game.toggleOverlay = new Phaser.Signal();
    this.game.time.desiredFps = 60;

    this.flaw = game.flaws.getFlaw();
  }
  preload () {}

  create () {

    this.game.input.onDown.add((pointer) => {
      this.pointers.push(pointer);
      this.checkInput();
    });

    this.game.input.onUp.add((pointer) => {
      const index = this.pointers.indexOf(pointer);

      if (index > -1) {
        this.pointers.splice(index, 1);
      }
    });
    this.createBG = new CreateBG(game);
    this.gameTimer = new GameTimer(game, 5);
    this.allBalls = new AllBalls(game, this.flaw.image);
    this.questions = new Questions(game, this.flaw.question);
    this.countDown = new CountDown(game);


    this.playersScore = new PlayersScore(game, this.flaw.image);

    this.overlay = new Overlay({ alpha: 0.5});
    game.add.existing(this.overlay)

    this.game.toggleOverlay.add((visible) => {
      this.overlay.visible = visible;
    });

    this.game.endRound.add(() => {
      this.doEndRound();
    });
  }

  doEndRound () {
    setTimeout(() => {
      this.allBalls.removeAllBalls();
    }, 1000);
  }
  
  render () {
    if (__DEV__) {
      this.game.debug.text(game.time.fps, 25, 25, '#00ff00')
    }
  }

  checkInput () {
    const playerInput = [ 0, 0, 0, 0 ];
    const playerIndex = [ 0, 0, 0, 0 ];
    for (let i = 0; i < this.pointers.length; i += 1) {
      if (this.pointers[i].position.x < game.width / 2 && this.pointers[i].position.y < game.height / 2) {
        playerInput[0] += 1;
        playerIndex[0] = i;
      } else if (this.pointers[i].position.x >= game.width / 2 && this.pointers[i].position.y < game.height / 2) {
        playerInput[1] += 1;
        playerIndex[1] = i;
      } else if (this.pointers[i].position.x < game.width / 2 && this.pointers[i].position.y >= game.height / 2) {
        playerInput[2] += 1;
        playerIndex[2] = i;
      } else {
        playerInput[3] += 1;
        playerIndex[3] = i;
      }
    }
    // TODO remove pointer if higher than 1
  }
}
