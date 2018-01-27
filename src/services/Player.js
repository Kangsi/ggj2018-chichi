export default class Player {
  constructor (id) {
    this.id = id;
    this.active = false;
    this.itemList = []; //image key
    this.scoreList = []; //amount of items collected
  }

  addScore (score, item) {
    this.scoreList.push(score);
    this.itemList.push(item);
  }

  setActive (active = true) {
    this.active = active;
  }
}