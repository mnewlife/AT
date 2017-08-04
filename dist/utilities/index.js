"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./shared-logic/index");
var index_2 = require("./session-manager/index");
var index_3 = require("./storage-manager/index");
var index_4 = require("./authentication-manager/index");
var index_5 = require("./communication-manager/index");
var index_6 = require("./response-manager/index");
/******************************************************************************/
var Utilities = (function () {
    function Utilities(config, utilities) {
        this.sharedLogic = utilities.sharedLogic;
        this.sessionManager = utilities.sessionManager;
        this.storageManager = utilities.storageManager;
        this.authenticationManager = utilities.authenticationManager;
        this.communicationManager = utilities.communicationManager;
        this.responseManager = utilities.responseManager;
    }
    return Utilities;
}());
/******************************************************************************/
function factory(config) {
    var utilities = {
        sharedLogic: index_1.default,
        sessionManager: index_2.default,
        storageManager: index_3.default,
        authenticationManager: index_4.default,
        communicationManager: index_5.default,
        responseManager: index_6.default
    };
    return new Utilities(config, utilities);
}
exports.default = factory;
/******************************************************************************/
