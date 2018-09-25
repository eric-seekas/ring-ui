window.source = {
  "title": "Button Ng",
  "url": "button-ng.html",
  "type": "js",
  "content": "import angular from 'angular';\nimport 'dom4';\nimport 'core-js/modules/es7.array.includes';\n\nimport RingAngularComponent from '../global/ring-angular-component';\nimport IconNG from '../icon-ng/icon-ng';\n\nimport '../button/button.scss';\n\nconst DEFAULT_ICON_SIZE = 16;\n\n/**\n * @name Button Ng\n * @category Legacy Angular Components\n * @description Provides an Angular wrapper for Button.\n * @example-file ./button-ng.examples.html\n */\n\n\nconst angularModule = angular.module('Ring.button', [IconNG]);\nconst ORDER_NOT_DEFINED = '-1';\n\nclass ButtonController extends RingAngularComponent {\n  static $inject = ['$element', '$attrs', '$scope', '$compile'];\n\n  constructor(...args) {\n    super(...args);\n\n    const {$element, $attrs, $scope} = this.$inject;\n    this.element = $element[0];\n\n    const modifiers = ['delayed', 'loader', 'danger', 'short', 'active'];\n    const cl = this.element.classList;\n    modifiers.forEach(mod => {\n      $scope.$watch(() => $scope.$eval($attrs[mod]), val => {\n        val ? cl.add(`ring-button_${mod}`) : cl.remove(`ring-button_${mod}`);\n      });\n    });\n\n    const tabIndex = $attrs.tabindex || ORDER_NOT_DEFINED;\n    if (tabIndex !== ORDER_NOT_DEFINED) {\n      this.element.setAttribute('tabindex', tabIndex);\n    }\n\n    $scope.$watch(() => $scope.$eval($attrs.loader), val => {\n      if (val) {\n        this.element.setAttribute('tabindex', ORDER_NOT_DEFINED);\n      } else if (tabIndex !== ORDER_NOT_DEFINED) {\n        this.element.setAttribute('tabindex', tabIndex);\n      } else {\n        this.element.removeAttribute('tabindex');\n      }\n    });\n\n    // A dirty workaround for IE9 :(\n    const updateMode = val => setTimeout(this.updateMode.bind(this, val), 0);\n    const updateIcon = val => setTimeout(this.updateIcon.bind(this, val), 0);\n\n    $attrs.$observe('mode', updateMode);\n    $attrs.$observe('icon', updateIcon);\n    $attrs.$observe('iconSize', updateIcon);\n  }\n\n  updateMode(val) {\n    const cl = this.element.classList;\n    const mode = ['primary', 'blue'].includes(val) ? val : 'default';\n\n    cl.remove('ring-button_default', 'ring-button_primary', 'ring-button_blue');\n    cl.add(`ring-button_${mode}`);\n  }\n\n  updateIcon() {\n    const {$attrs, $compile, $scope} = this.$inject;\n    const icon = this.element.query('.ring-button__icon');\n    const glyph = $attrs.icon;\n    const size = $attrs.iconSize || DEFAULT_ICON_SIZE;\n    const cl = this.element.classList;\n\n    if (glyph) {\n      cl.add('ring-button_icon');\n      icon.setAttribute('glyph', glyph);\n      icon.setAttribute('size', size);\n    } else {\n      cl.remove('ring-button_icon');\n      icon.removeAttribute('glyph');\n      icon.removeAttribute('size');\n    }\n\n    $compile(icon)($scope);\n  }\n}\n\nfunction rgButtonDirective() {\n  return {\n    restrict: 'E',\n    transclude: true,\n    replace: true,\n    template: require('./button-ng.html'),\n    controller: ButtonController\n  };\n}\n\nfunction rgButtonLinkDirective() {\n  return {\n    restrict: 'E',\n    transclude: true,\n    replace: true,\n    template: require('./button-link-ng.html'),\n    controller: ButtonController\n  };\n}\n\nangularModule.directive('rgButton', rgButtonDirective);\nangularModule.directive('rgButtonLink', rgButtonLinkDirective);\n\nexport default angularModule.name;\n",
  "examples": [
    {
      "name": "Button Ng",
      "url": "examples/button-ng/button-ng.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<div ng-app=\"test\" ng-strict-di ng-controller=\"testCtrl\">\n  <p>\n    <rg-button>Press me</rg-button>\n    <rg-button>Press me Press me Press me Press me Press me Press me Press\n      me\n    </rg-button>\n    <rg-button disabled=\"true\">Press me</rg-button>\n    <rg-button loader=\"true\">Press me</rg-button>\n    <rg-button delayed=\"true\">Press me</rg-button>\n  </p>\n\n  <p>\n    <rg-button mode=\"primary\">Press me</rg-button>\n    <rg-button mode=\"primary\">Press me Press me Press me Press me Press me\n      Press me Press me\n    </rg-button>\n    <rg-button mode=\"primary\" disabled=\"true\">Press me</rg-button>\n    <rg-button mode=\"primary\" loader=\"true\">Press me</rg-button>\n    <rg-button mode=\"primary\" delayed=\"true\">Press me</rg-button>\n  </p>\n\n  <p>\n    <rg-button mode=\"blue\">Press me</rg-button>\n    <rg-button mode=\"blue\">Press me Press me Press me Press me Press me\n      Press me Press me\n    </rg-button>\n    <rg-button mode=\"blue\" disabled=\"true\">Press me</rg-button>\n    <rg-button mode=\"blue\" loader=\"true\">Press me</rg-button>\n    <rg-button mode=\"blue\" delayed=\"true\">Press me</rg-button>\n  </p>\n\n  <p>\n    <rg-button>Press me</rg-button>\n    <rg-button icon=\"{{caretDown}}\">Press me</rg-button>\n    <rg-button icon=\"{{close}}\"></rg-button>\n    <rg-button icon=\"{{close}}\" mode=\"primary\"></rg-button>\n    <rg-button icon=\"{{close}}\" mode=\"blue\"></rg-button>\n    <rg-button icon=\"{{permission}}\" disabled=\"true\"></rg-button>\n    <rg-button icon=\"{{pencil}}\" loader=\"true\"></rg-button>\n    <rg-button>Press me</rg-button>\n  </p>\n\n  <p>\n    <rg-button danger=\"true\">Press me</rg-button>\n    <rg-button danger=\"true\" disabled=\"true\">Press me</rg-button>\n    <rg-button danger=\"true\" loader=\"true\">Press me</rg-button>\n    <rg-button danger=\"true\" icon=\"{{pencil}}\"></rg-button>\n  </p>\n\n  <p>\n    <rg-button-link href=\"/button-link\">Press me</rg-button-link>\n    <rg-button-link href=\"/button-link\" disabled=\"true\">Press me\n    </rg-button-link>\n    <rg-button-link href=\"/button-link\" loader=\"true\">Press me\n    </rg-button-link>\n    <rg-button-link href=\"/button-link\" icon=\"{{pencil}}\"></rg-button-link>\n  </p>\n\n  <p>\n    <rg-button tabindex=\"1\">\n      <span>Press me</span>\n      <rg-icon size=\"16\" glyph=\"{{close}}\"></rg-icon>\n    </rg-button>\n    <rg-button tabindex=\"2\">\n      <rg-icon size=\"16\" glyph=\"{{close}}\"></rg-icon>\n      <span>Press me</span>\n    </rg-button>\n    <rg-button tabindex=\"3\">\n      <rg-icon size=\"16\" glyph=\"{{close}}\"></rg-icon>\n      <span>Press me</span>\n      <rg-icon size=\"16\" glyph=\"{{close}}\"></rg-icon>\n    </rg-button>\n    <rg-button tabindex=\"4\">\n      <span>Press me</span>\n      <rg-icon size=\"16\" glyph=\"{{close}}\"></rg-icon>\n      <span>Press me</span>\n    </rg-button>\n  </p>\n</div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport angular from 'angular';\nimport ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\nimport IconNG from '@jetbrains/ring-ui/components/icon-ng/icon-ng';\nimport {\n  PencilIcon,\n  CaretDownIcon,\n  CloseIcon,\n  PermissionIcon\n} from '@jetbrains/ring-ui/components/icon';\n\nangular.module('test', [ButtonNG, IconNG]).\n  controller('testCtrl', function ($scope) {\n    $scope.pencil = PencilIcon;\n    $scope.caretDown = CaretDownIcon;\n    $scope.close = CloseIcon;\n    $scope.permission = PermissionIcon;\n  });\n  ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Provides an Angular wrapper for Button.",
  "attrs": {
    "name": "Button Ng",
    "category": "Legacy Angular Components",
    "description": "Provides an Angular wrapper for Button.",
    "example-file": "./button-ng.examples.html"
  }
};