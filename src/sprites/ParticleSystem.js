/* globals __DEV__ */
import Phaser from 'phaser';
import Player from '../services/Player';

export default class ParticleSystem {
  constructor (image) {
    this.image = image;
    this.activeEmitter = false;
  }
  //EXPLODE
  //TODO Make amount of images spawn and explode in different directions
  explode (position, pAmount){

  }
  //TODO make image emit from this position to all sides
  createEmitter (xPos, yPos) {
    if (!this.activeEmitter){
      this.emitter = game.add.emitter(xPos, yPos, 20);
      this.emitter.minParticleScale = 0.5;
      this.emitter.maxParticleScale = 1.5;
      this.emitter.makeParticles(this.image);
      this.emitter.gravity = 0;
      this.emitter.minParticleSpeed.setTo(-1500, -1500);
      this.emitter.maxParticleSpeed.setTo(1500, 1500);

      this.emitter.start(false, 1000, 50);
    }
    this.activeEmitter = true;
  }
  destroyEmitter () {
    if (this.activeEmitter) {
      this.emitter.destroy();
    }
    this.activeEmitter = false;
  }
  createStar (position, velocity, time) {

  }
}