/* globals __DEV__ */
import Phaser from 'phaser';
import Player from '../services/Player';

export default class extends Phaser.State {
  init () {
    game.players = []
    for (let i = 0; i < 4; i += 1) {
      game.players.push(new Player(i));
    }
    this.canStart = false;
  }

  preload () {

  }

  create () {
    // background
    const bg = game.add.sprite(0, 0, 'bg');

    bg.width = game.width;
    bg.height = game.height;

    // playerbuttons
    const player1 = game.add.sprite(0, 0, 'player-button');
    const player2 = game.add.sprite(game.width / 2, 0, 'player-button');
    const player3 = game.add.sprite(0, game.height / 2, 'player-button');
    const player4 = game.add.sprite(game.width / 2, game.height / 2, 'player-button');
    const buttons = [
      player1,
      player2,
      player3,
      player4
    ];
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].width = game.width / 2;
      buttons[i].height = game.height / 2;
      buttons[i].inputEnabled = true;
      buttons[i].events.onInputDown.add(() => { this.clickedButton(buttons[i], i); });
    }
    // playButtons
    this.playButton = game.add.sprite(game.width / 2, game.height / 2, 'play-button');
    this.playButton.anchor.setTo(0.5);
    this.playButton.inputEnabled = false;
    this.playButton.events.onInputDown.add(() => { this.clickedPlay(); });
    this.playButton.alpha = 0;
  }
  update () {

  }
  clickedPlay () {
    console.log('play');
    game.state.start('Game');
  }
  clickedButton (image, id) {
    if (image.alpha > 0.5) {
      game.players[id].setActive();
      image.alpha = 0.01;
    } else {
      image.alpha = 1;
      game.players[id].setActive(false);
    }

    let amountOfPlayers = 0;
    for (let i = 0; i < game.players.length; i += 1) {
      if (game.players[i].active) {
        amountOfPlayers += 1;
      }
      if (amountOfPlayers > 2) {
        this.canStart = true;
        this.playButton.alpha = 1;
        this.playButton.inputEnabled = true;
      } else {
        this.playButton.alpha = 0;
        this.playButton.inputEnabled = false;
      }
    }
  }

  render () {

  }
}
