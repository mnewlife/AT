"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var passpoint_1 = require("./passpoint");
//import call263 from "./call-263";
var core_1 = require("./core");
var groc_round_1 = require("./groc-round");
//import powertel from "./powertel";
//import routers from "./routers";
/******************************************************************************/
exports.default = function (eventListener, components, procedures, app) {
    /**********************************************************/
    var helpers = new helpers_1.default(components.helpers.moders.checkThrow, components.session.signedIn, components.session.getCurrentUser, components.response.send);
    app.use("/passpoint", passpoint_1.default(components.response.send, helpers.validateAppContext));
    //app.use( "/call263", call263() );
    app.use("/core", core_1.default(components, procedures, helpers));
    app.use("/grocRound", groc_round_1.default(components, procedures, helpers));
    //app.use( "/powertel", powertel() );
    //app.use( "/routers", routers() );
    /**********************************************************/
    app.get("/", function (req, res, next) {
        if (components.session.signedIn(req)) {
            return components.authentication.getCurrentUser(req)
                .then(function (currentUser) {
                return components.response.send(res, "about", true, null, { currentUser: currentUser });
            });
        }
        return components.response.send(res, "about", true, null, null);
    });
    /**********************************************************/
};
/******************************************************************************/
