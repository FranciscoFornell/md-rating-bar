(function() {
  'use strict';

  angular
    .module('mdRatingBar', [])
    .run(templateCaching)
    .directive('mdRatingBar', mdRatingBar);

  templateCaching.$inject = ['$templateCache'];

  function templateCaching ($templateCache) {
    $templateCache.put('default_star.svg', '<svg><g id="default_star"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/></svg>');
  }

  mdRatingBar.$inject = ['$timeout', '$compile'];

  function mdRatingBar ($timeout, $compile) {
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
        rbMdSvgSrc: '@?',
        rbMdFontIcon: '=?'
      },
      link: linkFn
    };

    return directive;

    function linkFn(scope, element, attributes) {
      var isReadonly =  false,
        useMdThemeColors = false,
        templates = {
          defaultSize: '',
          anySize: ''
        };

      scope.toggle = toggle;

      activate();

      function activate() {
        // Set default values
        isReadonly = attributes.hasOwnProperty('rbReadonly');
        useMdThemeColors = attributes.hasOwnProperty('rbUseMdThemeColors');
        if (attributes.hasOwnProperty('rbCharacterIcon')){
          scope.rbCharacterIcon = scope.rbCharacterIcon || '\u2605'; // UTF-8 black star symbol by default
        }
        scope.rbMdSvgSrc = scope.rbMdSvgSrc || 'default_star.svg'
        
        // Compose templates
        templates.defaultSize = '<ul class="md-rating-bar"'+ generateAttr('cursor') + '>' +
          '<li' + generateAttr('click', 0) + '>' +
            '<span class="md-rating-bar-font" ' + generateAttr('color', 0) + ' ng-if="rbCharacterIcon">{{rbCharacterIcon}}</span>' +
            '<md-icon ' + generateAttr('color', 0) + ' ng-if="!rbCharacterIcon" ' + generateAttr('icon') + ' aria-label="Rating Bar Icon">' +
              '<span ng-if="rbMdFontIcon.iconName" ng-bind="rbMdFontIcon.iconName"></span>' +
            '</md-icon>' +
          '</li>' +
          '<li' + generateAttr('click', 1) + '>' +
            '<span class="md-rating-bar-font" ' + generateAttr('color', 1) + ' ng-if="rbCharacterIcon">{{rbCharacterIcon}}</span>' +
            '<md-icon ' + generateAttr('color', 1) + ' ng-if="!rbCharacterIcon" ' + generateAttr('icon') + ' aria-label="Rating Bar Icon">' + 
              '<span ng-if="rbMdFontIcon.iconName" ng-bind="rbMdFontIcon.iconName"></span>' +
            '</md-icon>' +
          '</li>' +
          '<li' + generateAttr('click', 2) + '>' +
            '<span class="md-rating-bar-font" ' + generateAttr('color', 2) + ' ng-if="rbCharacterIcon">{{rbCharacterIcon}}</span>' +
            '<md-icon ' + generateAttr('color', 2) + ' ng-if="!rbCharacterIcon" ' + generateAttr('icon') + ' aria-label="Rating Bar Icon">' + 
              '<span ng-if="rbMdFontIcon.iconName" ng-bind="rbMdFontIcon.iconName"></span>' +
            '</md-icon>' +
          '</li>' +
          '<li' + generateAttr('click', 3) + '>' +
            '<span class="md-rating-bar-font" ' + generateAttr('color', 3) + ' ng-if="rbCharacterIcon">{{rbCharacterIcon}}</span>' +
            '<md-icon ' + generateAttr('color', 3) + ' ng-if="!rbCharacterIcon" ' + generateAttr('icon') + ' aria-label="Rating Bar Icon">' + 
              '<span ng-if="rbMdFontIcon.iconName" ng-bind="rbMdFontIcon.iconName"></span>' +
            '</md-icon>' +
          '</li>' +
          '<li' + generateAttr('click', 4) + '>' +
            '<span class="md-rating-bar-font" ' + generateAttr('color', 4) + ' ng-if="rbCharacterIcon">{{rbCharacterIcon}}</span>' +
            '<md-icon ' + generateAttr('color', 4) + ' ng-if="!rbCharacterIcon" ' + generateAttr('icon') + ' aria-label="Rating Bar Icon">' + 
              '<span ng-if="rbMdFontIcon.iconName" ng-bind="rbMdFontIcon.iconName"></span>' +
            '</md-icon>' +
          '</li>' +
        '</ul>';
        templates.anySize ='<ul class="md-rating-bar"'+ generateAttr('cursor') + '>' +
          '<li ng-repeat="star in stars"' + generateAttr('click', '$index') + '>' +
            '<span class="md-rating-bar-font" ' + generateAttr('color', '$index') + ' ng-if="rbCharacterIcon">{{rbCharacterIcon}}</span>' +
            '<md-icon ' + generateAttr('color', '$index') + ' ng-if="!rbCharacterIcon" ' + generateAttr('icon') + ' aria-label="Rating Bar Icon">' + 
              '<span ng-if="rbMdFontIcon.iconName" ng-bind="rbMdFontIcon.iconName"></span>' +
            '</md-icon>' +
          '</li>' +
        '</ul>';

        // Select template and compile
        if (scope.rbMax === undefined) {
          scope.rbMax = 5;
          element.html(templates.defaultSize);
        } else {
          element.html(templates.anySize);
        }

        $compile(element.contents())(scope);

        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
            if (scope.rbOnUpdate && (oldValue !== newValue)){
              $timeout(scope.rbOnUpdate, 300);
            }
          }
        });
      }

      function toggle (index) {
        if (!isReadonly){
          scope.ratingValue = index + 1;
        }
      }

      function updateStars() {
        scope.stars = [];
        if (scope.rbCharacterIcon === '') {
          scope.rbCharacterIcon = '\u2605'; // UTF-8 black star symbol
        }
        scope.rbMdSvgSrc = scope.rbMdSvgSrc || 'default_star.svg'
        for (var i = 0; i < scope.rbMax; i++) {
          if (useMdThemeColors) {
            scope.stars.push({
              color: i < scope.ratingValue ? 'accent' : 'primary-100'
            });
          } else {
            scope.stars.push({
              color: i < scope.ratingValue ? 
                validColor(scope.rbFillColor, 'fill') :
                validColor(scope.rbBgColor, 'bg')
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
          case 'icon':
            if(scope.rbMdSvgIcon) {
              string = 'md-svg-icon="{{rbMdSvgIcon}}" class="md-rating-bar-svg"';
            } else if (scope.rbMdFontIcon){
              string = 'md-font-set="{{rbMdFontIcon.fontSet}}" class="md-rating-bar-font"';
            } else {
              string = 'md-svg-src="{{rbMdSvgSrc}}" class="md-rating-bar-svg"';
            }
            break;
          default:
            string = '';
        }

        return string;
      }

      function validColor(stringToTest, type) {
        //Alter the following conditions according to your need.
        type = type || 'fill';
        
        if (!stringToTest ||
          stringToTest === "inherit" ||
          stringToTest === "transparent") {

          return (type === 'fill') ? '#FFDD00' : '#DDDDDD';
        }        

        var image = document.createElement("img");
        image.style.color = "rgb(0, 0, 0)";
        image.style.color = stringToTest;
        if (image.style.color !== "rgb(0, 0, 0)") {
          return stringToTest;
        }
        image.style.color = "rgb(255, 255, 255)";
        image.style.color = stringToTest;
        if (image.style.color !== "rgb(255, 255, 255)") {
          return stringToTest;
        } else {
          return (type === 'fill') ? '#FFDD00' : '#DDDDDD';
        }
      }
    }
  }
})();