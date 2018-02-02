# ng-ace-editor

## Install
```sh
$ npm i ng-ace-editor --save
```

```js
require('ng-ace-editor');
angular.module('app', ['ngAceEditor'])...
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-beautify.js"></script>
<ng-ace-editor style="height:300px;" ng-model="model" ng-lang="json" ng-theme="twilight"></ng-ace-editor>
```