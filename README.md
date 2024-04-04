# mind_card_magic_app
node: 18.17.0

## Android
SDK=33.0.2

## TODO:
* 卡片碰到邊界後 會根據原本向量反彈 當垂直碰撞時 會隨機往另一個方向彈
* 需避免卡片在邊角上來回反彈 所以邊角的要特別彈射到中間方向
* 還需要測試手機晃動檢測 讓晃動時可以觸發卡片移動
* 需要加上版本檢查與強制更新機制
* 需讓在移動過程中後 停止三秒 才能蓋卡
* 重構code流程 才能好調整流程的細節

## 重要筆記
* react 需要在 web/package.json 加入 "homepage": "./", 才不會是白畫面
* 在 web/index.js 需加上 等待 deviceready 才 renderReactDom
