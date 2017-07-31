# VueCoreAuthenticator

[![npm](https://img.shields.io/npm/v/vue-core-authenticator.svg)](https://www.npmjs.com/package/vue-core-authenticator) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Vue plugin for deveo core authentication

## Installation

```bash
npm install --save vue-core-authenticator
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueCoreAuthenticator from 'vue-core-authenticator'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-core-authenticator/dist/vue-core-authenticator.css'

Vue.use(VueCoreAuthenticator)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="vue-core-authenticator/dist/vue-core-authenticator.css"></link>
<script src="vue-core-authenticator/dist/vue-core-authenticator.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/vue-core-authenticator/dist/vue-core-authenticator.css"></link>
<script src="https://unpkg.com/vue-core-authenticator"></script>
```

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
