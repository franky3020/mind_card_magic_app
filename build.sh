cd web
npm i
npm run build


cd ../cordova-app
rm -rf www
cp -r ../web/build ./www
touch ./www/.gitkeeper
npm i
npx cordova prepare
npx cordova platform rm android --nosave
npx cordova platform add android

npx cordova platform rm ios --nosave
npx cordova platform add ios