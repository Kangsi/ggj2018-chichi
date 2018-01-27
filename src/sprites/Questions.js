import Phaser from 'phaser';
import Text from '../services/Text';
import Config from '../config';

const duration = 750;

export default class Questions extends Phaser.Group {
  constructor (game, question) {
    super(game);

    this.game = game;
    this.buildQuestionBG();
    this.buildQuestion(question);

    this.game.startGameTimer.add(() => {
      this.disappear();
    });
  }

  buildQuestion (question) {
    this.question1 = new Text({
      text: question,
      x: Config.width / 2,
      y: Config.height * 7 / 12,
      anchorX: 0.5,
      anchorY: 0.5,
      fontWeight: 'bold',
      fontSize: 36,
    });

    // this.question1.setShadow(0, 5, '#cb4f7e')
    this.question1.scale.setTo(0);

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
      y: Config.height * 5 / 12,
      anchorX: 0.5,
      anchorY: 0.5,
      fontWeight: 'bold',
      fontSize: 36,
    });

    this.question2.angle = 180;
    //	Stroke color and thickness
    // this.question2.setShadow(0, 5, '#cb4f7e')

    this.question2.scale.setTo(0);

    game.add.tween(this.question2.scale).to({ x: 1, y: 1 }, duration, Phaser.Easing.Quintic.In, true, 500);
    this.add(this.question2);
  }

  buildQuestionBG () {
    this.questionBG = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'question-bg');
    this.questionBG.scale.setTo(0);
    this.questionBG.anchor.setTo(0.5);

    const tweenBG = game.add.tween(this.questionBG.scale).to({ x: 0.6, y: 0.6 }, duration, Phaser.Easing.Quintic.In, true, 500);
    tweenBG.start();
    this.add(this.questionBG);
  }

  disappear () {
    game.add.tween(this).to({alpha: 0}, 500, null, true);
  }
}