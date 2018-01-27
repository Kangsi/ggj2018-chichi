import Phaser from 'phaser';
import Player from '../services/Player';
import CreateBG from '../sprites/CreateBG';
import PlayerEndScore from '../sprites/PlayerEndScore';
import Config from '../config';
import PlacementScreen from '../sprites/PlacementScreen';

const position = [
  { x: 0, y: 0 },
  { x: Config.width / 2, y: 0 },
  { x: 0, y: Config.height / 2 },
  { x: Config.width / 2, y: Config.height / 2 },
]

export default class extends Phaser.State {
  init () {
    this.game.showNextPerson = new Phaser.Signal();
    this.game.showPlacement = new Phaser.Signal();

    this.step = 0;
    console.log(this.step);
    this.playerInfo = [...game.players];
    console.log(this.playerInfo)
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

  buildScore (player) {
  }

  preload () {
    this.game.showNextPerson.add(() => {
      setTimeout(() => {
        console.log(this.step, this.playerInfo.length)
        if (this.step > this.playerInfo.length - 1) {
          console.log("done")
          return;
        }
        this.playerEndScore = new PlayerEndScore(game, this.playerInfo[this.step].id, position[this.playerInfo[this.step].id].x, position[this.playerInfo[this.step].id].y, this.playerInfo[this.step], this.playerInfo.length - this.step);
        this.step += 1;
        if (this.step > this.playerInfo.length - 1) {
          console.log("done")
          return;
        }
        setTimeout(() => {
          this.game.showPlacement.dispatch();

        });
      }, 3000);
    });

    this.game.showPlacement.add(() => {
      this.playerEndScore = new PlacementScreen(game, 0, position[this.playerInfo[this.step].id].x, position[this.playerInfo[this.step].id].y);
    })
  }

  create() {
    this.createBG = new CreateBG(game);
    this.cross = this.game.add.sprite(0, 0, 'cross');
    this.cross.width = game.width;
    this.cross.height = game.height;


    this.game.showPlacement.dispatch();
  }

  update() {}

  render() {
  }

}
