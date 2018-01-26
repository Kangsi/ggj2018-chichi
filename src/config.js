import Phaser from 'phaser';

export default {
  width: 720,
  height: 1280,
  parent: 'gameWrapper',
  scaleMode: Phaser.ScaleManager.EXACT_FIT,
  renderer: Phaser.CANVAS,
  fullScreenScaleMode: Phaser.ScaleManager.NO_SCALE,
  transparent: false,
  antialias: false,
};
