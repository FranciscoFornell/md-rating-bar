describe('Rating bar directive default behaviour', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarHTML = "<div><md-rating-bar ng-model=\"value\"></md-rating-bar></div>",
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    scope.value = 3;

    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  it('should replace the element with content', function() {
    expect(ratingBarElement[0].firstChild.innerHTML.length).toBeGreaterThan(0);
  });

  it('should fill the bar with five elements', function() {
    expect(ratingBarElement.find('li').length).toBe(5);
  });
  
  it('should fill each element with an svg material design star icon', function() {
    expect(ratingBarElement.find('g').length).not.toBe(0);
    expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
  });      
  
  it('should set the fill color to rgb(255, 221, 0)', function() {
    expect(ratingBarElement.find('li')[0].children[0].style.color).toBe('rgb(255, 221, 0)');
  });
  
  it('should set the background color to rgb(221, 221, 221)', function() {
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
  });

  it('should update elements colors when ng-model changes', function() {
    scope.value = 4;
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(255, 221, 0)');
    scope.value = 2;
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
  });

  it('should update value and elements colors when elements are clicked', function() {
    ratingBarElement.find('li')[3].click();
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(255, 221, 0)');
    ratingBarElement.find('li')[1].click();
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
  });
});

describe('rb-max', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarHTML = "<div><md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar></div>",
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    scope.value = 3;
    scope.size = 0;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  it('should make the bar to be empty when value is 0', function() {
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li').length).toBe(0);
  });

  it('should make the bar to have 5 elements when value is 5', function() {
    scope.size = 5;
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li').length).toBe(5);
  });

  it('should make the bar to have 10 elements when value is 10', function() {
    scope.size = 10;
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li').length).toBe(10);
  });

  it('should make the bar to be empty when value is negative', function() {
    scope.size = -5;
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li').length).toBe(0);
  });

  it('should make the bar to be empty when value is not a number', function() {
    scope.size = 'x';
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li').length).toBe(0);
  });

  it('should make the bar to be default size (5) when value is undefined', function() {
    delete scope.size;
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li').length).toBe(5);
  });

  it('should update elements colors when ng-model changes with rb-max set', function() {
    scope.size = 10;
    scope.value = 4;
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(255, 221, 0)');
    scope.value = 2;
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
  });

  it('should update value and elements colors when elements are clicked with rb-max set', function() {
    scope.size = 10;
    ratingBarElement = $compile(angular.element(ratingBarHTML))(scope);
    angular.element(document).find('body').append(ratingBarElement);
    scope.$apply();

    ratingBarElement.find('li')[3].click();
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(255, 221, 0)');

    ratingBarElement.find('li')[1].click();
    scope.$apply();
    expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
  });
});

describe('rb-bg-color', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe('when size is default', function(){
    it('should set the background color to rgb(221, 221, 221) when value is blank', function() {

      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should set the background color to rgb(221, 221, 221) when value is undefined', function() {

      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should set the background color to rgb(221, 221, 221) when value is an invalid color string', function() {

      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"any string\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should set the background color when value is a valid color string', function() {

      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('red');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"rgb(57, 149, 150)\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(57, 149, 150)');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"#399596\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(57, 149, 150)');
    });

    it('should set the background color appropriately when the model changes or an element is clicked', function() {

      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');

      scope.value = 2;
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');

      ratingBarElement.find('li')[2].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');

      ratingBarElement.find('li')[1].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');
    });
  });

  describe('when size is not default', function(){
    beforeEach(function(){
      scope.size = 10;      
    });

    it('should set the background color to rgb(221, 221, 221) when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should set the background color to rgb(221, 221, 221) when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should set the background color to rgb(221, 221, 221) when value is an invalid color string', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"any string\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should set the background color when value is a valid color string', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('red');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"rgb(57, 149, 150)\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(57, 149, 150)');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"#399596\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(57, 149, 150)');
    });

    it('should set the background color appropriately when the model changes or an element is clicked', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-bg-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');

      scope.value = 2;
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');

      ratingBarElement.find('li')[2].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');

      ratingBarElement.find('li')[1].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');
    });
  });
});

