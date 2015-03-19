;(function() {
  'use strict';
  /**
   * @ngdoc directive
   * @restrict E
   * @name ehaImg
   * @module eha.image.directive
   * @element ehaImg
   * @description
   *
   * An `img` tag wrapper directive providing dataURI and URI support.
   *
   * Accepts either a JSON representation of an image (see:
   * https://github.com/eHealthAfrica/data_model/tree/master/schemas/Image.json)
   * passed via the `image` attribute or alternatively a URI passed via the
   * `src` attribute. `image.title` will be used as `img` alt text if passed
   * via `image` attribute.
   *
   * Also accepts an `alt` parameter that will be passed to the `img` tag
   * taking priority over `image.title` if both are set.
   *
   * @example
   * <example module="ehaImageExample1">
   *  <file name="demo1.js">
   *    angular.module('ehaImageExample', ['eha.image.directive', 'eha.image.directive.templates'])
   *    .controller('DemoCtrl1', function($scope) {
   *      $scope.image = {
   *        title: 'Test Image',
   *        mimeType: 'image/jpeg',
   *        type: 'jpeg',
   *        data: '/9j/4AAQSkZJRgABAQEASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAABGqADAAQAAAABAAABGgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgBGgEaAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBQQEBAQEBQYFBQUFBQUGBgYGBgYGBgcHBwcHBwgICAgICQkJCQkJCQkJCf/bAEMBAQEBAgICBAICBAkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf/dAAQAEv/aAAwDAQACEQMRAD8A++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q++KKKK/ynP8Ah3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z'
   *      };
   *    });
   *  </file>
   *  <file name="demo1.html">
   *
   *    <div ng-controller="DemoCtrl1">
   *      <eha-img image="image">
   *    </div>
   *  </file>
   * </example>
   *
   *
   * @example
   * <example module="ehaImageExample2">
   *  <file name="demo2.js">
   *    angular.module('ehaImageExample2', ['eha.common.directive.image', 'eha.common.templates'])
   *  </file>
   *  <file name="demo2.html">
   *    <eha-img src="http://placekitten.com/200/300">
   *  </file>
   * </example>
   */
  var ngModule = angular.module('eha.image.directive', [])
  .directive('ehaImg', function() {
    return {
      restrict: 'E',
      scope: {
        image: '=image',
        src: '@src',
        alt: '@alt'
      },
      templateUrl: 'templates/image.directive.tpl.html',
      link: function(scope) {
        if (scope.image) {
          if (scope.image.data) {
          // We've got data
            scope.src = encodeURI('data:' +
                                  scope.image.mimeType + ';' +
                                  'base64,' +
                                  scope.image.data);
          }

          if (scope.image.title && scope.alt === undefined) {
            // If alt text hasn't been passed via attribute, check the image
            // for a title and use that if available
            scope.alt = scope.image.title;
          }
        }
      }
    };
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

}());

angular.module('eha.image.directive.templates', ['templates/image.directive.tpl.html']);

angular.module("templates/image.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/image.directive.tpl.html",
    "<div class=\"component image\">\n" +
    "  <img\n" +
    "    ng-src=\"{{src}}\"\n" +
    "    alt=\"{{alt}}\"\n" +
    "    class=\"img-rounded img-responsive\" />\n" +
    "</div>\n" +
    "");
}]);
