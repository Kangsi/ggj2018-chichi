import Phaser from 'phaser';
import Text from '../services/Text';
import Config from '../config';

const duration = 750;

export default class Questions extends Phaser.Group {
  constructor (game, question) {
    super(game);

    this.game = game;
    this.buildQuestion(question);

    this.game.startGameTimer.add(() => {
      this.disappear();
    })
  }

  buildQuestion (question) {
    this.question1 = new Text({
      text: question,
      x: Config.width / 2,
      y: Config.height * 3 / 4,
      anchorX: 0.5,
      anchorY: 0.5,
      fontWeight: 'bold',
      fontSize: 60,
    });

    // this.question1.setShadow(0, 5, '#cb4f7e')
    this.question1.scale.setTo(0);

    this.question1.stroke = '#fff';
    this.question1.strokeThickness = 16;
    const tween = game.add.tween(this.question1.scale).to({ x: 1, y: 1 }, duration, Phaser.Easing.Quintic.In, true, 500);
    tween.onComplete.add(() => {
      setTimeout(() => {
        game.startCountDown.dispatch();
      }, 1000);
    })
    this.add(this.question1);

    this.question2 = new Text({
      text: question,
      x: Config.width / 2,
      y: Config.height * 1 / 4,
      anchorX: 0.5,
      anchorY: 0.5,
      fontWeight: 'bold',
      fontSize: 60,
    });

    this.question2.angle = 180;
    //	Stroke color and thickness
    // this.question2.setShadow(0, 5, '#cb4f7e')

    this.question2.stroke = '#fff';
    this.question2.strokeThickness = 16;
    this.question2.scale.setTo(0);

    game.add.tween(this.question2.scale).to({ x: 1, y: 1 }, duration, Phaser.Easing.Quintic.In, true, 500);
    this.add(this.question2);
  }

  disappear () {
    game.add.tween(this).to({alpha: 0}, 1000, null, true)
  }
}