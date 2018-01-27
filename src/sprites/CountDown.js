import Phaser from 'phaser';

export default class Questions extends Phaser.Group {
  constructor (game) {
    super(game);
    this.seconds = 5;
    this.game = game;

    this.game.startCountDown.add(() => {
      this.buildTimer();
    });
  }
  buildTimer () {
    this.timer = new Phaser.BitmapText(game, game.width / 2, game.height * 9 / 10, 'awesome-font', this.seconds.toString());
    this.timer.anchor.setTo(0.5, 0.5);


    this.timer.scale.setTo(0);
    this.add(this.timer);
    this.tween = this.game.add.tween(this.timer.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.In, true, 0);
    const waiting = this.game.add.tween(this.timer.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.In, false, 0);
    this.tween.chain(waiting)
    waiting.onComplete.add(() => {
      this.timer.scale.setTo(0);
      this.timer2.scale.setTo(0);
      this.setTime();
    });

    this.timer2 = new Phaser.BitmapText(game, game.width / 2, game.height * 1 / 10, 'awesome-font', this.seconds.toString());
    this.timer2.anchor.setTo(0.5, 0.5);
    this.timer2.angle = 180;
    this.timer2.scale.setTo(0);
    this.add(this.timer2);
    this.tween2 = this.game.add.tween(this.timer2.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.In, true, 0);
    const waiting2 = this.game.add.tween(this.timer2.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.In, false, 0);
    this.tween2.chain(waiting2)
    waiting2.onComplete.add(() => {
      // this.setTime();
    });


  }

  setTime () {
    this.seconds -= 1;
    this.timer.text = this.seconds > 0 ? this.seconds : 'Start!';
    this.timer2.text = this.seconds > 0 ? this.seconds : 'Start!';

    if (this.seconds < 0) {
      return;
    }


    this.tween.start();
    this.tween2.start();

    if (this.seconds === 0) {
      this.game.startGameTimer.dispatch();
      setTimeout(() => {
        this.timer.visible = false;
        this.timer2.visible = false;
      }, 2000);
      this.game.toggleOverlay.dispatch(false);
    }
  }
}
