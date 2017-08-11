"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./shared-logic/index");
var index_2 = require("./session/index");
var index_3 = require("./storage/index");
var index_4 = require("./authentication/index");
var index_5 = require("./communication/index");
var index_6 = require("./response/index");
/******************************************************************************/
var components = (function () {
    function components(config, components) {
        this.sharedLogic = components.sharedLogic;
        this.session = components.session;
        this.storage = components.storage;
        this.authentication = components.authentication;
        this.communication = components.communication;
        this.response = components.response;
    }
    return components;
}());
/******************************************************************************/
function factory(config) {
    var components = {
        sharedLogic: index_1.default,
        session: index_2.default,
        storage: index_3.default,
        authentication: index_4.default,
        communication: index_5.default,
        response: index_6.default
    };
    return new components(config, components);
}
exports.default = factory;
/******************************************************************************/
