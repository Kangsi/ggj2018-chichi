export default class Flaws {
  constructor () {
    this.step = 0;

    this.maxQuestion = 4;

    this.isAsked = [];
    this.questionsList = [];
    this.imageList = [];
  }

  addInfo (question, image) {
    this.questionsList.push(question);
    this.imageList.push(image);
    this.isAsked.push(false);
  }

  getFlaw () {
    let random = Math.floor(Math.random() * this.questionsList.length);
    while (this.isAsked[random]) {
      if (random < this.isAsked.length) {
        random += 1;
      } else {
        random = 0;
      }
    }
    this.isAsked[random] = true;
    const thisQuestion = this.questionsList[random];
    const thisImage = this.imageList[random];
    this.step += 1;
    return { question: thisQuestion, image: thisImage };


  }

  reset () {
    this.step = 0;
    this.isAsked = [];
  }

  checkIfDone () {
    return this.step >= this.maxQuestion;
  }
}