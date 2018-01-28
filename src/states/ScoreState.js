import Phaser from 'phaser';
import Player from '../services/Player';
import CreateBG from '../sprites/CreateBG';
import PlayerEndScore from '../sprites/PlayerEndScore';
import Config from '../config';
import Curtain from '../sprites/Curtain';
import EndScreen from '../sprites/EndScreen';

const position = [
  { x: 0, y: 0 },
  { x: Config.width / 2, y: 0 },
  { x: 0, y: Config.height / 2 },
  { x: Config.width / 2, y: Config.height / 2 },
]

const position1 = [
  { x: 0, y: 0 },
  { x: Config.width, y: 0 },
  { x: 0, y: Config.height },
  { x: Config.width, y: Config.height },
]

export default class extends Phaser.State {
  init () {
    this.game.showNextPerson = new Phaser.Signal();
    this.game.showPlacement = new Phaser.Signal();
    this.game.showWinner = new Phaser.Signal();

    this.step = 0;
    this.playerInfo = [...game.players];
    this.playerInfo.sort((a, b) => {
      return (a.finalScore() > b.finalScore()) ? -1 : (a.finalScore() < b.finalScore()) ? 1 : 0;
    });

    for (let i = this.playerInfo.length - 1; i >= 0; i -= 1) {
      if (!this.playerInfo[i].active) {
        this.playerInfo.splice(i, 1);
      }
    }

    console.log(this.playerInfo);
  }

  preload () {
    this.game.showNextPerson.add(() => {
      setTimeout(() => {
        console.log(this.step, this.playerInfo.length)
        if (this.step > this.playerInfo.length - 1) {
          console.log("done")
          setTimeout(() => {
            this.game.showWinner.dispatch(this.playerInfo[this.playerInfo.length - 1].id);

          }, 0);

          return;
        }
        this.playerEndScore = new PlayerEndScore(game, this.playerInfo[this.step].id, position[this.playerInfo[this.step].id].x, position[this.playerInfo[this.step].id].y, this.playerInfo[this.step], this.playerInfo.length - this.step);
        this.step += 1;
        if (this.step > this.playerInfo.length - 1) {
          console.log("done")
          setTimeout(() => {

          }, 2000);
          return;
        }
        setTimeout(() => {
          //this.game.showNextPerson.dispatch();

        });
      }, 2000);
    });

    setTimeout(() => {
      this.game.showNextPerson.dispatch();
    }, 3500);
  }

  create () {
    for (let i = 0; i < game.players.length; i += 1) {
      const endScreen = new EndScreen(game, game.players[i], position1[i].x, position1[i].y);
    }
    this.cross = this.game.add.sprite(0, 0, 'cross');
    this.cross.width = game.width;
    this.cross.height = game.height;


    this.game.showPlacement.dispatch();

    this.curtain = new Curtain(game, false);
  }

  update() {}

  render() {
  }

}
