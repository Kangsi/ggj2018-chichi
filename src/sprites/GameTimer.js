import Phaser from 'phaser';
import Text from '../services/Text';
import Overlay from '../services/Overlay';

export default class GameTimer extends Phaser.Group {
  constructor (game, time) {
    super(game);
    this.time = time;
    this.game = game;
    this.buildOverlay();
    this.game.startGameTimer.add(() => {
      setTimeout(() => {
        this.buildTimer();
      }, 500)
    });
  }
  buildTimer () {
    this.timer = new Text({
      text: this.time,
      x: game.width / 2,
      y: game.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      fontSize: 150
    });

    this.add(this.timer);
    this.tween = this.game.add.tween(this.timer.scale).to({}, 500, Phaser.Easing.Quintic.In, true, 0);
    const waiting = this.game.add.tween(this.timer.scale).to({}, 500, Phaser.Easing.Quintic.In, false, 0);
    this.tween.chain(waiting)
    waiting.onComplete.add(() => {
      this.setTime();
    });
  }

  setTime () {
    this.time -= 1;
    this.timer.text = this.time > 0 ? this.time : 'Done!';

    if (this.time < 0) {
      return;
    }
    // this.timer.scale.setTo(0);

    this.tween.start();

    if (this.time === 0) {
      setTimeout(() => {
        this.timer.visible = false;
        game.endRound.dispatch();
      }, 2000);
      this.overlay.visible = true;
    }
  }

  buildOverlay () {
    this.overlay = new Overlay({
      alpha: 0
    });
    this.overlay.visible = false;
    this.add(this.overlay);
  }
}