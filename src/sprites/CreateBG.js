import Phaser from 'phaser';

export default class CreateBG extends Phaser.Group {
  constructor(game) {
    super(game);
    this.game = game;

    const bg = this.game.add.sprite(0, 0, 'bg');

    bg.width = this.game.width;
    bg.height = this.game.height;

    const player1 = this.game.add.sprite(0, 0, 'player-button2');
    const player2 = this.game.add.sprite(this.game.width / 2, 0, 'player-button2');
    const player3 = this.game.add.sprite(0, this.game.height / 2, 'player-button2');
    const player4 = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player-button2');
    const buttons = [
      player1,
      player2,
      player3,
      player4
    ];
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].width = game.width / 2;
      buttons[i].height = game.height / 2;
      if (this.game.players[i].active) {
        buttons[i].visible = false;
      }
    }
  }
}