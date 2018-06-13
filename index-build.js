"use strict";

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;
var vcap_services = process.env.VCAP_SERVICES;
app.use((0, _compression2.default)());
app.enable("trust proxy");

_fs2.default.writeFileSync("./env.js", "var VCAP_SERVICES = " + process.env.VCAP_SERVICES + ";");

app.use(_express2.default.static("./build"));
app.use(_express2.default.static("./env.js"));

app.get("*", function (req, res) {
    res.sendFile(_path2.default.join(__dirname, "build", "index.html"));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("App and API are live at http://localhost:" + port);
    console.log("VCAP_SERVICES ARE: " + vcap_services);
});
