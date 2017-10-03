"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var article_1 = require("./article");
var cart_1 = require("./cart");
var cart_product_1 = require("./cart-product");
var contribution_1 = require("./contribution");
var delivery_fee_1 = require("./delivery-fee");
var product_1 = require("./product");
var round_1 = require("./round");
var round_contributor_1 = require("./round-contributor");
var shop_1 = require("./shop");
var track_1 = require("./track");
var track_product_1 = require("./track-product");
/******************************************************************************/
var GrocRound = (function () {
    /*****************************************************************/
    function GrocRound(article, cart, cartProduct, contribution, deliveryFee, product, round, roundContributor, shop, track, trackProduct) {
        this.article = article;
        this.cart = cart;
        this.cartProduct = cartProduct;
        this.contribution = contribution;
        this.deliveryFee = deliveryFee;
        this.product = product;
        this.round = round;
        this.roundContributor = roundContributor;
        this.shop = shop;
        this.track = track;
        this.trackProduct = trackProduct;
    }
    return GrocRound;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new GrocRound(article_1.default(emitEvent, mapDetails, checkThrow), cart_1.default(emitEvent, mapDetails, checkThrow), cart_product_1.default(emitEvent, mapDetails, checkThrow), contribution_1.default(emitEvent, mapDetails, checkThrow), delivery_fee_1.default(emitEvent, mapDetails, checkThrow), product_1.default(emitEvent, mapDetails, checkThrow), round_1.default(emitEvent, mapDetails, checkThrow), round_contributor_1.default(emitEvent, mapDetails, checkThrow), shop_1.default(emitEvent, mapDetails, checkThrow), track_1.default(emitEvent, mapDetails, checkThrow), track_product_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
