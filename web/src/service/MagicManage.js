
class _MagicManage {

  constructor() {
    this.tableCardMaxZindex = 0;
    this.cardNumberArray = [];
  }

  showState() {
    console.log("this.cardNumberArray", this.cardNumberArray);
    console.log("this.tableCardMaxZindex", this.tableCardMaxZindex);
  }

  init() {
    this.tableCardMaxZindex = 0;
    this.cardNumberArray = [];
  }

  addHideCard(cardNumber) {
    if (this.cardNumberArray.includes(cardNumber) === false) {
      this.cardNumberArray.push(cardNumber);
    }
  }

  subHideCard(cardNumber) {
    if (this.cardNumberArray.includes(cardNumber)) {
      let indexRemove = this.cardNumberArray.indexOf(cardNumber);
      this.cardNumberArray = this.cardNumberArray.slice(indexRemove, 1);
    }
  }

  isAllCardFold() {
    return this.cardNumberArray.length === 6;
  }

  addTableCardMaxZindex() {
    this.tableCardMaxZindex++;
  }
}

const MagicManage = new _MagicManage();
export default MagicManage;
