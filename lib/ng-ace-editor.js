var ace = require('brace');
require('brace/mode/html');
require('brace/mode/json');
require('brace/mode/javascript');
require('brace/theme/monokai');
require('brace/theme/twilight');
require('./style.css');

function ensure(scope, done) {
  if( scope.$$phase == '$apply' || scope.$$phase == '$digest' || scope.$root.$$phase == '$apply' || scope.$root.$$phase == '$digest' ) {
    done(null, scope);
  } else {
    scope.$apply(function() {
      done(null, scope);
    });
  }
}

module.exports = angular.module('ngAceEditor', [])
.directive('ngAceEditor', function() {
  return {
    require: '?ngModel',
    restrict : 'E',
    link : function(scope, element, attrs, ngModel) {
      var el = element[0];
      var lang = attrs.ngLang || 'html';
      var theme = attrs.ngTheme || 'monokai';
      var editornode = document.createElement('div');
      editornode.className = 'ng-ace-editor_editor';
      
      el.appendChild(editornode);
      
      var editor = ace.edit(editornode);
      editor.getSession().setMode('ace/mode/' + lang);
      editor.setTheme('ace/theme/' + theme);
      editor.clearSelection();
      
      ngModel.$render = function() {
        editor.setValue(ngModel.$viewValue || '');
      };
      
      editor.on('change', function() {
        ngModel.$setViewValue(editor.getValue());
      });
      
      el.aceeditor = editor;
    }
  };
});
