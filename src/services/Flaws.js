export default class Flaws {
  constructor () {
    this.step = 0;

    this.maxQuestion = 1;

    this.questionsList = [];
    this.imageList = [];
  }

  addInfo (question, image) {
    this.questionsList.push(question);
    this.imageList.push(image);
  }

  getFlaw () {
    const thisQuestion = this.questionsList[this.step];
    const thisImage = this.imageList[this.step];
    this.step += 1;
    return { question: thisQuestion, image: thisImage };
  }

  reset () {
    this.step = 0;
  }

  checkIfDone () {
    return this.step >= this.maxQuestion;
  }
}