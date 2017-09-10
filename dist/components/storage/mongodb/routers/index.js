"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var amounts_1 = require("./amounts");
var new_router_stock_1 = require("./new-router-stock");
var sale_1 = require("./sale");
/******************************************************************************/
var Routers = (function () {
    /*****************************************************************/
    function Routers(amounts, newRouterStock, sale) {
        this.amounts = amounts;
        this.newRouterStock = newRouterStock;
        this.sale = sale;
    }
    return Routers;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new Routers(amounts_1.default(emitEvent, mapDetails, checkThrow), new_router_stock_1.default(emitEvent, mapDetails, checkThrow), sale_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
