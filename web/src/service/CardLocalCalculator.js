

const cardXMarginScale = 0.3;
const cardYMarginScale = 0.15;

export class CardLocalCalculator {
  
  
  
  constructor(tableW, tableH, cardW, cardH) {
    this.tableW = tableW;
    this.tableH = tableH;
    this.cardW = cardW;
    this.cardH = cardH;
  }
  
  getCardXMargin() {
    return this.cardW * cardXMarginScale;
  }
  
  getLeftX() {
    const xBlockW = this.cardW + this.getCardXMargin() + this.cardW + this.getCardXMargin() + this.cardW;
    const midOfXBlockW = xBlockW / 2;

    const midOfTableW = this.tableW / 2;
    return midOfTableW - midOfXBlockW;
  }
  
  getMidX() {
    return this.getLeftX() + this.cardW + this.getCardXMargin();
  }

  getRightX() {
    return this.getMidX() + this.cardW + this.getCardXMargin();
  }

  getCardYMargin() {
    return this.cardH * cardYMarginScale;
  }

  getTopY() {
    const yBlockH = this.cardH + this.getCardYMargin() + this.cardH ;
    const midOfYBlockH = yBlockH / 2;

    const midOfTableH = this.tableH / 2;
    return midOfTableH - midOfYBlockH;
  }

  getBottomY() {
    return this.getTopY() + this.cardH + this.getCardYMargin();
  }
  
  
  
  
}
