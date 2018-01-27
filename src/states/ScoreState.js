import Phaser from 'phaser';
import Player from '../services/Player';

export default class extends Phaser.State {
  init () {
    for (let i = 0; i < game.players.length; i += 1) {
      if (game.players[i].active) {
        buildScore(players[i]);
      }
    }
  }
  buildScore (player) {
    for (let i = 0; i < player.itemList.length; i += 1) {
      for (let j = 0; j < player.scoreList; j += 1) {
        const ball = new Ball ({
          asset: player.itemList[i],
          x: j * 10,
          y: j * 10,
          anchorX: 0.5,
          anchorY: 0.5,
        });
      }
    }
  }
  preload () {}
  create () {}
  update () {}
  render () {}
}
