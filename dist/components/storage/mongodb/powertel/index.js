"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var airtime_1 = require("./airtime");
var airtime_sale_1 = require("./airtime-sale");
var card_1 = require("./card");
var card_sale_1 = require("./card-sale");
var new_airtime_stock_1 = require("./new-airtime-stock");
var new_card_stock_1 = require("./new-card-stock");
/******************************************************************************/
var Powertel = (function () {
    /*****************************************************************/
    function Powertel(airtime, airtimeSale, card, cardSale, newAirtimeStock, newCardStock) {
        this.airtime = airtime;
        this.airtimeSale = airtimeSale;
        this.card = card;
        this.cardSale = cardSale;
        this.newAirtimeStock = newAirtimeStock;
        this.newCardStock = newCardStock;
    }
    return Powertel;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new Powertel(airtime_1.default(emitEvent, mapDetails, checkThrow), airtime_sale_1.default(emitEvent, mapDetails, checkThrow), card_1.default(emitEvent, mapDetails, checkThrow), card_sale_1.default(emitEvent, mapDetails, checkThrow), new_airtime_stock_1.default(emitEvent, mapDetails, checkThrow), new_card_stock_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
