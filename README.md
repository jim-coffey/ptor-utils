# Protractor Utility Functions

Exports PtorUtils Class containing utility functions designed for use in Protractor testing

Require in to your Protractor specs, instantiate utilities object, and call functions where needed.

* waitForPromiseTest

  Utility function to handle blocking-wait-for-condition
  Passed a Promise Function and a Test Function
  The browser wait gets called as many times as needed until the promise is fullfilled
  If the promise is never fulfilled, timeouts will Fail the test
  Credits to Emmit Pickerell's blog : http://docsplendid.com/archives/209

* hasClass

  Utility function to check whether element has exact match for a class
  Returns a promise
