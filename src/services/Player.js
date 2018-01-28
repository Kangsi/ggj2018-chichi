export default class Player {
  constructor (id, imageKey, rayKey) {
    this.id = id;
    this.active = false;
    this.itemList = []; //image key
    this.scoreList = []; //amount of items collected
    this.backgroundImage = imageKey;
    this.rayImage = rayKey;
  }

  addScore (score, item) {
    this.scoreList.push(score);
    this.itemList.push(item);
  }

  setActive (active = true) {
    this.active = active;
  }

  finalScore () {
    return this.scoreList.reduce((a, b) => a + b, 0);
  }
}