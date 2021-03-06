
# purescript-ractive

**RactiveJS bindings for PureScript**

Based on the original sources from <a href="https://github.com/AitorATuin/purescript-ractive" target="_blank">Aitor P. Iturri</a>

This version is compatible with **psc 0.9.3**.

The original Grunt mechanics were replaced by Gulp/WebPack.

For quick testing a <a href="https://github.com/brakmic/purescript-ractive/blob/master/demo/scripts/app.purs">small demo app</a> with detailed comments is available.

### Screenshot
<img src="http://fs5.directupload.net/images/160108/v6ohn28m.png" width="741" height="547">

My <a href="http://blog.brakmic.com/webapps-with-purescript-and-ractivejs/" target="_blank">article</a> on using PureScript with RactiveJS.

### All of the APIs from RactiveJS v0.7.3 are supported

- <a href="http://docs.ractivejs.org/latest/ractive-add" target="_blank">add</a>
- <a href="http://docs.ractivejs.org/latest/ractive-animate" target="_blank">animate</a>
- <a href="http://docs.ractivejs.org/latest/ractive-detach" target="_blank">detach</a>
- <a href="http://docs.ractivejs.org/latest/ractive-extend" target="_blank">extend</a>
- <a href="http://docs.ractivejs.org/latest/ractive-find" target="_blank">find</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findall" target="_blank">findAll</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findallcomponents" target="_blank">findAllComponents</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findcomponent" target="_blank">findComponent</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findcontainer" target="_blank">findContainer</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findparent" target="_blank">findParent</a>
- <a href="http://docs.ractivejs.org/latest/ractive-fire" target="_blank">fire</a>
- <a href="http://docs.ractivejs.org/latest/ractive-get" target="_blank">get</a>
- <a href="http://docs.ractivejs.org/latest/ractive-insert" target="_blank">insert</a>
- <a href="http://docs.ractivejs.org/latest/ractive-observe" target="_blank">observe</a>
- <a href="http://docs.ractivejs.org/latest/ractive-observeonce" target="_blank">observeOnce</a>
- <a href="http://docs.ractivejs.org/latest/ractive-off" target="_blank">off</a>
- <a href="http://docs.ractivejs.org/latest/ractive-on" target="_blank">on</a>
- <a href="http://docs.ractivejs.org/latest/ractive-pop" target="_blank">pop</a>
- <a href="http://docs.ractivejs.org/latest/ractive-push" target="_blank">push</a>
- <a href="http://docs.ractivejs.org/latest/ractive-render" target="_blank">render</a>
- <a href="http://docs.ractivejs.org/latest/ractive-reset" target="_blank">reset</a>
- <a href="http://docs.ractivejs.org/latest/ractive-resetpartial" target="_blank">resetPartial</a>
- <a href="http://docs.ractivejs.org/latest/ractive-set" target="_blank">set</a>
- <a href="http://docs.ractivejs.org/latest/ractive-shift" target="_blank">shift</a>
- <a href="http://docs.ractivejs.org/latest/ractive-subtract" target="_blank">subtract</a>
- <a href="http://docs.ractivejs.org/latest/ractive-splice" target="_blank">splice</a>
- <a href="http://docs.ractivejs.org/latest/ractive-teardown" target="_blank">teardown</a>
- <a href="http://docs.ractivejs.org/latest/ractive-toggle" target="_blank">toggle</a>
- <a href="http://docs.ractivejs.org/latest/ractive-tohtml" target="_blank">toHTML</a>
- <a href="http://docs.ractivejs.org/latest/ractive-unrender" target="_blank">unrender</a>
- <a href="http://docs.ractivejs.org/latest/ractive-unshift" target="_blank">unshift</a>
- <a href="http://docs.ractivejs.org/latest/ractive-update" target="_blank">update</a>
- <a href="http://docs.ractivejs.org/latest/ractive-updatemodel" target="_blank">updateModel</a>

### Component Support

Creation of RactiveJS <a href="http://docs.ractivejs.org/latest/components" target="_blank">Components</a> is supported via the `extend` API. Read the <a href="https://github.com/brakmic/purescript-ractive/blob/master/tutorials/COMPONENTS.md">Tutorial</a> for more info.

### Future planning

Follow the development of RactiveJS and continuously update the bindings.

### Building the Bindings

```
npm install [initial build only]
bower update [initial build only]
gulp
```

### Building the Demo

```
gulp make-demo [initial build only]
gulp build-demo
open index.html from subdir demo
```

Or use HapiJS
```
npm start  [will load index.js from subdir demo]
```

### Testing

```shell
pulp test
```

<a href="https://github.com/purescript/purescript-quickcheck" target="_blank">QuickCheck</a> is used for property-based testing while <a href="https://github.com/tmpvar/jsdom" target="_blank">JSDOM</a> is for headless testing of RactiveJS-APIs.

<img src="http://fs5.directupload.net/images/160205/9lbb94kn.png">

### License

<a href="https://github.com/brakmic/purescript-ractive/blob/master/LICENSE">MIT</a>
