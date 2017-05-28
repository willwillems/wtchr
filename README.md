![Alt text](http://i.imgur.com/ZSgdWfm.jpg)

[![Build Status](https://travis-ci.org/NickolasBoyer/wtchr.svg?branch=master)](https://travis-ci.org/NickolasBoyer/wtchr)

Manage and download your shows using your TheTVDB account. This application does not collect any of your data, has no connection to any servers except for the TheTVDB requests when accessing its API and the scraping of ThePirateBay. This application is very privacy focused and works completely stand-alone.

![Alt text](http://i.imgur.com/5zUJew0.png)

## 💻 Using WTCHR
How to use:
- If you do not already have one, get an account with [TheTVDB](https://www.thetvdb.com)
- Get an API-key from TheTVDB [here](http://thetvdb.com/?tab=apiregister)
- Fire up the application and fill in your login details in the login tab.

## 🔧 Technologies Used
- [Vue.js](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex/)
- [Vue-router](https://github.com/vuejs/vue-router)
- [Electron](https://github.com/electron/electron)
- [LocalForage](https://github.com/localForage/localForage)
- [Cheerio](https://github.com/cheeriojs/cheerio)

## 🙌 Contributing
Currently the project is still in its infancy phase, if you have ideas, suggestions or anything else do not hesitate to open an issue. Every form of help is more than welcome!

But please do not file large Pull request with multiple file modifications out of the blue without any context.

## 📝 TODO
- [ ] Improve the styling of the "refresh" and "login" button
- [ ] Design tutorial for first time using the application
- [ ] Give user more feedback with error messages, console is currently needed if anything goes wrong
- [ ] Write more tests

## ⚙️ Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
yarn run dev

# build electron app for production
yarn run build

# lint all JS/Vue component files in `app/src`
yarn run lint

# run webpack in production
yarn run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

## License

MIT License

Copyright (c) 2017 Rutger Willems

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
