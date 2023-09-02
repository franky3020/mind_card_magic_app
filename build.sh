cd my-app
npm i
npm run build


cd ../cordova-app
rm -rf www
cp -r ../my-app/build ./www
npm i
npx cordova prepare
npx cordova platform rm android --nosave
npx cordova platform add android