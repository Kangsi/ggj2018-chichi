import Phaser from 'phaser';
import Ball from '../sprites/Ball';
import Config from '../config';

const offSet = 80;
const positionList = [
  { x: Config.width / 5 - offSet, y: Config.height  / 4 + offSet },
  { x: Config.width / 5 + offSet, y: Config.height  / 4 + offSet },
  { x: Config.width / 5 , y: Config.height  / 4 - offSet },

  { x: Config.width * 4 / 5 - offSet, y: Config.height  / 4 + offSet },
  { x: Config.width * 4 / 5 + offSet, y: Config.height  / 4 + offSet },
  { x: Config.width * 4 / 5 , y: Config.height  / 4 - offSet },

  { x: Config.width / 5 - offSet, y: Config.height * 3  / 4 + offSet },
  { x: Config.width / 5 + offSet, y: Config.height * 3  / 4 + offSet },
  { x: Config.width / 5 , y: Config.height * 3  / 4 - offSet },

  { x: Config.width * 4 / 5 - offSet, y: Config.height * 3  / 4 + offSet },
  { x: Config.width * 4 / 5 + offSet, y: Config.height * 3  / 4 + offSet },
  { x: Config.width * 4 / 5 , y: Config.height * 3  / 4 - offSet },
]

export default class AllBalls extends Phaser.Group {
  constructor (game) {
    super(game)
    this.list = [];


    game.startCountDown.add(() => {
      this.createBalls();
    });
  }

  createBalls () {
    const delay = 100;
    for (let i = 0; i < positionList.length; i += 1) {
      setTimeout(() => {
        const ball = new Ball({
          asset: 'shoe',
          x: positionList[i].x,
          y: positionList[i].y,
          anchorX: 0.5,
          anchorY: 0.5,
        });
        this.list.push(ball)
        this.add(ball);
      }, delay * i);
    }
  }
  update () {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].update();
    }

    // for (let i = 0; i < this.list.length; i += 1) {
    //   for (let j = i; j < this.list.length; j += 1) {
    //     if (i === j) {
    //       continue;
    //     }
    //     game.physics.arcade.collide(this.list[i], this.list[j]);
    //   }
    // }
  }

  render() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].render();
    }
  }
}
