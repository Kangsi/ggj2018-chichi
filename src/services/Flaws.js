export default class Flaws {
  constructor () {
    this.step = 0;

    this.maxQuestion = 5;

    this.questionsList = [];
    this.imageList = [];
  }

  addInfo (question, image) {
    this.questionsList.push(question);
    this.imageList.push(image);
    console.log(this.questionsList, this.imageList);
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
}