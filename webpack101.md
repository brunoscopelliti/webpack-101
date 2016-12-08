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

Introducing webpack-dev-server
---
In order to run the app in a browser, we need before all a web server that
 serves our pages, and resources.

webpack has its own wrapper around the super famous `express` server, that
 is webpack-process-aware, and can initially simplify the setup of a dev
 server.

So let's start by installing `webpack-dev-server` as dev dependency.

```bash
npm i -D webpack-dev-server
```

After that the installation is completed, the `webpack-dev-server` command
 becomes available; from now on, we're going to use it to start our app.
 We've changed our npm scripts configuration; now we've two distinct, and
 indepentent commands to interact with webpack:

```bash
$ npm run
Lifecycle scripts included in webpack-101:
  start
    webpack-dev-server

available via `npm run-script`:
  lint
    eslint app/**
  bundle
    webpack
```

`npm start` creates the bundle, and start the dev server; `npm run bundle`
 simply creates the new bundle.

A crucial information is still missing.
 We've also to update the webpack configuration, with the settings relative
 to the web server.

```js
const config = {
  ...
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'app.js',

    // The publicPath specifies the public URL address of the output files
    // when referenced in a browser.
    // webpack-dev-server also takes a hint from publicPath using it
    // to determine where to serve the output files from
    publicPath: '/assets/'
  },

  devServer: {
    open: true
  }
};
```

In this simple scenario we're relying upon some convenient webpack dev
 server defaults, and just specify explicitly that, when the compilation
 completes, your system default browser should be automatically open.
 A complete list of configuration settings, and more examples could be found
 on [webpack-dev-server documentation][wp-dev-server-doc].

