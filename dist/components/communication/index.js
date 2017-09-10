"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mail_agent_1 = require("./mail-agent");
var web_socket_1 = require("./web-socket");
/******************************************************************************/
var Communication = (function () {
    function Communication(mailAgent, webSocket) {
        this.mailAgent = mailAgent;
        this.webSocket = webSocket;
        this.middleware = [];
    }
    return Communication;
}());
/******************************************************************************/
exports.default = function (emitEvent, checkThrow, getSubById, production, httpServer) {
    return new Communication(mail_agent_1.default(emitEvent, checkThrow, "allansimoyi@gmail.com", "passwordhere"), web_socket_1.default(emitEvent, checkThrow, getSubById, production, httpServer));
};
/******************************************************************************/
