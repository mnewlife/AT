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
var environment_1 = require("./environment");
var event_listener_1 = require("./event-listener");
var components_1 = require("./components");
var procedures_1 = require("./procedures");
var routes_1 = require("./routes");
/******************************************************************************/
var app = express();
var server = http.createServer(app);
/******************************************************************************/
// emitEvent: eventListener.Emit, production: boolean, httpServer: http.Server
var eventListenerInstance = event_listener_1.default();
var componentsInstance = components_1.default(eventListenerInstance.emit, environment_1.default.production, server);
var proceduresInstance = procedures_1.default(eventListenerInstance.emit, componentsInstance);
eventListenerInstance.updateReferences(componentsInstance, proceduresInstance);
/******************************************************************************/
app.set("trust proxy", 1);
app.set("views", "./views");
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
var indexableComponents = {
    helpers: componentsInstance.helpers,
    storage: componentsInstance.storage,
    session: componentsInstance.session,
    authentication: componentsInstance.authentication,
    communication: componentsInstance.communication,
    response: componentsInstance.response
};
for (var utility in indexableComponents) {
    if (indexableComponents.hasOwnProperty(utility)) {
        componentsInstance.helpers.mware.retrieveMwareLists(mware, utility, indexableComponents[utility]);
    }
}
/*************************************************/
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
routes_1.default(eventListenerInstance, componentsInstance, proceduresInstance, app);
/******************************************************************************/
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
/*******************************************************************************/
server.listen(process.env.PORT || 1111, function () {
    var port = server.address().port;
    console.log(environment_1.default.applicationName + " now running on port : " + port);
});
/*******************************************************************************/