describe('rb-fill-color', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe('when size is default', function(){
    it('should set the fill color to rgb(255, 221, 0) when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[0].children[0].style.color).toBe('rgb(255, 221, 0)');
    });

    it('should set the fill color to rgb(255, 221, 0) when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(255, 221, 0)');
    });

    it('should set the fill color to rgb(255, 221, 0) when value is an invalid color string', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"any string\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(255, 221, 0)');
    });
    
    it('should set the fill color when value is a valid color string', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('red');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"rgb(57, 149, 150)\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(57, 149, 150)');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"#399596\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(57, 149, 150)');
    });

    it('should set the fill color appropriately when the model changes or an element is clicked', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');

      scope.value = 2;
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');

      ratingBarElement.find('li')[2].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');

      ratingBarElement.find('li')[1].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');
    });
  });

  describe('when size is not default', function(){
    beforeEach(function(){
      scope.size = 10;
    });

    it('should set the fill color to rgb(255, 221, 0) when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[0].children[0].style.color).toBe('rgb(255, 221, 0)');
    });

    it('should set the fill color to rgb(255, 221, 0) when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(255, 221, 0)');
    });

    it('should set the fill color to rgb(255, 221, 0) when value is an invalid color string', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"any string\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(255, 221, 0)');
    });
    
    it('should set the fill color when value is a valid color string', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('red');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"rgb(57, 149, 150)\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(57, 149, 150)');

      ratingBarElement.remove();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"#399596\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[1].children[0].style.color).toBe('rgb(57, 149, 150)');
    });

    it('should set the fill color appropriately when the model changes or an element is clicked', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-fill-color=\"red\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');

      scope.value = 2;
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');

      ratingBarElement.find('li')[2].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('red');

      ratingBarElement.find('li')[1].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('red');
    });
  });
});

describe('rb-character-icon', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe("when size is default", function(){
    it('should set the default star character icon when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span')[0].innerHTML).toBe('\u2605')
    });

    it('should set the default svg material design star icon when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should set the value as element icon', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"*\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span')[0].innerHTML).toBe('*')
    });
  });

  describe('when size is not default', function(){
    beforeEach(function(){
      scope.size = 10;
    });

    it('should set the default star character icon when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span')[0].innerHTML).toBe('\u2605')
    });

    it('should set the default svg material design star icon when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should set the value as element icon', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"*\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span')[0].innerHTML).toBe('*')
    });
  });
});

describe('rb-md-svg-icon', function () {
  var $compile,
    $rootScope,
    $mdIconProvider,
    $templateCache,
    $httpBackend,
    scope,
    ratingBarElement;

  beforeEach(function(){
    module('ngMaterial', 'mdRatingBar', 'ngMockE2E', function(_$mdIconProvider_) {
      $mdIconProvider = _$mdIconProvider_;
      $mdIconProvider
        .defaultIconSet('core.svg')
        .icon('missingIcon', 'notfoundicon.svg');
    });
  });
  
  beforeEach(inject(function(_$templateCache_, _$compile_, _$rootScope_, $injector){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('core.svg').passThrough();
    $httpBackend.whenGET('notfoundicon.svg').passThrough();
    $templateCache = _$templateCache_;
    $templateCache.put('core.svg', '<svg><g id="star"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/></svg>');
    $templateCache.put('notfoundicon.svg', '<svg></svg>');

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe('when size is default', function(){
    it('should set the default svg material design star icon when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should set the default svg material design star icon when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should make the bar to be empty when there are no svg source files configured in $mdIconProvider', function() {
      $templateCache.removeAll();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"star\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span').length).toBe(0);
      expect(ratingBarElement.find('g').length).toBe(0);
    });

    it('should make the bar to be empty when there are no matching icons in the configured iconset', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"missingIcon\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span').length).toBe(0);
      expect(ratingBarElement.find('g').length).toBe(0);
    });

    it('should set the elements icon when there is a matching icon in the configured iconset', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"star\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
    });
  });

  describe('when size is not default', function(){
    beforeEach(function(){
      scope.size = 10;
    });

    it('should set the default svg material design star icon when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should set the default svg material design star icon when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should make the bar to be empty when there are no svg source files configured in $mdIconProvider', function() {
      $templateCache.removeAll();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"star\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span').length).toBe(0);
      expect(ratingBarElement.find('g').length).toBe(0);
    });

    it('should make the bar to be empty when there are no matching icons in the configured iconset', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"missingIcon\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span').length).toBe(0);
      expect(ratingBarElement.find('g').length).toBe(0);
    });

    it('should set the elements icon when there is a matching icon in the configured iconset', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon=\"star\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
    });
  });  
});

