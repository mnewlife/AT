"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var price_1 = require("./price");
var product_1 = require("./product");
var shop_1 = require("./shop");
/******************************************************************************/
var GrocRound = (function () {
    /*****************************************************************/
    function GrocRound(price, product, shop) {
        this.price = price;
        this.product = product;
        this.shop = shop;
    }
    return GrocRound;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new GrocRound(price_1.default(emitEvent, mapDetails, checkThrow), product_1.default(emitEvent, mapDetails, checkThrow), shop_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