At this point running the `npm start` command, should cause the opening of
 our default web browser on *localhost:8080/* (webpack-dev-server defaults);
 inspecting the devtools console we should see the message "Hello".

Now that we have a simple webpack setup, we'll start give some love to our
 application; we'll diverge for a moment from webpack, and add a bit of
 React.

```bash
git checkout 04-hello-react
```

Hello React
---
React is not the topic of this tutorial.
 However webpack is a tool very popular especially in the React ecosystem.
 Since we're not going to explore webpack in the abstract, building a web
 app using React seems a reasonable choice.

The code of the application won't be too much hard to understand, even if
 you have zero experience with React; however I eventually recommend you
 the following resources as starting point to learn React:

* [React tutorial][ref-react-tutorial]

* Dan Abramov's free course on egghead.io about [Redux][eh-intro-redux] and
 [React + Redux][eh-react-redux] are a great starting point.

###React, and JSX
Initially we keep things simple.
 I included React library directly in HTML document, and interacted with
 the library through the two global variables `React`, and `ReactDOM`.
 This is not the best approach, and soon we'll improve; however for know
 it's better to keep things as much simple as we can. 

One of the characteristic of React is the [jsx sintax][ref-jsx], it uses
 to define the DOM of a component.
 jsx is optional, in the sense that it's possible to write a React app,
 ignoring that jsx even exists; however this approach would require much
 more time, and it's more typo-errors prone.

Here, we're going to use jsx.

However since browsers can't interpret jsx syntax, we now need a `prestart`
 task, that compile the jsx syntax into regular JavaScript.

For the moment we install `react-tools`, that makes available the jsx command,
 and restore the prestart task:

```json
"compile-jsx": "jsx app/ app/ --no-cache-dir --extension jsx",
"prestart": "npm run compile-jsx",
"start": "webpack-dev-server"
```

That's work!
 But... I don't consider this the best possible approach: when we'll need
 to add another precompilation step (think about minification for example)
 our npm scripts section will become too clumsy.

However let's just run the app for now, and if everything is ok, you are
 going to see a blank page with the same message of the previous step.
 In this case it's time to move on:

```bash
git checkout 05-webpack-loaders-intro
```

Loaders
---
In the previous step we installed `react-tools`, and relied on a `prestart`
 task compile jsx syntax into plain JavaScript before the start of the
 webpack web dev server.

As mentioned this solution does not scale pretty well, and that's something 
 webpack can help us with. Hello [loaders][wp-loaders]!

webpack loaders allow you to preprocess files as you require() or "load"
 them. Loaders are kind of like *tasks* are in other build tools, and
 provide a powerful way to handle frontend build steps.
 Loaders can transform files from a different language like, CoffeeScript
 to JavaScript, or inline images as data URLs, and much more.

So let's start by installing a loader able to compile jsx into plain
 JavaScript.

```bash
npm i -S babel-core babel-loader babel-preset-react
```

I've also installed `babel-preset-es2015` that when enabled, instructs
 babel to compile ES2015 syntax into ECMAScript5 compatible JavaScript.

Loaders can be further configured, and at this purpose I also have added
 a [`.babelrc` file][ref-babelrc].
 Our .babelrc is pretty simple; we're just telling babel to use the presets
 we've just installed.

```json
// demo/.babelrc
{ "presets": [ "es2015", "react" ] }
```

To enable the loader we should update the webpack configuration file.

```js
const config = {
  ...
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'app'),
      loader: 'babel-loader'
    }]
  },
}
```

Please note that webpack does not permit anymore to omit the '-loader'
 prefix when using loaders.

How to read the previous snippet?
 All the files contained in the `include` path, which pass the `test`
 clause, will be preprocessed by the `babel` loader, that is able to
 transform jsx syntax into regular JavaScript, and much more.

Before continuing you should note that `rules` is an array, hence multiple
 loaders could easily coexist. Moreover for the same resource the execution 
 of a loader could be immediately chained to another loader:

```js
loaders: 'loaderB!loaderA'
```

In the next steps this feature will be useful.

With the loader configuration in place, I could clean a little the codebase
 removing the now superfluous `react-tools` dependency, and the prestart
 task, cause now webpack handles the precompilation for us.

More info about [webpack loaders configuration][wp-config-module].

In the next step we'll continue talking about loaders, and touch a topic,
 that is somehow advanced; we're going to write our first simple custom
 loader.

```bash
git checkout 06-webpack-custom-loaders
```

Custom Loaders
---
If we inspect the generated bundle, we can note a small defect.
 Each module uses the `"use strict";` pragma two times.

```js
"use strict";
'use strict';

var profile = __webpack_require__(0);
...
```

This is probably a bug of `babel`.
 We can temporarily disable the use-strict transformation from the .babelrc
 file.

```json
"presets": [ 
  [ "es2015", { "modules": false } ],
  "react" 
]
```

However now we have the opposite problem; that is there is no `"use strict";`
 pragma at all.

We're going to fix this issue writing our own webpack custom loader.

###"use strict"; loader
Writing a loader is usually simple as is simple the task it should perform.

So let's start writing our custom loader for a really simple task.
 Our loaders has just to prepend the `use strict` pragma to our modules.

Let's start giving a look to the [webpack loader docs][wp-write-loader].
 We learn that a loader is nothing more than a module that exports a
 function.
 This should not be too much hard to code.

```js
module.exports = function loader(source) {

  // It receives the content of the file that is being loaded
  // as input parameter.

  // It has access to the webpack loader api from its context

  console.log(this); // webpack api


  // It should return a string (or a Buffer),
  // that eventually exports something
  return 'module.exports = 42;';

};
```

Now that we have the backbone of a loader, the only piece still missing
 is the logic that adds the pragma.
 It won't be too much hard to write.

```js
// demo/loaders/use-strict-loader.js
const pragma = JSON.stringify('use strict;')

module.exports = function loader(source) {
  this.cacheable()
  return `${ pragma };\n${ source };`;
}
```

To enable our custom loader, we've just to push it in the webpack loaders
 configuration.

```js
const config = {
  module: {
    rules: [
      ...,
      {
        test: /\.js$/,
        include: appFolder,
        loader: path.resolve(__dirname, 'loaders', 'use-strict-loader')
      }
    ]
  },
}
```

###A custom json loader
Let's consider now another simple task.

Let's say we want a loader to load a json.
 This is something that [webpack can handle autonomously][wp-json-loader],
 but for now let's pretend we've to write it from scratch, and we'll take
 this occasion to add also a feature to the default webpack json loader.

We'll use `JSON.parse`, and `JSON.stringify` for this... so it won't be
 hard.
 To make things a little more interesting let's say we care also about the
 indentation of the generated object; and in the end we would like to
 permit to the final user to customize it.

Lucky for us, loaders accepts querystring-like parameters, that are then
 available in the context of the loader as `this.query`. We can set the
 option in the configuration file:

```js
const config = {
  module: {
    rules: [
      ...
      {
        test: /\.json$/,
        include: appFolder,
        loader: path.resolve(__dirname, 'loaders', 'custom-json-loader'),
        query: "tabSize=2"
      }
    ]
  },
}
```

Back to the code of our loader.

I've also installed `loader-utils`, cause I'm lazy and don't want to write
 my own parse function. That's the final result:

```js
// demo/loaders/custom-json-loader.js
const utils = require('loader-utils');

module.exports = function loader(source) {
  this.cacheable();
  const parsedObject = parseJSON(source);
  const { tabSize } = utils.parseQuery(this.query);
  return `module.exports = ${ JSON.stringify(parsedObject, null, Number(tabSize)) };`;
};
```

And that's it!

Of course, there's more on this topic; I encourage you to read the doc, and
 try yourself when the opportunity arise to write your own loader.
 Another great way to proceed is to take a look at other loaders, [this is a small list][github-wp-loaders].

When you've done we could proceed with the next step.

```bash
git checkout 07-bundling-deps
```

Messing with node_modules
---
It's time to address another of the concerns we've already expressed about
 the status of our current solution.
 Using React through the `React`, and `ReactDOM` global variables it's not
 the best solution; we should import `react` as every other dependencies
 from `node_modules` folder.

webpack can handle this without further configuration; but we need to have
 these dependencies installed.

```bash
npm install -S react react-dom
```

Now we have just to require, or import these dependencies in our app code.

In the future we could take advantage of this also to enable server side
 rendering, and other goodies.

Let's now create a fresh new bundle:

```bash
$ npm run bundle

Hash: 8f1a79849c8ac2674479
Version: webpack 2.1.0-beta.27
Time: 1541ms
 Asset    Size  Chunks             Chunk Names
app.js  726 kB       0  [emitted]  main
  [79] ./app/profile.json 269 bytes {0} [built]
    + 178 hidden modules
```

As expected the size of the bundle is now bigger;
 webpack offers different strategies to fix this issue, and starting from
 the next step we'll tackle this concern.

```bash
git checkout 08-webpack-plugin-intro
```

Intro to webpack plugin
---
webpack permits to extend its behaviour through the use of [plugins][wp-config-plugin]
 which add functionality typically related to bundles in webpack.

Sometimes plugins and loader are confused. The confusion is probably due to
 the fact that both plugins, and loaders are configured in similiar way;
 however they have different purpose. 
 The general rule of thumb I use to distinguish them is that loaders work
 on individual files. Plugins, instead, may work on the whole bundle, and
 perform tasks which affect the whole bundle; they usually access webpack
 internals at a deeper level.
 The [webpack uglify plugin][wp-uglify-plugin] is a perfect example. It
 affects the whole bundle by minimizing it.

Let's try to extend our webpack setup so that it eventually minify the
 produced bundle.

```js
const config = {
  ...
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
```

As also loader's `rules`, `plugins` is an array; so we can eventually add
 more than one plugin for the same bundle.
 This is a [list of webpack's plugin][wp-plugin-list]

Let's create a new bundle with the current setup.
 As expected the new minified bundle is far less heavy than the previous.

```bash
bash-3.2$ npm run bundle

Hash: 8f1a79849c8ac2674479
Version: webpack 2.1.0-beta.27
Time: 3310ms
 Asset    Size  Chunks             Chunk Names
app.js  219 kB       0  [emitted]  main
  [79] ./app/profile.json 269 bytes {0} [built]
    + 178 hidden modules
```

This could still be improved, but before diggin' further in this problem,
 we now have to solve another problem that we have introduced: we've just
 made our code impossible to debug.
 In the next couples of steps we're going to address this problem, and
 solve it.

```bash
git checkout 09-conditionals-config
```

Conditional configuration
---
The first countermeasure we're going to implement to limitate the hassle of
 working with minified sources is to recur to minification only where
 strictly necessary, that is when we run the build for the production
 environment.

This is pretty straightforward to achieve.

```js
const config = {
  ...
  plugins: []
};

if (process.env.NODE_ENV === 'production'){
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      ...
    })
  );
}
```

This is the fist time we've created a branch in our configuration file;
 don't forget that `webpack.config.js` file is a plain, regular JavaScript
 module... and this, and more tricks are permitted.

We've now just to set the `NODE_ENV` environment variable.
 In order to have consistent result across different OS (window/os/linux)
 I am going to install a new dependency, [env-cmd][npm-env-cmd], and update
 the npm scripts section of the `package.json`.

```json
"scripts": {
  "bundle": "env-cmd ./.env.prod webpack",
  "start": "env-cmd ./.env.dev webpack-dev-server"
}
```

That's for sure better that the previous situation, however it's still
 not enough.
 This solution does not cover a couple of important scenarios; for example
 what can we do to improve our experience debugging production code, or
 is there anything we could do to simplify the code inspection of a bundle,
 that even for a such simple app easily reaches 30K LoC?

Sourcemap to the rescue!

```bash
git checkout 10-add-sourcemap
```

Sourcemap
---
The ultimate solution for our problem, it is to make webpack generate not
 only the bundle, but also a sourcemap, that browsers can interpret in
 order to provide us a better source code during the code inspection.

webpack supports different [types of sourcemap][wp-config-devtool]; each
 with its peculiar pros and cons.
 I invite you to checkout them directly on the webpack doc pages, and pick
 the one you prefer.

Here we're going with `cheap-source-map`.

```js
devtool: 'cheap-source-map'
```

Now that we have a reasonable setup, in the next step we're going to work
 more on the front end of the application trying to render the rendered
 pixels less ugly.

```bash
git checkout 11-style-app
```

Style the app
---
Starting for now, and for the next steps, we're going to focus our work
 on improving the look of our application.

As always, we start keeping things simple.
 So let's add some CSS in the most classic way, by adding a `link` tag in
 the document head.

```html
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600'/>
<link rel='stylesheet' href='/assets/stylesheets/main.css'/>
```

The only thing worth nothing here is that the path point to the same 
 `/assets` folder that webpack has configured as `publicPath`.

This works pretty well, and has a tracked record of having worked pretty
 well all the days in the last ~20 yrs.
 However let your natural reluctance for a second at the door and follow me
 in this crazyness... let's try to make webpack responsable also for the
 bundling of the css.

```bash
git checkout 12-webpack-style-app
```

Bundling CSS with webpack
---
Let's start by splitting our CSS.
 We want to distinguish the part that is of general utility, from the rules
 that characterize a `card` component; the latter will be included into a
 `card.css` file stored at the same level of the component.

In order to load these additional rules we've simply to import them, as
 they were a normal JavaScript dependency.

```js
// demo/app/index.js
import './card.css';
```

In order to make this work we have to configure properly webpack, adding a
 couple of custom loaders able to hanlde CSS files.
 For this reason I've installed `css-loader`, and `style-loader`.

```bash
npm i -S css-loader style-loader
```

They perform different operations, but it's often useful to chain them
 together.
 It's possible to chain loader execution using `!`,

```js
loader: 'style-loader!css-loader'
```

With this loader in place, webpack searches for CSS files dependencies
 inside the modules. That is webpack checks to see if any JavaScript file
 has a CSS dependency.
 Each matching dependency is passed as input to `css-loader`, that loads
 the CSS (eventually resolving its own dependencies) into JSON. 
 The result is then passed to `style-loader`, that take the JSON and add
 it to a `<style />` tag in the document head.

So currently the CSS rules we've defined into the `card.css` file end up
 being copy/pasted inside a style tag in the head of the document.
 You may ask how this could be considered an improvement over what we had
 just the commit before this one.
 And you would be right! We're going to address your doubts in one of the
 next steps, but before going to solve the `<style />` problem, let's try
 to understand why I am so convinced that let webpack handle CSS could
 be beneficial in some cases.

```bash
git checkout 13-css-modules
```

CSS Modules
---
Css Modules [[1][ref-css-modules], [2][wild-ref-css-modules]] is a
 technique, or an approach to CSS that reduces the issue that usually we
 have when working with CSS in large codebase, or in large team.

At its core the idea is pretty simple but really powerful, and blink the
 eye to what web component, with shadow-dom, will be one day.

A CSS module is a CSS file in which class names and animation names are
 scoped locally by default, so that it's simply impossible that a rule
 inadvertitely conflicts, or override another one.

This is obtained thanks to a transformation that the original class names
 undergo during the loading, that make them uniques on component basis.

[webpack's css-loader][github-css-loader] supports natively CSS Modules; 
 it's only necessary to enable them via webpack configuration.

```js
loader: 'style-loader!css-loader?modules'
```

... and then start using them.

```js
import cardStyle from './card.css';
<div className={ cardStyle.card }></div>
```

In our case this will produce the following DOM element.

```html
<div class="_2d-vOwCeaxMsdvHR2lIHK0">
  <span class="le2GuhkfBu0rzgJPlpNIa">name:</span>
  <span>Bruno Scopelliti</span>
</div>
```

In the next step we're going to close our excursion in CSS field, and
 finally remove the `<style />` declaration from the document head, by
 moving it into its specific file.

```bash
git checkout 14-extract-css
```

Extract CSS
---
Let's start by installing [extract-text-webpack-plugin][wp-extract-text-plugin].

At this point, we should know how to configure a new webpack plugin.
 In this case the edit affects two different areas of `webpack.config.js`;
 we should add the plugin in the plugins list, but also update the loader
 configuration.

Again I'm branching the configuration;
 I am ok with the fact that CSS is inlined in the head in the dev
 environment, but don't want this to happen in prod.

If we run `npm run bundle` we see that now also a separate `style.css` file
 is created (with its respective source map).

```bash
$ npm run bundle

Hash: 532c71a1a1617e1b2722
Version: webpack 2.1.0-beta.27
Time: 4034ms
                             Asset       Size  Chunks             Chunk Names
                            app.js     219 kB       0  [emitted]  main
    ./assets/stylesheets/style.css  618 bytes       0  [emitted]  main
./assets/stylesheets/style.css.map  132 bytes       0  [emitted]  main
  [79] ./app/profile.json 269 bytes {0} [built]
    + 179 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
```

Time to move on, and add some new features to our app.

```bash
git checkout 15-app-rework
```

[wp-cli]: http://webpack.github.io/docs/cli.html
[ref-iife]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
[ref-closure]: http://stackoverflow.com/questions/111102/how-do-JavaScript-closures-work
[wp-config]: http://webpack.github.io/docs/configuration.html
[wp-dev-server-doc]: https://webpack.github.io/docs/webpack-dev-server.html
[ref-react-tutorial]: https://facebook.github.io/react/tutorial/tutorial.html
[eh-intro-redux]: https://egghead.io/courses/getting-started-with-redux
[eh-react-redux]: https://egghead.io/courses/building-react-applications-with-idiomatic-redux
[ref-jsx]: https://facebook.github.io/react/docs/introducing-jsx.html
[wp-loaders]: https://webpack.github.io/docs/loaders.html
[ref-babelrc]: https://babeljs.io/docs/usage/babelrc/
[wp-config-module]: https://webpack.github.io/docs/configuration.html#module
[wp-json-loader]: https://github.com/webpack/json-loader
[wp-write-loader]: https://webpack.github.io/docs/how-to-write-a-loader.html
[github-wp-loaders]: https://github.com/webpack?utf8=%E2%9C%93&query=loader
[wp-config-plugin]: https://webpack.github.io/docs/configuration.html#plugins
[wp-plugin-list]: https://webpack.github.io/docs/list-of-plugins.html
[wp-uglify-plugin]: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
[npm-env-cmd]: https://www.npmjs.com/package/env-cmd
[wp-config-devtool]: https://webpack.github.io/docs/configuration.html#devtool
[ref-css-modules]: https://github.com/css-modules/css-modules
[wild-ref-css-modules]: https://glenmaddern.com/articles/css-modules
[github-css-loader]: https://github.com/webpack/css-loader
[wp-extract-text-plugin]: https://github.com/webpack/extract-text-webpack-plugin