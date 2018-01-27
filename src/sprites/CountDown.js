import Phaser from 'phaser';
import Text from '../services/Text';
import Overlay from '../services/Overlay';
import Config from '../config';

export default class Questions extends Phaser.Group {
  constructor (game) {
    super(game);
    this.seconds = 3;
    this.game = game;

    this.game.startCountDown.add(() => {
      this.buildTimer();
    });

    this.buildOverlay();
  }
  buildTimer () {
    this.timer = new Phaser.BitmapText(game, game.width / 2, game.height / 2 + 80, 'awesome-font', this.seconds.toString());
    this.timer.anchor.setTo(0.5, 0.5);


    this.timer.scale.setTo(0);
    this.add(this.timer);
    this.tween = this.game.add.tween(this.timer.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.In, true, 0);
    const waiting = this.game.add.tween(this.timer.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.In, false, 0);
    this.tween.chain(waiting)
    waiting.onComplete.add(() => {
      this.setTime();
    });
  }

  setTime () {
    this.seconds -= 1;
    this.timer.text = this.seconds > 0 ? this.seconds : 'Start!';

    if (this.seconds < 0) {
      return;
    }
    this.timer.scale.setTo(0);

    this.tween.start();

    if (this.seconds === 0) {
      setTimeout(() => {
        this.timer.visible = false;
        this.game.startGameTimer.dispatch();
      }, 2000);
      this.overlay.visible = false;
    }
  }

  buildOverlay () {
    this.overlay = new Overlay({
      alpha: 0
    });

    this.add(this.overlay);
  }
}
