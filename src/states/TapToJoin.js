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
    this.createBGs();

    // playerRays
    this.createRays(500, 0.1);

    // playerbuttons
    this.createJoinButtons();

    // playButtons
    this.createPlayButton();
  }
  update () {

  }
  clickedPlay () {
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
  createBGs(){
    const bg = game.add.sprite(0, 0, 'bg');

    bg.width = game.width;
    bg.height = game.height;

    const player1Active = this.game.add.sprite(0, 0, 'yellowPlayer');
    const player2Active = this.game.add.sprite(this.game.width / 2, 0, 'bluePlayer');
    const player3Active = this.game.add.sprite(0, this.game.height / 2, 'greenPlayer');
    const player4Active = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'orangePlayer');

    this.background = [
      player1Active,
      player2Active,
      player3Active,
      player4Active
    ];
  }
  createRays (pSpeed, pRotation) {
    let animationSpeed = pSpeed;
    let rotation = pRotation;

    const player1ray = game.add.sprite(game.width / 2, game.height / 2, 'yellow-player-bg-rays');
    const player2ray = game.add.sprite(game.width / 2, game.height / 2, 'blue-player-bg-rays');
    const player3ray = game.add.sprite(game.width / 2, game.height / 2, 'green-player-bg-rays');
    const player4ray = game.add.sprite(game.width / 2, game.height / 2, 'orange-player-bg-rays');
    player1ray.anchor.setTo(1,1);
    player2ray.anchor.setTo(0,1);
    player3ray.anchor.setTo(1,0);
    player4ray.anchor.setTo(0,0);
    this.p1tween1 = this.game.add.tween(player1ray).to({rotation: rotation}, animationSpeed);
    this.p1tween2 = this.game.add.tween(player1ray).to({rotation: -rotation}, animationSpeed);
    this.p1tween1.start();
    this.p1tween1.chain(this.p1tween2);
    this.p1tween2.chain(this.p1tween1);

    this.p2tween1 = this.game.add.tween(player2ray).to({rotation: rotation}, animationSpeed);
    this.p2tween2 = this.game.add.tween(player2ray).to({rotation: -rotation}, animationSpeed);
    this.p2tween1.start();
    this.p2tween1.chain(this.p2tween2);
    this.p2tween2.chain(this.p2tween1);

    this.p3tween1 = this.game.add.tween(player3ray).to({rotation: rotation}, animationSpeed);
    this.p3tween2 = this.game.add.tween(player3ray).to({rotation: -rotation}, animationSpeed);
    this.p3tween1.start();
    this.p3tween1.chain(this.p3tween2);
    this.p3tween2.chain(this.p3tween1);

    this.p4tween1 = this.game.add.tween(player4ray).to({rotation: rotation}, animationSpeed);
    this.p4tween2 = this.game.add.tween(player4ray).to({rotation: -rotation}, animationSpeed);
    this.p4tween1.start();
    this.p4tween1.chain(this.p4tween2);
    this.p4tween2.chain(this.p4tween1);
  }

  createPlayButton () {
    this.playButtonbg = game.add.sprite(game.width / 2, game.height / 2, 'play-buttonbg');
    this.playButtonbg.anchor.setTo(0.5);
    this.playButton = game.add.sprite(game.width / 2, game.height / 2, 'play-button');
    this.playButton.anchor.setTo(0.5);
    this.playButtonbg.inputEnabled = true;
    this.playButton.inputEnabled = false;
    this.playButton.events.onInputDown.add(() => { this.clickedPlay(); });
    this.playButton.alpha = 0;
    this.playButtonbg.scale.setTo(0.8);
    this.playButton.scale.setTo(0.8);

    // this.playButtonTween1 = this.game.add.tween(this.playButton).to({scale: 1}, 500);
    // this.playButtonTween2 = this.game.add.tween(this.playButton).to({scale: 0.8}, 500);
    // this.playButtonbgTween1 = this.game.add.tween(this.playButtonbg).to({scale: 1}, 500);
    // this.playButtonbgTween2 = this.game.add.tween(this.playButtonbg).to({scale: 0.8}, 500);
    //
    // this.playButtonTween2.start();
    // this.playButtonTween1.chain(this.playButtonTween2);
    // this.playButtonTween2.chain(this.playButtonTween1);
    //
    // this.playButtonbgTween2.start();
    // this.playButtonbgTween1.chain(this.playButtonbgTween2);
    // this.playButtonbgTween2.chain(this.playButtonbgTween1);
  }
  createJoinButtons () {
    const player1 = game.add.sprite(game.width / 2, game.height / 2, 'player-button');
    const player2 = game.add.sprite(game.width, game.height / 2, 'player-button');
    const player3 = game.add.sprite(0, game.height / 2, 'player-button');
    const player4 = game.add.sprite(game.width / 2, game.height / 2, 'player-button');
    this.buttons = [
      player1,
      player2,
      player3,
      player4
    ];
    for (let i = 0; i < this.buttons.length; i += 1) {
      this.background[i].width = game.width / 2;
      this.background[i].height = game.height / 2;
      this.background[i].visible = true;

      if (i < 2) {
        this.buttons[i].width = -(game.width / 2);
        this.buttons[i].height = -(game.height / 2);
      }else{
        this.buttons[i].width = (game.width / 2);
        this.buttons[i].height = (game.height / 2);
      }
      this.buttons[i].inputEnabled = true;
      this.buttons[i].events.onInputDown.add(() => { this.clickedButton(this.buttons[i], i); });
    }
  }
  render () {

  }
}
