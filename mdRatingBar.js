(function() {
  'use strict';

  angular
    .module('mdRatingBar', [])
    .directive('mdRatingBar', mdRatingBar);

  mdRatingBar.$inject = ['$timeout', '$compile'];function mdRatingBar($timeout, $compile) {
    var directive = {
      restrict: 'E',
      scope: {
        ratingValue: '=ngModel',
        rbMax: '=?', // optional (default is 5)
        rbOnUpdate: '&?',
        rbBgColor: '@?',
        rbFillColor: '@?',
        rbCharacterIcon: '@?',
        rbMdSvgIcon: '@?',
        rbMdSvgSrc: '@?'
      },
      link: linkFn
    };

    return directive;

    function linkFn(scope, element, attributes) {
      var isReadonly = attributes.hasOwnProperty('rbReadonly'),
        useMdThemeColors = attributes.hasOwnProperty('rbUseMdThemeColors'),
        templates = {
          defaultSize:
            '<ul class="md-rating-bar"'+ generateAttr('cursor') + '>' +
              '<li' + generateAttr('click', 0) + '>' +
                '<span ' + generateAttr('color', 0) + ' ng-if="!(rbMdSvgIcon||rbMdSvgSrc)">{{rbCharacterIcon}}</span>' +
                '<md-icon ' + generateAttr('color', 0) + ' ng-if="rbMdSvgIcon" md-svg-icon="{{rbMdSvgIcon}}" aria-label="Rating Bar Icon"></md-icon>' +
                '<md-icon ' + generateAttr('color', 0) + ' ng-if="rbMdSvgSrc" md-svg-src="{{rbMdSvgSrc}}" aria-label="Rating Bar Icon"></md-icon>' +
              '</li>' +
              '<li' + generateAttr('click', 1) + '>' +
                '<span ' + generateAttr('color', 1) + ' ng-if="!(rbMdSvgIcon||rbMdSvgSrc)">{{rbCharacterIcon}}</span>' +
                '<md-icon ' + generateAttr('color', 1) + ' ng-if="rbMdSvgIcon" md-svg-icon="{{rbMdSvgIcon}}" aria-label="Rating Bar Icon"></md-icon>' +
                '<md-icon ' + generateAttr('color', 1) + ' ng-if="rbMdSvgSrc" md-svg-src="{{rbMdSvgSrc}}" aria-label="Rating Bar Icon"></md-icon>' +
              '</li>' +
              '<li' + generateAttr('click', 2) + '>' +
                '<span ' + generateAttr('color', 2) + ' ng-if="!(rbMdSvgIcon||rbMdSvgSrc)">{{rbCharacterIcon}}</span>' +
                '<md-icon ' + generateAttr('color', 2) + ' ng-if="rbMdSvgIcon" md-svg-icon="{{rbMdSvgIcon}}" aria-label="Rating Bar Icon"></md-icon>' +
                '<md-icon ' + generateAttr('color', 2) + ' ng-if="rbMdSvgSrc" md-svg-src="{{rbMdSvgSrc}}" aria-label="Rating Bar Icon"></md-icon>' +
              '</li>' +
              '<li' + generateAttr('click', 3) + '>' +
                '<span ' + generateAttr('color', 3) + ' ng-if="!(rbMdSvgIcon||rbMdSvgSrc)">{{rbCharacterIcon}}</span>' +
                '<md-icon ' + generateAttr('color', 3) + ' ng-if="rbMdSvgIcon" md-svg-icon="{{rbMdSvgIcon}}" aria-label="Rating Bar Icon"></md-icon>' +
                '<md-icon ' + generateAttr('color', 3) + ' ng-if="rbMdSvgSrc" md-svg-src="{{rbMdSvgSrc}}" aria-label="Rating Bar Icon"></md-icon>' +
              '</li>' +
              '<li' + generateAttr('click', 4) + '>' +
                '<span ' + generateAttr('color', 4) + ' ng-if="!(rbMdSvgIcon||rbMdSvgSrc)">{{rbCharacterIcon}}</span>' +
                '<md-icon ' + generateAttr('color', 4) + ' ng-if="rbMdSvgIcon" md-svg-icon="{{rbMdSvgIcon}}" aria-label="Rating Bar Icon"></md-icon>' +
                '<md-icon ' + generateAttr('color', 4) + ' ng-if="rbMdSvgSrc" md-svg-src="{{rbMdSvgSrc}}" aria-label="Rating Bar Icon"></md-icon>' +
              '</li>' +
            '</ul>',
          anySize:
            '<ul class="md-rating-bar"'+ generateAttr('cursor') + '>' +
              '<li ng-repeat="star in stars"' + generateAttr('click', '$index') + '>' +
                '<span ' + generateAttr('color', '$index') + ' ng-if="!(rbMdSvgIcon||rbMdSvgSrc)">{{rbCharacterIcon}}</span>' +
                '<md-icon ' + generateAttr('color', '$index') + ' ng-if="rbMdSvgIcon" md-svg-icon="{{rbMdSvgIcon}}" aria-label="Rating Bar Icon"></md-icon>' +
                '<md-icon ' + generateAttr('color', '$index') + ' ng-if="rbMdSvgSrc" md-svg-src="{{rbMdSvgSrc}}" aria-label="Rating Bar Icon"></md-icon>' +
              '</li>' +
            '</ul>'
        };

      if (scope.rbBgColor === undefined) {
        scope.rbBgColor = '#DDDDDD';
      }
      if (scope.rbFillColor === undefined) {
        scope.rbFillColor = '#FFDD00';
      }
      if (scope.rbCharacterIcon === undefined) {
        scope.rbCharacterIcon = '\u2605'; // UTF-8 black star symbol
      }
      if (scope.rbMax === undefined) {
        scope.rbMax = 5;
        element.html(templates.defaultSize);
      } else {
        element.html(templates.anySize);
      }
      $compile(element.contents())(scope);
      
      scope.toggle = toggle;

      scope.$watch('ratingValue', function(oldValue, newValue) {
        if (newValue) {
          updateStars();
          if (scope.rbOnUpdate && (oldValue !== newValue)){
            $timeout(scope.rbOnUpdate, 300);
          }
        }
      });

      function toggle (index) {
        if (!isReadonly){
          scope.ratingValue = index + 1;
        }
      }

      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.rbMax; i++) {
          if (useMdThemeColors) {
            scope.stars.push({
              color: i < scope.ratingValue ? 'accent' : 'primary-100'
            });
          } else {
            scope.stars.push({
              color: i < scope.ratingValue ? scope.rbFillColor : scope.rbBgColor
            });
          }
        }
      }

      function generateAttr (type, index) {
        var string;

        switch (type) {
          case 'cursor':
            if (isReadonly) {
              string = ' style="pointer-events: none;"'
            } else {
              string = ' style="cursor: pointer;"';
            }
            break;
          case 'click':
            string = isReadonly ? '' : ' ng-click="toggle(' + (index || 0) + ')"';
            break;
          case 'color':
            if (useMdThemeColors) {
              string = 'md-colors="{color: \'{{stars[' + (index || 0) + '].color}}\'}"';
            } else {
              string = 'ng-style="{color: stars[' + (index || 0) + '].color}"';
            }
            break;
          default:
            string = '';
        }

        return string;
      }
    }
  }
})();