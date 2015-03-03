/*jshint expr: true*/
describe('Image directive', function() {
  var scope;
  var compile;
  var element;
  var imageData;

  beforeEach(module('eha.image.directive'));
  beforeEach(module('templates/image.directive.tpl.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    compile = _$compile_;
    scope = _$rootScope_.$new();
    scope.image = {
      mimeType: 'image/jpeg',
      data: '!!!PICTURE DATA!!!',
      title: 'The ALT text'
    };

    _$httpBackend_
    .expectGET('templates/image.directive.tpl.html')
    .respond();
  }));

  describe('should create dataURI for given object', function() {
    describe('image/jpeg', function() {
      beforeEach(function() {
        element = angular.element('<eha-img image="image" />');
        compile(element)(scope);
      });

      it('Passing an object by image attr.', function() {
        scope.$digest();
        var el = element.find('img')[0];
        expect(el.src).to.equal(
          encodeURI('data:image/jpeg;Base64,!!!PICTURE DATA!!!')
        );
        expect(el.alt).to.equal(scope.image.title);
      });
    });

    describe('image/png', function() {
      beforeEach(function() {
        scope.image.mimeType = 'image/png',
        element = angular.element('<eha-img image="image" />');
        compile(element)(scope);
      });
      it('Passing an object by image attr.', function() {
        scope.$digest();
        var el = element.find('img')[0];
        expect(el.src).to.equal(
          encodeURI('data:image/png;Base64,!!!PICTURE DATA!!!')
        );
      });
    });

    describe('unsafe', function() {
      // Check angular is escaping unsafe url schemes properly
      beforeEach(function() {
        scope.image.mimeType = 'text/png',
        element = angular.element('<eha-img image="image" />');
        compile(element)(scope);
      });
      it('Passing an object by image attr.', function() {
        scope.$digest();
        var el = element.find('img')[0];
        expect(el.src).to.equal(
          encodeURI('unsafe:data:text/png;Base64,!!!PICTURE DATA!!!')
        );
      });
    });

  });

  describe('Passing alt', function() {
    describe('JSON object', function() {
      beforeEach(function() {
        element = angular.element('<eha-img image="image" alt="An image" />');
        compile(element)(scope);
      });

      it('should set the alt text', function() {
        scope.$digest();
        var el = element.find('img')[0];
        expect(el.alt).to.equal('An image');
      });

    });

    describe('Data URI', function() {
      beforeEach(function() {
        element = angular
                  .element('<eha-img src="http://example.com" alt="A URI" />');
        compile(element)(scope);
      });

      it('should set the alt text', function() {
        scope.$digest();
        var el = element.find('img')[0];
        expect(el.alt).to.equal('A URI');
      });
    });

  });

  describe('Passing a src', function() {
    beforeEach(function() {
      element = angular.element('<eha-img src="http://example.com" />');
      compile(element)(scope);
    });

    it('should render src in image tag', function() {
      scope.$digest();
      var el = element.find('img')[0];
      expect(el.src).to.equal('http://example.com/');
    });
  });
});
