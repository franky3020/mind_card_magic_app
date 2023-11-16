
class _MagicManage {
  
  constructor() {
    this.countHideCard = 0;
  }
  addHideCard() {
    this.countHideCard++;
  }

  subHideCard() {
    this.countHideCard--;
  }
}

const MagicManage = new _MagicManage();
export default MagicManage;
