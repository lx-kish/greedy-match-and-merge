The package consists of 5 files:

index.html - contains a simple html document with minimum layout for the script execution, and linked test libraries;
javascript.js - contains the entire solution;
qunit-2.9.2.js - contains test library qunit for unit testing; library has been downloaded from http://qunitjs.com/
qunit-2.9.2.css - contains css for the library qunit; file has been downloaded from http://qunitjs.com/
test.js - contains a package of unit tests for the task;

For the package correct processing you need to execute index.html file. Tests will run immediately. To execute pure javascript.js file delete (or comment out) the strings
....
<script src="qunit-2.9.2.js" type="text/javascript"></script>
....
<script src="test.js" type="text/javascript"></script>
....
in index.html document, then overload the page in browser. Developer mode of the browser should be switched on.

The task was completed using ES6 JavaScript notation, for correct operating use browsers supporting ES6.