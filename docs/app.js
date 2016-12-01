(function() {
  'use strict';

  angular
    .module('mdRatingBarDemo', ['ngMaterial', 'mdRatingBar'])
    .config(function($mdIconProvider) {
      $mdIconProvider
        .defaultIconSet('mdi.svg');
    })
    .controller('demoController', demoController);

  demoController.$inject = ['$mdDialog'];

  function demoController($mdDialog) {
    var vm = this;

    vm.showCode = showCode;

    vm.value = 3;
    vm.examples = {
      default: {
        title: 'Default',
        code: '<md-rating-bar ng-model="vm.value"></md-rating-bar>'
      },
      size: {
        title: 'Different size',
        code: '<md-rating-bar ng-model="vm.value" rb-max="10"></md-rating-bar>'
      },
      colors: {
        title: 'Custom colors',
        code: '<md-rating-bar ng-model="vm.value" rb-bg-color="#9ACBB3" rb-fill-color="#EC4830"></md-rating-bar>'
      },
      character: {
        title: 'Custom character icon',
        code: '<md-rating-bar ng-model="vm.value" rb-character-icon="&#9787"></md-rating-bar>'
      },
      svgStar: {
        title: 'Material Design svg star',
        code: '<md-rating-bar ng-model="vm.value" rb-md-svg-icon="star"></md-rating-bar>'
      },
      svgIcon: {
        title: 'Material Design custom svg icon',
        code: '<md-rating-bar ng-model="vm.value" rb-md-svg-icon="android"></md-rating-bar>'
      },
      theme: {
        title: 'Using current theme colors',
        code: '<md-rating-bar ng-model="vm.value" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>'
      },
      readonly: {
        title: 'Read only',
        code: '<md-rating-bar ng-model="vm.value" rb-md-svg-icon="star" rb-readonly></md-rating-bar>'
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
  }

  
})();