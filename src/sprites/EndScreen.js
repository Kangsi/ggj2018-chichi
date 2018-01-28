import Phaser from 'phaser'
import Sprite from '../services/Sprite';
import Text from '../services/Text';
import ParticleSystem from '../sprites/ParticleSystem';

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
    this.starParticles = new ParticleSystem('star');
    this.starParticles1 = new ParticleSystem('star');
    this.starParticles2 = new ParticleSystem('star');
    this.starParticles3 = new ParticleSystem('star');
    this.starParticles4 = new ParticleSystem('star');
    this.flawParticles1 = new ParticleSystem(this.player.itemList[0]);
    this.flawParticles2 = new ParticleSystem(this.player.itemList[2]);
    this.flawParticles3 = new ParticleSystem(this.player.itemList[1]);
    this.flawParticles4 = new ParticleSystem(this.player.itemList[3]);
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

    switch (this.player.id) {
      case 0:
        this.screenBg.width = game.width / 2;
        this.screenBg.height = game.height / 2;
        break;
      case 1:
        this.screenBg.width = -game.width / 2;
        this.screenBg.height = game.height / 2;
        break;
      case 2:
        this.screenBg.width = game.width / 2;
        this.screenBg.height = -game.height / 2;

        break;
      case 3:
        this.screenBg.width = -game.width / 2;
        this.screenBg.height = -game.height / 2;
        break;
    }
    this.add(this.screenBg);
  }

  doAnimation () {
    game.world.bringToTop(this)
    game.add.tween(this.scale).to({ x: 2, y: 2}, 1000, Phaser.Easing.Cubic.InOut, true);
    setTimeout(() => {

      this.flawless = new Sprite({
        asset: 'flawless-text',
        x: 0,
        y: 0,
      });
      this.cloud = new Sprite({
        asset: 'flawless-cloud',
        x: 0,
        y: 0,
      });
      this.flawless.anchor.setTo(0.5)
      this.flawless.scale.setTo(0)
      this.cloud.anchor.setTo(0.5)
      this.cloud.scale.setTo(0)
      switch (this.player.id) {
        case 0:
          this.flawless.x = game.width / 4;
          this.flawless.y = game.height / 4;
          this.flawless.angle = 180;
          this.cloud.x = game.width / 4;
          this.cloud.y = game.height / 4;
          this.cloud.angle = 180;
          //this.starParticles.createEmitter(game.width / 2, game.height + 100);
          break;
        case 1:
          this.flawless.x = -game.width / 4;
          this.flawless.y = game.height / 4;
          this.flawless.angle = 180;
          this.cloud.x = -game.width / 4;
          this.cloud.y = game.height / 4;
          this.cloud.angle = 180;
         // this.starParticles.createEmitter(game.width / 2, game.height + 100);
          break;
        case 2:
          this.flawless.x = game.width / 4;
          this.flawless.y = -game.height / 4;
          this.cloud.x = game.width / 4;
          this.cloud.y = -game.height / 4;
          //this.starParticles.createEmitter(game.width / 2, -100);
          break;
        case 3:
          this.flawless.x = -game.width / 4;
          this.flawless.y = -game.height / 4;
          this.cloud.x = -game.width / 4;
          this.cloud.y = -game.height / 4;
          //this.starParticles.createEmitter(game.width / 2, -100);
          break;
      }
      this.starParticles1.createEmitter(game.width, -100);
      this.starParticles2.createEmitter(0, -100);
      this.starParticles3.createEmitter(0, game.height + 100);
      this.starParticles4.createEmitter(game.width , game.height +100);

      this.flawParticles1.createEmitter(game.width, -100,0.5);
      this.flawParticles2.createEmitter(0, -100,0.5);
      this.flawParticles3.createEmitter(0, game.height + 100,0.5);
      this.flawParticles4.createEmitter(game.width , game.height +100,0.5);
      this.add(this.cloud);
      this.add(this.flawless);


      game.world.bringToTop(this.cloud);
      game.world.bringToTop(this.flawless);

      const textTween = game.add.tween(this.flawless.scale).to({ x: 0.3, y: 0.3}, 500, null, true);
      const textBounce1 = game.add.tween(this.flawless.scale)
        .to({ x: 0.36, y: 0.36}, 300, null, false)
      const textBounce2 = game.add.tween(this.flawless.scale)
        .to({ x: 0.3, y: 0.3}, 300, null, false)
      const cloudTween = game.add.tween(this.cloud.scale).to({ x: 0.3, y: 0.3}, 500, null, true);
      const cloudBounce1 = game.add.tween(this.cloud.scale)
        .to({ x: 0.36, y: 0.36}, 2000, null, false)
      const cloudBounce2 = game.add.tween(this.cloud.scale)
        .to({ x: 0.3, y: 0.3}, 2000, null, false)

      textTween.chain(textBounce1);
      textBounce1.chain(textBounce2);
      textBounce2.chain(textBounce1);
      cloudTween.chain(cloudBounce1);
      cloudBounce1.chain(cloudBounce2);
      cloudBounce2.chain(cloudBounce1);

      this.flawless.events.onInputUp.add(() => {
        game.state.start('Splash');
      })
    }, 1000)

  }
}