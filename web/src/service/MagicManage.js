
class _MagicManage {
  
  constructor() {
    this.countHideCard = 0;
    this.isHideCardMode = false;
    this.tableCardMaxZindex = 0;
  }
  addHideCard() {
    this.countHideCard++;
  }

  subHideCard() {
    this.countHideCard--;
  }

  openHideCardMode() {
    this.isHideCardMode = true;
    this.subHideCard();
  }

  closeHideCardMode() {
    this.isHideCardMode = false;
  }

  addTableCardMaxZindex() {
    this.tableCardMaxZindex++;
  }
}

const MagicManage = new _MagicManage();
export default MagicManage;
