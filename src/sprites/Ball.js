import Phaser from 'phaser'
import Sprite from '../services/Sprite';

const dragCoefficient = 4000;
const amplitude = 40;

export default class Ball extends Sprite {
  constructor({ asset, x, y, frame, anchorX = 0, anchorY = 0, inputEnabled = true }) {
    super({ asset, x, y, frame, anchorX, anchorY, inputEnabled});
    this.pop = game.add.audio('pop');
    this.spawn = game.add.audio('spawn');
    this.slide = game.add.audio('slide');
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.angularDrag = 200;
    this.body.allowRotation = true;
    this.body.bounce.set(0.1);
    this.body.setCircle(this.width / 2);
    this.body.drag = new Phaser.Point(4000, 4000)
    this.inputEnabled = true;
    this.input.enableDrag();
    this.positionArray = [
      {x: 0, y: 0},
      {x: 0, y: 0}
    ];

    this.spawn.play();

    this.angle = Phaser.Point.angle(this.position, new Phaser.Point(game.width / 2, game.height / 2)) * 180 / Math.PI - 90;

    this.events.onDragStop.add(this.stopDrag.bind(this));
    this.scale.setTo(0);
    game.add.tween(this.scale).to({ x: 1, y: 1 }, 400, Phaser.Easing.Bounce.Out, true);
  }

  update () {
    this.positionArray.shift();
    this.positionArray.push({ x: this.x, y: this.y });

    this.body.drag = this.calculateVelocityAbsolute().normalize().multiply(dragCoefficient, dragCoefficient);

    if (this.body.onWall() || this.body.onFloor()) {
      this.body.angularVelocity = (Math.random() - 0.5) * 500;
    }
  }

  stopDrag () {
    this.body.velocity = this.calculateVelocity();
    let xSpeed = Math.abs(this.body.velocity.x);
    let ySpeed = Math.abs(this.body.velocity.y);
    let threshold = 1000;
    console.log('xSpeed = ' + xSpeed);
    console.log('ySpeed = ' + ySpeed);
    if (xSpeed > threshold || ySpeed > threshold) {

      this.slide.play();
    }
  }

  calculateVelocity () {
    return new Phaser.Point((this.positionArray[1].x - this.positionArray[0].x) * amplitude, (this.positionArray[1].y - this.positionArray[0].y)*amplitude);
  }

  calculateVelocityAbsolute () {
    return new Phaser.Point(Math.abs((this.positionArray[1].x - this.positionArray[0].x) * amplitude), Math.abs((this.positionArray[1].y - this.positionArray[0].y)*amplitude));
  }

  render () {
    game.debug.body(this);
  }

  disappearAnimation (playerID) {
    const tween = this.game.add.tween(this.scale).to({ x: 0, y: 0}, 400, Phaser.Easing.Back.InOut, true);
    const plop = game.add.sprite(this.x, this.y, 'plop');
    console.log(this.x);
    plop.scale.setTo(0.01);
    plop.anchor.setTo(0.5, 0.5);
    const plopTween = this.game.add.tween(plop.scale).to({x: 1, y: 1}, 100);
    const plopTween2 = this.game.add.tween(plop).to({alpha: 0}, 100);
    plopTween.onComplete.add(() => {
      this.pop.volume = 4;
      this.pop.play();
    });
    tween.chain(plopTween, plopTween2);
    tween.onComplete.add(() => {
      game.playerScore[playerID] += 1;
      game.updateScore.dispatch(playerID);
    })
  }
}