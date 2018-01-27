import Phaser from 'phaser';

export default class Text extends Phaser.Text {
  constructor ({
    text = '', x = 0, y = 0, anchorX = 0, anchorY = 0, fontSize = 20,
    fontName = 'ADAM.CG PRO', fontWeight = 'normal', color = '#000000',
    visible = true, align = 'center', boundsAlignH = 'center', boundsAlignV = 'middle',
    stroke = '#FFFFFF', strokeThickness = 0, inputEnabled = false,
  }) {
    super(game, x, y, text);

    this.autoCull = true
    this.text = text;
    this.game = game;
    this.visible = visible;
    this.setStyle({
      font: `${fontWeight} ${fontSize}pt ${fontName}`,
      fill: color,
      align: align,
      boundsAlignH,
      boundsAlignV,
      stroke,
      strokeThickness,
    });

    this.anchor.setTo(anchorX, anchorY);
    this.inputEnabled = inputEnabled;
  }

  // Move position
  translateText(offsetX, offsetY) {
    this.translateTextX(offsetX);
    this.translateTextY(offsetY);
  }

  // Move position in the x-axis
  translateTextX(offsetX) {
    this.x += offsetX;
  }

  // Move position in the y-axis
  translateTextY(offsetY) {
    this.y += offsetY;
  }

  centerText() {
    this.x += this.width / 2;
    this.y += this.height / 2;
  }
}
