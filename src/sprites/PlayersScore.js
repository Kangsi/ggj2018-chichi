import Phaser from 'phaser';
import Text from '../services/Text';
import Config from '../config';

const transformList = [
  { x: Config.width / 6,      y: Config.height / 5,     angle: 180 - 55},
  { x: Config.width * 5 / 6,  y: Config.height / 5,     angle: 180 + 55},
  { x: Config.width / 6,      y: Config.height * 4 / 5, angle: 0 + 55},
  { x: Config.width * 5 / 6,  y: Config.height * 4 / 5, angle: 0 - 55},
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
      const text = new Phaser.BitmapText(game, transformList[i].x, transformList[i].y, 'awesome-font', 0, 20);

      text.anchor.setTo(0.5);
      text.angle = transformList[i].angle;
      text.visible = false;
      this.textList[i] = text;
      text.stroke = '#fff';
      text.strokeThickness = 16;
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
