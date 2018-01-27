import Phaser from 'phaser'
import Sprite from '../services/Sprite';

const dragCoefficient = 4000;
const amplitude = 20;

export default class Ball extends Sprite {
  constructor({ asset, x, y, frame, anchorX = 0, anchorY = 0, inputEnabled = true }) {
    super({ asset, x, y, frame, anchorX, anchorY, inputEnabled});

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.angularDrag = 200;
    this.body.allowRotation = true;
    this.body.bounce.set(0.5);
    this.body.setCircle(this.width / 2);
    this.body.drag = new Phaser.Point(4000, 4000)
    this.inputEnabled = true;
    this.input.enableDrag();
    this.positionArray = [
      {x: 0, y: 0},
      {x: 0, y: 0}
    ];




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
    tween.onComplete.add(() => {
      game.playerScore[playerID] += 1;
      game.updateScore.dispatch(playerID);
    })
  }
}