require('./style.css');

module.exports = angular.module('ngAceEditor', [])
.directive('ngAceEditor', function() {
  return {
    require: '?ngModel',
    restrict : 'E',
    link : function(scope, element, attrs, ngModel) {
      if( !('ace' in window) ) return console.warn('[ng-ace-editor] not found window.ace, follow the guide: https://ace.c9.io/#nav=embedding');
      
      var el = element[0];
      var lang = attrs.ngLang || 'html';
      var theme = attrs.ngTheme || 'monokai';
      var readonly = function() {
        return el.hasAttribute('readonly') && el.getAttribute('readonly') !== 'false';
      };
      var editornode = document.createElement('div');
      editornode.className = 'ng-ace-editor_editor';
      
      el.appendChild(editornode);
      
      var editor = ace.edit(editornode);
      editor.getSession().setMode('ace/mode/' + lang);
      editor.setTheme('ace/theme/' + theme);
      editor.clearSelection();
      editor.setReadOnly(readonly());
      
      ngModel.$render = function() {
        editor.setReadOnly(readonly());
        editor.setValue(ngModel.$viewValue || '');
      };
      
      editor.on('change', function() {
        ngModel.$setViewValue(editor.getValue());
      });
      
      el.aceeditor = editor;
      
      scope.$on('$destroy', function() {
        editor && editor.destroy();
      });
    }
  };
});
