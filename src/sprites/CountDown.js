import Phaser from 'phaser';
import Text from '../services/Text';
import Overlay from '../services/Overlay';
import Config from '../config';

let seconds = 3;

export default class Questions extends Phaser.Group {
  constructor (game) {
    super(game);

    this.game = game;

    this.game.startCountDown.add(() => {
      this.buildTimer();
    });

    this.buildOverlay();
  }

  buildTimer () {
    this.timer = new Text({
      text: seconds,
      x: Config.width / 2,
      y: Config.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      fontSize: 90
    });

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
    seconds -= 1;
    this.timer.text = seconds > 0 ? seconds : 'Start!';

    if (seconds < 0) {
      return;
    }
    this.timer.scale.setTo(0);

    this.tween.start();

    if (seconds === 0) {
      setTimeout(() => {
        this.timer.visible = false;
        this.game.endRound.dispatch();

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