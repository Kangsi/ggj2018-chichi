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
  constructor (game, image) {
    super(game)
    this.list = [];
    this.image = image;
    this.ballCounter = 0;
    game.startCountDown.add(() => {
      this.createBalls();
    });
  }


  createBalls () {
    const delay = 100;
    let currentPlayerIndex = 0.05;
    for (let i = 0; i < positionList.length; i += 1) {
      if (!game.players[Math.floor(currentPlayerIndex)].active) {
        currentPlayerIndex += 1 / (positionList.length / 4);
        continue;
      }

      currentPlayerIndex += 1 / (positionList.length / 4);

      setTimeout(() => {
        const ball = new Ball({
          asset: this.image,
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
    const player1balls = [];
    const player2balls = [];
    const player3balls = [];
    const player4balls = [];


    let timeDifferenceBetweenPlayers = 0;
    const timeDifferenceBetweenPlayersStep = 1000;
    const isReal = [ false, false, false, false]
    const timeDifferenceCurrentPlayer = [0,0,0,0];
    const timeStep = 100;
    for (let i = 0; i < this.list.length; i += 1) {
      // Left top corner
      if (this.list[i].x < game.width / 2 && this.list[i].y < game.height / 2 ) {
        player1balls.push(this.list[i]);
        // Right top corner
      } else if (this.list[i].x >= game.width / 2 && this.list[i].y < game.height / 2) {
        player2balls.push(this.list[i]);
        // Left Bot corner
      } else if (this.list[i].x < game.width / 2 && this.list[i].y >= game.height / 2) {
        player3balls.push(this.list[i]);
        // Right Bot corner
      } else {
        player4balls.push(this.list[i]);
      }
    }
    if (player1balls.length === 0) {

    } else {
      for (let i = 0; i < player1balls.length; i += 1) {
        setTimeout(() => {
          this.disappearTween(player1balls[i], 0);
        }, timeDifferenceBetweenPlayers + i * timeStep);
      }

      timeDifferenceBetweenPlayers += timeDifferenceBetweenPlayersStep;

    }

    if (player2balls.length === 0) {

    } else {
      for (let i = 0; i < player2balls.length; i += 1) {
        setTimeout(() => {
          this.disappearTween(player2balls[i], 1);
        }, timeDifferenceBetweenPlayers + i * timeStep);
      }

      timeDifferenceBetweenPlayers += timeDifferenceBetweenPlayersStep;

    }

    if (player3balls.length === 0) {

    } else {
      for (let i = 0; i < player3balls.length; i += 1) {
        setTimeout(() => {
          this.disappearTween(player3balls[i], 2);
        }, timeDifferenceBetweenPlayers + i * timeStep);
      }

      timeDifferenceBetweenPlayers += timeDifferenceBetweenPlayersStep;

    }
    if (player4balls.length === 0) {

    } else {
      for (let i = 0; i < player4balls.length; i += 1) {
        setTimeout(() => {
          this.disappearTween(player4balls[i], 3);
        }, timeDifferenceBetweenPlayers + i * timeStep);
      }

      timeDifferenceBetweenPlayers += timeDifferenceBetweenPlayersStep;

    }
  }

  disappearTween (ball, playerID) {
    ball.disappearAnimation(playerID);

    this.ballCounter += 1;

    if (this.ballCounter === this.list.length) {
      setTimeout(() => {
        this.game.saveScore.dispatch();
        if (game.flaws.step === 4) {
          this.game.state.start('ScoreState');
        }

        else {
          this.game.state.start('Game');
        }
      }, 2000);
    }
  }

  render () {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].render();
    }
  }
}
