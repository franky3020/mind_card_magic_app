
class _MagicManage {
  
  constructor() {
    this.countHideCard = 0;
    this.isHideCardMode = false;
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
}

const MagicManage = new _MagicManage();
export default MagicManage;
