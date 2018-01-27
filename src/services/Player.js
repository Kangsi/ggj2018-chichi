export default class Player {
  constructor (id) {
    this.id = id;
    this.active = false;
    this.scoreList = [];
    this.itemList = [];
  }

  addScore (score, item) {
    this.scoreList.push(score);
    this.itemList.push(item);
  }

  setActive (active = true) {
    this.active = active;
  }
}