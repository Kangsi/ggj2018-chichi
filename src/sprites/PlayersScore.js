import Phaser from 'phaser';
import Text from '../services/Text';

const transformList = [
  { x: game.width / 4, y: game.height / 4, angle: 180 },
  { x: game.width / 4, y: game.height * 3 / 4, angle: 180 },
  { x: game.width * 3 / 4, y: game.height / 4, angle: 0 },
  { x: game.width * 3 / 4, y: game.height * 3 / 4, angle: 0 },
]

export default class PlayersScore extends Phaser.Group {
  constructor (game) {
    super(game);

    this.game = game;
    this.textList = [];
    this.buildTextScore();
  }

  buildTextScore () {
    for (let i = 0; i < transformList.length; i += 1) {
      const text = new Text({
        text: 0,
        x: transformList[i].x,
        y: transformList[i].y,
      });

      text.angle = transformList[i].angle;
      text.visible = false;
      this.textList.push(text);
      this.add(text);
    }
  }
  
  changeText (id) {
    this.textList[id].text = game.playerScore[id];

  }
}
