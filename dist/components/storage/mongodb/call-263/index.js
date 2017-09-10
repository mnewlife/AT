"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var airtime_payment_1 = require("./airtime-payment");
var airtime_transfer_1 = require("./airtime-transfer");
var channel_1 = require("./channel");
/******************************************************************************/
var Call263 = (function () {
    /*****************************************************************/
    function Call263(airtimePayment, airtimeTransfer, channel) {
        this.airtimePayment = airtimePayment;
        this.airtimeTransfer = airtimeTransfer;
        this.channel = channel;
    }
    return Call263;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new Call263(airtime_payment_1.default(emitEvent, mapDetails, checkThrow), airtime_transfer_1.default(emitEvent, mapDetails, checkThrow), channel_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
