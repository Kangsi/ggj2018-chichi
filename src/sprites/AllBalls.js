import Phaser from 'phaser';
import Ball from '../sprites/Ball';
import Config from '../config';

const offSet = 80;
const positionList = [
  { x: Config.width / 5 - offSet, y: Config.height / 4 + offSet },
  { x: Config.width / 5 + offSet, y: Config.height / 4 + offSet },
  { x: Config.width / 5, y: Config.height / 4 - offSet },

  { x: Config.width * 4 / 5 - offSet, y: Config.height / 4 + offSet },
  { x: Config.width * 4 / 5 + offSet, y: Config.height / 4 + offSet },
  { x: Config.width * 4 / 5, y: Config.height / 4 - offSet },

  { x: Config.width / 5 - offSet, y: Config.height * 3 / 4 + offSet },
  { x: Config.width / 5 + offSet, y: Config.height * 3 / 4 + offSet },
  { x: Config.width / 5, y: Config.height * 3 / 4 - offSet },

  { x: Config.width * 4 / 5 - offSet, y: Config.height * 3 / 4 + offSet },
  { x: Config.width * 4 / 5 + offSet, y: Config.height * 3 / 4 + offSet },
  { x: Config.width * 4 / 5, y: Config.height * 3 / 4 - offSet },
]

export default class AllBalls extends Phaser.Group {
  constructor (game) {
    super(game)
    this.list = [];
    this.ballCounter = 0;
    game.startCountDown.add(() => {
      this.createBalls();
    });
  }

  createBalls () {
    const delay = 100;
    let currentPlayerIndex = 0.05;
    for (let i = 0; i < positionList.length; i += 1) {
      if (!game.players[Math.floor(currentPlayerIndex)]) {
        currentPlayerIndex += 1 / (positionList.length / 4);
        continue;
      }

      currentPlayerIndex += 1 / (positionList.length / 4);

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

  removeAllBalls () {
    const timeDifferenceBetweenPlayers = 1000;
    const timeDifferenceCurrentPlayer = [0,0,0,0];
    const timeStep = 100;
    for (let i = 0; i < this.list.length; i += 1) {
      // Left top corner
      if (this.list[i].x < game.width / 2 && this.list[i].y < game.height / 2) {
        setTimeout(() => {
          this.disappearTween(this.list[i], 0);
        }, timeDifferenceBetweenPlayers * 0 + timeDifferenceCurrentPlayer[0])
        timeDifferenceCurrentPlayer[0] += timeStep;
        // Right top corner
      } else if (this.list[i].x >= game.width / 2 && this.list[i].y < game.height / 2) {
        setTimeout(() => {
          this.disappearTween(this.list[i], 1);
        }, timeDifferenceBetweenPlayers * 1 + timeDifferenceCurrentPlayer[1])
        timeDifferenceCurrentPlayer[1] += timeStep;
        // Left Bot corner
      } else if (this.list[i].x < game.width / 2 && this.list[i].y >= game.height / 2) {
        setTimeout(() => {
          this.disappearTween(this.list[i], 2);
        }, timeDifferenceBetweenPlayers * 2 + timeDifferenceCurrentPlayer[2])
        timeDifferenceCurrentPlayer[2] += timeStep;
        // Right Bot corner
      } else {
        setTimeout(() => {
          this.disappearTween(this.list[i], 3);
        }, timeDifferenceBetweenPlayers * 3 + timeDifferenceCurrentPlayer[3])
        timeDifferenceCurrentPlayer[3] += timeStep;
      }
    }
  }

  disappearTween (ball, playerID) {
    ball.disappearAnimation(playerID);

    this.ballCounter += 1;

    if (this.ballCounter === this.list.length) {
      console.log("testing")
      setTimeout(() => {
        this.game.state.start('Game');
      }, 2000);
    }
  }

  render() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].render();
    }
  }
}
