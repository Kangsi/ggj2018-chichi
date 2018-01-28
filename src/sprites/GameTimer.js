import Phaser from 'phaser';

export default class GameTimer extends Phaser.Group {
  constructor (game, time) {
    super(game);
    this.time = time;
    this.game = game;
    this.ending = true;
    this.game.startGameTimer.add(() => {
      setTimeout(() => {
        this.buildTimer();
      }, 500);
    });
  }
  buildTimer () {
    this.timer = new Phaser.BitmapText(game, game.width / 2, game.height / 2 + 80, 'awesome-font', this.time)
    this.timer.anchor.setTo(0.5)
    this.timer.scale.setTo(2);

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
    if (this.time <= 3 && this.time > 0) {
      this.game.lastThreeSeconds.dispatch();
    }
    this.timer.text = this.time > 0 ? this.time : 's';

    if (this.time <= 0){
      game.world.bringToTop(this);
    }
    if (this.time < 0) {
      return;
    }
    // this.timer.scale.setTo(0);

    this.tween.start();
    if (this.time <= 3) {

    }
    if (this.time === 0) {
      setTimeout(() => {
        this.timer.visible = false;
        game.endRound.dispatch();
      }, 2000);
      this.game.toggleOverlay.dispatch(true);
    }
  }

}