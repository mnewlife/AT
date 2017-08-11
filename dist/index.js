"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express = require("express");
var path = require("path");
var helmet = require("helmet");
var favicon = require("serve-favicon");
var compression = require("compression");
var bodyParser = require("body-parser");
/******************************************************************************/
var index_1 = require("./setup-config/index");
var index_2 = require("./components/index");
var index_3 = require("./tasks/index");
var index_4 = require("./routes/index");
/******************************************************************************/
var components = index_2.default(index_1.default);
var tasks = index_3.default(index_1.default);
index_1.default.registerReferences(components, tasks);
/******************************************************************************/
// INITIALIZE EXPRESS FRAMEWORK
// CREATE HTTP SERVER
var app = express();
var server = http.createServer(app);
/******************************************************************************/
app.set("trust proxy", 1);
app.set("views", "./public");
app.set("view engine", "pug");
app.locals.basedir = __dirname + "/public";
/*************************************************/
var mware = {
    helmet: [helmet()],
    favicon: [favicon(path.join(__dirname, "/public/favicon.ico"))],
    compression: [compression()],
    express_static: [express.static(__dirname + "/public")],
    bodyParser_urlEncoded: [bodyParser.urlencoded({ extended: false })],
    bodyParser_json: [bodyParser.json()]
};
for (var utility in components) {
    if (components.hasOwnProperty(utility)) {
        components.sharedLogic.middleware.retrieveMwareLists(mware, components[utility]);
    }
}
for (var component in tasks) {
    if (tasks.hasOwnProperty(component)) {
        components.sharedLogic.middleware.retrieveMwareLists(mware, tasks[component]);
    }
}
/*************************************************/
// First - Middleware runs before route middleware
var mware_order = [
    "helmet",
    "favicon",
    "compression",
    "express_static",
    "bodyParser_urlEncoded",
    "bodyParser_json",
    "session",
    "authentication"
];
mware_order.forEach(function (subject) {
    if (mware[subject] && mware[subject].length) {
        mware[subject].forEach(function (middleware) {
            app.use([middleware]);
        });
    }
});
/******************************************************************************/
index_4.default(index_1.default, app);
/******************************************************************************/
// Third - Last error handler middleware
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    var message = (err.stack) ? err.stack : err;
    if (message) {
        console.log("Last Error Handler: " + message);
    }
    else {
        console.log("Last Error Handler: Couldn't retrieve error info");
    }
    res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again."
    });
});
/******************************************************************************/
/*******************************************************************************/
server.listen(process.env.PORT || 1111, function () {
    var port = server.address().port;
    console.log(index_1.default.environment.applicationName + " now running on port : " + port);
});
/*******************************************************************************/
/*******************************************************************************/