describe('rb-md-svg-src', function () {
  var $compile,
    $rootScope,
    $templateCache,
    $httpBackend,
    scope,
    ratingBarElement;

  beforeEach(function(){
    module('ngMaterial', 'mdRatingBar', 'ngMockE2E');
  });
  
  beforeEach(inject(function(_$templateCache_, _$compile_, _$rootScope_, $injector){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('core.svg').passThrough();
    $httpBackend.whenGET('notfoundicon.svg').passThrough();
    $templateCache = _$templateCache_;
    $templateCache.put('star_file.svg', '<svg><g id="star"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/></svg>');

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe('when size is default', function(){
    it('should set the default svg material design star icon when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-src=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should set the default svg material design star icon when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should make the bar to be empty when file does not exist', function() {
      $templateCache.removeAll();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-src=\"notfoundicon.svg\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span').length).toBe(0);
      expect(ratingBarElement.find('g').length).toBe(0);
    });

    it('should set the elements icon when there is an icon in the file', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-src=\"star_file.svg\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
    });
  });

  describe('when size is not default', function(){
    beforeEach(function(){
      scope.size = 10;
    });

    it('should set the default svg material design star icon when value is blank', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-src=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should set the default svg material design star icon when value is undefined', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
      expect(ratingBarElement.find('g').attr('id')).toBe('default_star');
    });

    it('should make the bar to be empty when file does not exist', function() {
      $templateCache.removeAll();
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-src=\"notfoundicon.svg\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('span').length).toBe(0);
      expect(ratingBarElement.find('g').length).toBe(0);
    });

    it('should set the elements icon when there is an icon in the file', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-src=\"star_file.svg\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('g').length).not.toBe(0);
    });
  });
});

describe('rb-use-md-theme-colors  ', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar', 'ngMockE2E', function(_$mdIconProvider_) {
    $mdIconProvider = _$mdIconProvider_;
    $mdIconProvider
      .defaultIconSet('core.svg');
  }));
  
  beforeEach(inject(function(_$templateCache_, _$compile_, _$rootScope_, $injector){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('core.svg').passThrough();
    $templateCache = _$templateCache_;
    $templateCache.put('core.svg', '<svg><g id="star"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/></svg>');

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe("when size is default", function(){
    describe('when using character icons', function(){
      it('should set fill color to the current theme accent color with no hue', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');
      });

      it('should set background color to the current theme primary color with hue-100', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');
      });

      it('should set the fill color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        scope.value = 2;
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[1].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');
      });
      
      it('should set the background color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        scope.value = 4;
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[3].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');
      });
    });

    describe('when using svg icons', function(){
      it('should set fill color to the current theme accent color with no hue', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');
      });

      it('should set background color to the current theme primary color with hue-100', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');
      });

      it('should set the fill color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        scope.value = 2;
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[1].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');
      });
      
      it('should set the background color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        scope.value = 4;
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[3].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');
      });
    });
  });

  describe("when size is not default", function(){
    beforeEach(function(){
      scope.size = 10;
    });

    describe('when using character icons', function(){
      it('should set fill color to the current theme accent color with no hue', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');
      });

      it('should set background color to the current theme primary color with hue-100', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');
      });

      it('should set the fill color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        scope.value = 2;
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[1].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');
      });
      
      it('should set the background color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-character-icon=\"&#9824\" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        scope.value = 4;
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[3].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');
      });
    });
    describe('when using svg icons', function(){
      it('should set fill color to the current theme accent color with no hue', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');
      });

      it('should set background color to the current theme primary color with hue-100', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');
      });

      it('should set the fill color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        scope.value = 2;
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 64, 129)');

        ratingBarElement.find('li')[1].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[2].children[0].style.color).not.toBe('rgb(255, 64, 129)');
      });
      
      it('should set the background color appropriately when the model changes or an element is clicked', function() {
        ratingBarElement = $compile(angular.element(
          '<div>' +
            '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-md-svg-icon="star" rb-use-md-theme-colors></md-rating-bar>' +
          '</div>'
        ))(scope);
        angular.element(document).find('body').append(ratingBarElement);
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        scope.value = 4;
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[2].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(197, 202, 233)');

        ratingBarElement.find('li')[3].click();
        scope.$apply();
        expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(197, 202, 233)');
      });
    });
  });
});

