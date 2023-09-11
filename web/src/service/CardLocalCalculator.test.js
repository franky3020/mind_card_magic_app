import {CardLocalCalculator} from "./CardLocalCalculator";



test('getLeftX and getMidX', () => {
  const cardW = 50;
  const cardLocalCalculator = new CardLocalCalculator(600, 200, cardW, 50 * 1.4);
  const leftX = cardLocalCalculator.getLeftX();
  const midX = cardLocalCalculator.getMidX();
  
  expect(midX - leftX).toBe(cardLocalCalculator.getCardXMargin() + cardW);
});
