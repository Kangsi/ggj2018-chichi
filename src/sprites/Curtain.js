import Phaser from 'phaser'
import Sprite from '../services/Sprite';
import Text from '../services/Text';

const offset = 226;

export default class Curtain extends Phaser.Group {
  constructor(game, goIn = true) {
    super(game);

    this.goIn = goIn

    this.buildCurtains();
    if (!goIn) {
      this.buildText();
    }
  }

  buildCurtains() {
    const leftCurtain = new Sprite({
      asset: 'curtain',
      x: this.goIn ? 0 : game.width / 2 + offset,
      anchorX: 1,
    });

    const tween1 = game.add.tween(leftCurtain).to({
        x: this.goIn ? game.width / 2 + offset : 0
      },
      2000,
      this.goIn ? Phaser.Easing.Cubic.Out : Phaser.Easing.Cubic.In)

    setTimeout(() => {
      tween1.start();
    }, this.goIn ? 0 : 3000)

    if (this.goIn) {
      tween1.onComplete.add(() => {
        setTimeout(() => {
          game.state.start('ScoreState');
        });
      });
    }
    this.add(leftCurtain)

    const rightCurtain = new Sprite({
      asset: 'curtain',
      x: this.goIn ? game.width : game.width / 2 - offset * 1.1,
      anchorX: 1,
    });

    rightCurtain.scale.setTo(-1, 1);

    const tween2 = game.add.tween(rightCurtain).to({
        x: this.goIn ? game.width / 2 - offset * 1.1 : game.width
      },
      2000,
      this.goIn ? Phaser.Easing.Cubic.Out : Phaser.Easing.Cubic.In)

    setTimeout(() => {
      tween2.start();
    }, this.goIn ? 0 : 3000)

    this.add(rightCurtain);
  }

  buildText() {
    this.results1 = new Sprite({
      asset: 'results',
      x: game.width / 2,
      y: game.height * 4 / 3,
      anchorX: 0.5,
      anchorY: 0.5,
    });
    game.add.tween(this.results1).to({y: game.height * 2 / 3}, 2000, Phaser.Easing.Quintic.InOut, true, 0, 0, true);
    this.add(this.results1);

    this.results2 = new Sprite({
      asset: 'results',
      x: game.width / 2,
      y: -game.height * 1 / 3,
      anchorX: 0.5,
      anchorY: 0.5,
    });
    game.add.tween(this.results2).to({y: game.height * 1 / 3}, 2000, Phaser.Easing.Quintic.InOut, true, 0, 0, true);

    this.results2.angle = 180;

    this.add(this.results2);

    setTimeout(() => {

    }, 2000);
  }
}