describe('rb-readonly', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    scope = $rootScope.$new();
    scope.value = 3;
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe("when size is default", function(){
    it('should change elements colors when ng-model value is changed', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-readonly></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 221, 0)');
      scope.value = 2;
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should not change elements colors when they are clicked', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-readonly></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 221, 0)');
      ratingBarElement.find('li')[1].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 221, 0)');
    });
  });

  describe("when size is not default", function(){
    beforeEach(function(){
      scope.size = 10;
    });

    it('should change elements colors when ng-model value is changed', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-readonly></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 221, 0)');
      scope.value = 2;
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(221, 221, 221)');
    });

    it('should not change elements colors when they are clicked', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-readonly></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 221, 0)');
      ratingBarElement.find('li')[1].click();
      scope.$apply();
      expect(ratingBarElement.find('li')[2].children[0].style.color).toBe('rgb(255, 221, 0)');
    });
  });
});



describe('rb-on-update', function () {
  var $compile,
    $rootScope,
    scope,
    ratingBarElement;

  beforeEach(module('ngMaterial', 'mdRatingBar'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;

    scope = $rootScope.$new();
    scope.value = 3;
    scope.updateCallback = jasmine.createSpy('updateCallback');
  }));

  afterEach(function () {
    ratingBarElement.remove();
  });

  describe("when size is default", function(){
    it('should call the passed callback', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-on-update=\"updateCallback()\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      scope.value = 4;
      scope.$apply();
      $timeout.flush();
      expect(scope.updateCallback).toHaveBeenCalled();
    });

    it('should do nothing but not fail when an empty string is passed', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-on-update=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(255, 221, 0)');
      scope.value = 4;
      scope.$apply();
      $timeout.flush();
      expect(scope.updateCallback).not.toHaveBeenCalled();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(255, 221, 0)');
    });

    it('should do nothing but not fail when a non existing callback is passed', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-on-update=\"nonExistingCallback()\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[3].children[0].style.color).not.toBe('rgb(255, 221, 0)');
      scope.value = 4;
      scope.$apply();
      $timeout.flush();
      expect(scope.updateCallback).not.toHaveBeenCalled();
      expect(ratingBarElement.find('li')[3].children[0].style.color).toBe('rgb(255, 221, 0)');
    });
  });

  describe("when size is not default", function(){
    beforeEach(function(){
      scope.size = 10;
    });

    it('should call the passed callback', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-on-update=\"updateCallback()\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      scope.value = 7;
      scope.$apply();
      $timeout.flush();
      expect(scope.updateCallback).toHaveBeenCalled();
    });

    it('should do nothing but not fail when an empty string is passed', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-on-update=\"\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[6].children[0].style.color).not.toBe('rgb(255, 221, 0)');
      scope.value = 7;
      scope.$apply();
      $timeout.flush();
      expect(scope.updateCallback).not.toHaveBeenCalled();
      expect(ratingBarElement.find('li')[6].children[0].style.color).toBe('rgb(255, 221, 0)');
    });

    it('should do nothing but not fail when a non existing callback is passed', function() {
      ratingBarElement = $compile(angular.element(
        '<div>' +
          '<md-rating-bar ng-model=\"value\" rb-max=\"size\" rb-on-update=\"nonExistingCallback()\"></md-rating-bar>' +
        '</div>'
      ))(scope);
      angular.element(document).find('body').append(ratingBarElement);
      scope.$apply();
      expect(ratingBarElement.find('li')[6].children[0].style.color).not.toBe('rgb(255, 221, 0)');
      scope.value = 7;
      scope.$apply();
      $timeout.flush();
      expect(scope.updateCallback).not.toHaveBeenCalled();
      expect(ratingBarElement.find('li')[6].children[0].style.color).toBe('rgb(255, 221, 0)');
    });
  });
});