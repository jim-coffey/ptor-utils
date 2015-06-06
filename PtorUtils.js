var PtorUtils = function() {
  // Utility Function to handle blocking-wait-for-condition
  // The browser wait gets called as many times as needed until
  // the promise is fulfilled
  // If the promise is never fulfilled, timeouts will Fail the tests
  // The promise function being tested can accept up to 4 arguments.
  this.waitForPromiseTest = function(promiseFn, testFn, args) {
    browser.wait(function () {
      var deferred = protractor.promise.defer();
      var fnArgs   = args ? args.length : 0;

      switch(fnArgs) {
        case 0:
          promiseFn().then(function(data) {
            deferred.fulfill(testFn(data));
          });
          break;

        case 1:
          promiseFn(args[0]).then(function(data) {
            deferred.fulfill(testFn(data));
          });
          break;

        case 2:
          promiseFn(args[0], args[1]).then(function(data) {
            deferred.fulfill(testFn(data));
          });
          break;

        case 3:
          promiseFn(args[0], args[1], args[2]).then(function(data) {
            deferred.fulfill(testFn(data));
          });
          break;

        case 4:
          promiseFn(args[0], args[1], args[2], args[3]).then(function(data) {
            deferred.fulfill(testFn(data));
          });
          break;

        default:
          return null;
      }

      return deferred.promise;
    });
  }


  // Utility Function to check whether element has exact match for a class
  // Returns a promise
  this.hasClass = function(element, cls) {
    return element.getAttribute('class').then(function(classes) {
      var classes = classes.split(' '),
          found   = classes.indexOf(cls);

      if (found > -1) {
        return true;
      }

      return false;
    });
  }


  // Utility Function to check whether text contains any of
  // an array of text values i.e. the needles we're checking for
  this.containsOneOfText = function(element, needles) {
    return element.getText().then(function(message) {
      var needle = '';

      message = message.toLowerCase();
      for (var i=0; i<needles.length; i++) {
        needle = needles[i].toLowerCase();
        if (message.indexOf(needle) > -1) {
          return true;
        }
      }

      return false;
    });
  }


  // Utility Conveniance Wrapper for dealing with inputs with multiple options
  var OptionsWrapper = function(selector) {
    this.webElement = element(selector);
  };
  OptionsWrapper.prototype.getOptions = function() {
    return this.webElement.all(by.tagName('option'));
  };
  OptionsWrapper.prototype.getSelectedOptions = function() {
    return this.webElement.all(by.css('options[selected="selected"]'));
  };
  OptionsWrapper.prototype.selectByValue = function(value) {
    return this.webElement.all(by.css('option[value="' + value + '"]')).click();
  };
  OptionsWrapper.prototype.selectByTextFragment = function(textFragment) {
    return this.webElement.all(by.cssContainingText('option', textFragment)).click();
  };
  OptionsWrapper.prototype.selectByText = function(text) {
    return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();
  }
  this.OptionsWrapper = OptionsWrapper;

}
module.exports = PtorUtils;
