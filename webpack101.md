webpack 101
===

Install webpack
---
We're going to code our application inside the `./demo` folder.

We've already created a new npm project, and we're going to install webpack.

Since the development of webpack 2 is now completed, we'll use the latest
 beta release; currently it is `v2.1.0-beta.27`.

```bash
npm i -S webpack@v2.1.0-beta.27
```

Explore webpack-cli
---
After that the installation is completed, the `webpack` command becomes
 available from the app root folder.
 It could be used directly to make a bundle of our application.

The command syntax is pretty straightforward:

```bash
webpack <entry> <output>
```

...and in our case it becomes:

```bash
webpack app/index.js bundle/app.js
```

We run this command to create our first bundle.

[webpack-cli][wp-cli] accepts also other parameters; however configuring
 wepback via cli arguments is not a great approach.
 Soon we'll introduce a better alternative.

###Output info
Let's focus our attention on the output of the `webpack` command.

```bash
$ webpack app/index.js bundle/app.js
Hash: cf888ae3fb56b5ac660a
Version: webpack 2.1.0-beta.27
Time: 58ms
 Asset     Size  Chunks             Chunk Names
app.js  2.83 kB       0  [emitted]  main
   [0] ./app/profile.js 259 bytes {0} [built]
   [1] ./app/index.js 59 bytes {0} [built]
```

Usually the two most important things you want to track here are the bundle
 time (nobody likes to wait too much) and the size/content of the bundle.

In this case we see that webpack has created a new `app.js` file, bundling
 together `./app/profile.js`, and `./app/index.js`.
 When the app will grow, also the output will become more messy, but the
 important sections won't change too much.

###What's in the bundle?
Before going further I encourage you to give a look at the bundle we have
 just created. webpack does not use magic tricks, but just JavaScript code
 that you should be able to understand. 
 
Hardly in the future you will have a bundle simpler of this one; so it's
 the perfect moment to copy/paste the code in your devtools console of
 choice and just debug it.
 Despite the strange names, and the comments used to indent the code you'll
 be surprised by its simplicity.

```js
/******/ (function(modules) { // webpackBootstrap

/******/ 	// this is just a courtesy :)
/******/ 	debugger;

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = {
  name: 'Bruno Scopelliti',
  avatar: 'https://avatars3.githubusercontent.com/u/3489757',
  email: 'me@brunoscopelliti.com',
  location: 'Bologna, Italy',
  bio: 'Husband & Dad. Web Developer & Blogger. Soccer-lover & Risiko Strategist.'
}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

const profile = __webpack_require__(0)

console.log(profile)


/***/ }
/******/ ]);
```

If you still have troubles understanding what's going on (and have serious
 intentions about learning JavaScript) you'd better give a look at what an
 [IIFE][ref-iife] is, and how [closures][ref-closure] work in JavaScript.

###Configure "npm scripts"
Finally, in order to have a fast way to run the app, I've also configured
 in the `package.json`, the npm scripts for the most common commands we're
 going to use.

```json
// demo/package.json
"scripts": {
  "prestart": "webpack app/index.js bundle/app.js",
  "start": "node bundle/app"
}
```

Now to run our bundled application, we just need to run `npm start`. That's
 enough for our first bundle!

###Let's recap
In this first step we've installed webpack, and created our first bundle
 using the webpack command line interface.
 This approach however does not scale really well with the complexity of
 the application; for this reason webpack could also be configured through
 a configuration file.

Let's checkout to the next branch to learn how to configure webpack.

```bash
git checkout 02-webpack-config
```

Hello webpack.config.js
---
When we execute the `webpack` command without further arguments, webpack
 expects to find in the execution path the `webpack.config.js` file, that
 *exports* the configuration settings.

You may sometimes wish to have different webpack configuration files in
 the same project, and use one, or another depending on different factors
 (for example the environment for which the build is performed).
 In order to handle this use case the cli also accepts a `config` flag
 through which it is possible to specify what configuration webpack should
 load.

```bash
webpack --config webpack.config.js
# or simply
webpack
```

Time to add the configuration file.

The most important thing to note is that `webpack.config.js` is a real
 JavaScript module. You could do everything you want in this file; the only
 things which matter are that it's valid JavaScript, and that it exports
 an object coherent with the [webpack configuration interface][wp-config].

So let's create our configuration file; currently, I just want to replicate
 the previous bundle, using the configuration file.

```js
// demo/webpack.config.js
module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'app.js'
  }
}
```

That's enough!

Since we've created this configuration file, in the next steps will be much
 more easier to forge webpack behaviour to our will.
 In the next step we'll add another essential block: we're going to run
 our application in a browser.

```bash
git checkout 03-webpack-dev-server
```

[wp-cli]: http://webpack.github.io/docs/cli.html
[ref-iife]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
[ref-closure]: http://stackoverflow.com/questions/111102/how-do-JavaScript-closures-work
[wp-config]: http://webpack.github.io/docs/configuration.html