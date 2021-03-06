# Plone Vue

[![Build Status](https://travis-ci.org/bierik/plone-vuejs.svg?branch=master)](https://travis-ci.org/bierik/plone-vuejs)

> A simple [Vue.js](https://vuejs.org/) SDK to build web sites easily on top of the [plone.restapi](https://github.com/plone/plone.restapi).

## Prerequests

- [Yarn](https://yarnpkg.com/lang/en/docs/install/)
- Google Chrome >= 59 for e2e testing

## Usage

Install the dependency in your project:

``` bash
yarn add plone-vue
```

Install the `Traverser` plugin in your `main.js`:

```javascript
import Traverser from 'plone-vue';

Vue.use(Traverser);
```

Define views and configure the backend:

```javascript
import Folder from '@/components/Folder';

var app = new Vue({
  el: '#app',
  traverser: {
    views: [
      {
        type: 'Folder',
        view: 'view',
        component: Folder,
      },
    ],
    options: {
      apiRoot: 'http://localhost:8090/api',
      ploneRoot: 'plone',
    },
  }
});
```

Define the vuejs component.

```html
<template>
  <section id="folder">
    <h1>{{context.title}}</h1>
    <ul>
      <li v-for="item in context.items" :key="item['@id']"><traverser-link :item="item" :class="item.title">{{item.title}}</traverser-link></li>
    </ul>
  </section>
</template>
<script>
import { basecomponent } from 'plone-vue';

export default {
  name: 'folder',
  mixins: [basecomponent],
};
</script>
```

In the component you will receive a context provided through a property. The context contains all data fetched from the plone.
Notice the import of the `basecomponent`. The basecomponent needs to be attached to your component as a mixin so the context property is available.

Use the `<traverser-view>` component to define where vuejs renders the output (usually `App.vue`).

```html
<template>
  <traverser-view></traverser-view>
</template>
<script>
export default {
  name: 'app',
};
</script>
```

### traverse programmatically

Every vue instance is able to traverse to a item containing an id.
```html
<template>
  <button @click="traverse(item)">Traverse</button>
</template>
```

### onTraverse hook

Every component is able to fetch additional content by defining an `onTraverse` hook. So every time the router is hitting this component the traverser fetches this additional content and pops it on the context. The URL is always relative to the current components path and can be defined by calling the `next` callback.
So the following example shows how to fetch additional content when traversing to the `document` component. The `next('@sharing')` triggers the traverser to fetch additional content under `/document/@sharing`. The data is then available in the template using `{{context['@sharing'].title}}`.

``` html
<template>
  <section id="document">
    <h1>{{context.title}}</h1>
    <p id="sharing">{{context['@sharing'].title}}</p>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'document',
  onTraverse(from, to, next) { next('@sharing'); },
};
</script>
```

## Component lookup

The component lookup is configured by passing a `views` list to the vue instance.
The default view is defined as `@view`.

So in the following example a request for `/folder` will resolve the `FolderViewComponent` and a request for `/folder/@edit` will resolve to `FolderEditComponent`.
``` javascript
const views = [
  { type: 'Folder', component: { name: 'FolderViewComponent' } },
  { view: 'edit', type: 'Folder', component: { name: 'FolderEditComponent' } },
];
```

It is not possible to define the same view for the same type. So the following configuration will throw an error when trying to resolve `/folder/@edit`.
``` javascript
const views = [
  { view: 'edit', type: 'Folder', component: { name: 'FolderViewComponent' } },
  { view: 'edit', type: 'Folder', component: { name: 'FolderEditComponent' } },
];
```

Also multple default views is not working. So the following configuration will also throw an error when trying to resolve `/folder`.
``` javascript
const views = [
  { type: 'Folder', component: { name: 'FolderViewComponent' } },
  { type: 'Folder', component: { name: 'FolderEditComponent' } },
];
```

See `/src` for a full working example.

## Developing

This section will show you how you setup the development environment and make the tests running.

### Installing

Clone the project:

```bash
git clone git@github.com:bierik/plone-vuejs.git
```

Install the dependencies:

```bash
cd plone-vuejs
yarn install
```

Running the development server:

This command will start a webpack development server with HMR and a simple express mock server.

```bash
yarn dev
```

Open the browser under [http://localhost:8090](http://localhost:8090)

# Testing

This section will show you how run e2e- and unittests.

## Unit tests

Run the tests once:

```bash
yarn unit
```

Run the tests with a watcher (best for development purposes):

```
yarn unit-dev
```

All unit tests are sitting under `/test/unit/tets`. They are executed using [jest](http://facebook.github.io/jest/).

## E2E Test

Run the e2e tests:

```bash
yarn e2e
```

For e2e tests we use chrome headless and [puppeteer](https://github.com/GoogleChrome/puppeteer) to remotely control the browser.
The tests are executed using [jest](http://facebook.github.io/jest/).

A test- and mockserver are running when the tests are executed.

All e2e tests are sitting under `/test/e2e/tests`.
And the mocks are under `/test/e2e/mocks`. See the documentation of the [mock-server](https://github.com/smollweide/node-mock-server) we use for more information about how to add more mock data.

### Coding Styles

We use the [Airbnb](https://github.com/airbnb/javascript) Code styles.
To make sure the coding style is not violated we use [eslint](https://eslint.org/).

## Built With

* [axios](https://github.com/axios/axios) - HTTP client

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This project was highly inspired by the [angular-traversal](https://github.com/makinacorpus/angular-traversal) project.
