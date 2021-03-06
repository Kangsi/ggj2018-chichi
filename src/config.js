import Phaser from 'phaser';

export default {
  width: 1280,
  height: 960,
  parent: 'gameWrapper',
  scaleMode: Phaser.ScaleManager.EXACT_FIT,
  renderer: Phaser.CANVAS,
  fullScreenScaleMode: Phaser.ScaleManager.NO_SCALE,
  transparent: false,
  antialias: false,
};
/*
Globals:
  game.players
 */
