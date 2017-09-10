"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("./authentication");
var communication_1 = require("./communication");
var storage_1 = require("./storage");
var session_1 = require("./session");
var response_1 = require("./response");
var helpers_1 = require("./helpers");
/******************************************************************************/
var Components = (function () {
    function Components(helpers, storage, session, authentication, communication, response) {
        this.helpers = helpers;
        this.storage = storage;
        this.session = session;
        this.authentication = authentication;
        this.communication = communication;
        this.response = response;
    }
    return Components;
}());
/******************************************************************************/
exports.default = function (emitEvent, production, httpServer) {
    var helpersInstance = helpers_1.default(emitEvent);
    var storageInstance = storage_1.default(emitEvent, helpersInstance.dataStructures.mapDetails, helpersInstance.moders.checkThrow);
    var sessionInstance = session_1.default(emitEvent, helpersInstance.moders.checkThrow, storageInstance.core.user.getById, production);
    var authenticationInstance = authentication_1.default(emitEvent, helpersInstance.moders.checkThrow, storageInstance.core.user.get, storageInstance.core.user.getById, sessionInstance.setCurrentUser, sessionInstance.getCurrentUser, sessionInstance.signOut);
    var communicationInstance = communication_1.default(emitEvent, helpersInstance.moders.checkThrow, "", production, httpServer);
    var responseInstance = response_1.default(emitEvent);
    return new Components(helpersInstance, storageInstance, sessionInstance, authenticationInstance, communicationInstance, responseInstance);
};
/******************************************************************************/ 
