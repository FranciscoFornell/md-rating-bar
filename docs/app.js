(function() {
  'use strict';

  angular
    .module('mdRatingBarDemo', ['ngMaterial', 'mdRatingBar'])
    .config(setConfiguration)
    .controller('demoController', demoController);

  setConfiguration.$inject = ['$mdIconProvider', '$compileProvider']

  function setConfiguration ($mdIconProvider, $compileProvider) {
    $compileProvider
      .debugInfoEnabled(false);

    $mdIconProvider
      .defaultIconSet('mdi.svg');
  }

  demoController.$inject = ['$mdDialog', '$mdToast'];

  function demoController($mdDialog, $mdToast) {
    var vm = this;

    vm.showCode = showCode;
    vm.alertUpdateEvent = alertUpdateEvent;

    vm.value = 3;
    vm.examples = {
      default: {
        title: 'Default',
        code: '<md-rating-bar ng-model="vm.value"></md-rating-bar>',
        value: 3
      },
      size: {
        title: 'Different size',
        code: '<md-rating-bar ng-model="vm.value" rb-max="10"></md-rating-bar>',
        value: 5
      },
      colors: {
        title: 'Custom colors',
        code: '<md-rating-bar ng-model="vm.value" rb-bg-color="#9ACBB3" rb-fill-color="#EC4830"></md-rating-bar>',
        value: 3
      },
      character: {
        title: 'Custom character icon',
        code: '<md-rating-bar ng-model="vm.value" rb-character-icon="&#9787"></md-rating-bar>',
        value: 3
      },
      svgIcon: {
        title: 'Material Design custom svg icon',
        code: '<md-rating-bar ng-model="vm.value" rb-md-svg-icon="android"></md-rating-bar>',
        value: 3
      },
      svgSrc: {
        title: 'Custom svg icon from URL',
        code: '<md-rating-bar ng-model="vm.value" rb-md-svg-src="path/to/angular.svg"></md-rating-bar>',
        value: 3
      },
      theme: {
        title: 'Using current theme colors',
        code: '<md-rating-bar ng-model="vm.value" rb-use-md-theme-colors></md-rating-bar>',
        value: 3
      },
      readonly: {
        title: 'Read only',
        code: '<md-rating-bar ng-model="vm.value" rb-readonly></md-rating-bar>',
        value: 3
      },
      updateEvent: {
        title: 'Update event',
        code: '<md-rating-bar ng-model="vm.value" rb-on-update="vm.alertUpdateEvent(vm.value)"></md-rating-bar>',
        value: 3
      },
      iconFont: {
        title: 'Icon font',
        code: '<md-rating-bar ng-model="vm.examples.iconFont.value" rb-md-font-icon="{ fontSet: \'material-icons\', iconName: \'favorite\'}"></md-rating-bar>',
        value: 3
      }
    }

    function showCode(ev, example) {
      $mdDialog.show(
        $mdDialog.alert()
          // .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(example.title)
          .textContent(example.code)
          .ariaLabel('Example code dialog')
          .ok('Close')
          .targetEvent(ev)
      );
    }

    function alertUpdateEvent(value) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Value updated to ' + value + '.')
      );
    }
  }

  
})();