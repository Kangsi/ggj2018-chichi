import Phaser from 'phaser';
import Text from '../services/Text';
import Config from '../config';

const transformList = [
  { x: Config.width / 4,      y: Config.height / 4,     angle: 180 - 55},
  { x: Config.width * 3 / 4,  y: Config.height / 4,     angle: 180 + 55},
  { x: Config.width / 4,      y: Config.height * 3 / 4, angle: 0 + 55},
  { x: Config.width * 3 / 4,  y: Config.height * 3 / 4, angle: 0 - 55},
];

export default class PlayersScore extends Phaser.Group {
  constructor (game, imageKey) {
    super(game);

    this.game = game;
    this.textList = [];
    this.imageKey = imageKey;
    this.buildTextScore();

    this.game.updateScore.add((id) => {
      this.changeText(id);
    });

    this.game.saveScore.add((id) => {
      this.saveScore(id);
    });
  }

  buildTextScore () {
    for (let i = 0; i < game.players.length; i += 1) {
      if (!game.players[i].active) {
        continue;
      }
      const text = new Text({
        text: 0,
        x: transformList[i].x,
        y: transformList[i].y,
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: 60,
        fontWeight: 'bold',
      });

      text.angle = transformList[i].angle;
      text.visible = false;
      this.textList[i] = text;
      this.add(text);
    }
  }
  
  changeText (id) {
    if (!this.textList[id]) {
      console.log(id)
      return;
    }
    this.textList[id].text = game.playerScore[id];
    this.textList[id].visible = true;
  }

  saveScore () {
    console.log(game.playerScore)
    for (let i = 0; i < game.players.length; i += 1) {
      game.players[i].addScore(game.playerScore[i], this.imageKey);
    }
  }
}
