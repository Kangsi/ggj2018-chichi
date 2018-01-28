import Phaser from 'phaser'
import Sprite from '../services/Sprite';
import Text from '../services/Text';

const offset = 226;
const angle = 0.1;
const animationSpeed = 500;

export default class EndScreen extends Phaser.Group {
  constructor(game, player, x, y) {
    super(game);

    this.x = x;
    this.y = y;
    this.player = player;
    this.buildSprite();

    this.game.showWinner.add((id) => {
      if (this.player.id === id) {
        this.doAnimation();
      }
    })
  }

  buildSprite () {
    this.screenBg = new Sprite({
      asset: this.player.backgroundImage
    });



    this.ray = new Sprite({
      asset: this.player.rayImage
    });

    this.ray.scale.setTo(1.5);

    this.ray.rotation = -angle;

    switch (this.player.id) {
      case 0:
        this.ray.x = game.width / 2;
        this.ray.y = game.height / 2;
        this.screenBg.width = game.width / 2;
        this.screenBg.height = game.height / 2;
        this.ray.anchor.setTo(1, 1);
        break;
      case 1:
        this.ray.x = -game.width / 2;
        this.ray.y = game.height / 2;
        this.screenBg.width = -game.width / 2;
        this.screenBg.height = game.height / 2;
        this.ray.anchor.setTo(0, 1);

        break;
      case 2:
        this.ray.x = game.width / 2;
        this.ray.y = -game.height / 2;

        this.screenBg.width = game.width / 2;
        this.screenBg.height = -game.height / 2;
        this.ray.anchor.setTo(1, 0);

        break;
      case 3:
        this.ray.x = -game.width / 2;
        this.ray.y = -game.height / 2;
        this.ray.anchor.setTo(0, 0);
        this.screenBg.width = -game.width / 2;
        this.screenBg.height = -game.height / 2;
        break;
    }
    this.rayTween()
    this.add(this.screenBg);
    //this.add(this.ray);
  }

  rayTween () {
    game.add.tween(this.ray).to({rotation: angle * 2}, animationSpeed, null, true, 0, -1, true);
  }

  doAnimation () {
    game.world.bringToTop(this)
    game.add.tween(this.scale).to({ x: 2, y: 2}, 1000, Phaser.Easing.Cubic.Out, true);
    setTimeout(() => {
      this.flawless = new Sprite({
        asset: 'flawless',
        x: 0,
        y: 0,
      });
      this.flawless.anchor.setTo(0.5)
      this.flawless.scale.setTo(0)
      switch (this.player.id) {
        case 0:
          this.flawless.x = game.width / 4;
          this.flawless.y = game.height / 4;
          this.flawless.angle = 180;

          break;
        case 1:
          this.flawless.x = -game.width / 4;
          this.flawless.y = game.height / 4;
          this.flawless.angle = 180;

          break;
        case 2:
          this.flawless.x = game.width / 4;
          this.flawless.y = -game.height / 4;

          break;
        case 3:
          this.flawless.x = -game.width / 4;
          this.flawless.y = -game.height / 4;
          break;
      }
      this.add(this.flawless);

      game.add.tween(this.flawless.scale).to({ x: 0.5, y: 0.5}, 500, null, true);

      this.flawless.events.onInputUp.add(() => {
        game.state.start('Splash');
      })
    }, 1000)

  }
}