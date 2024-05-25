cd web
rm -rf ./node_modules
rm -rf ./build
npm i
npm run build


cd ../cordova-app
rm -rf www
rm -rf platforms
rm -rf plugins
cp -r ../web/build ./www
touch ./www/.gitkeeper
rm -rf ./node_modules
npm i
npx cordova prepare
npx cordova platform rm android --nosave
npx cordova platform add android

npx cordova platform rm ios --nosave
npx cordova platform add ios