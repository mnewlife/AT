"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cart_products_1 = require("./cart-products");
var carts_1 = require("./carts");
var contributions_1 = require("./contributions");
var delivery_fees_1 = require("./delivery-fees");
var products_1 = require("./products");
var round_contributors_1 = require("./round-contributors");
var rounds_1 = require("./rounds");
var shops_1 = require("./shops");
var users_1 = require("./users");
var track_products_1 = require("./track-products");
var tracks_1 = require("./tracks");
/******************************************************************************/
exports.default = function (components, procedures, getAuthCheck) {
    /**********************************************************/
    var router = express.Router();
    /**********************************************************/
    router.use("/cartProducts", cart_products_1.default(components.storage.grocRound.cartProduct.get, components.storage.grocRound.cartProduct.getById, components.storage.grocRound.cartProduct.add, components.storage.grocRound.cartProduct.updateById, components.storage.grocRound.cartProduct.removeById, components.response.send));
    router.use("/carts", carts_1.default(components.storage.grocRound.cart.get, components.storage.grocRound.cart.getById, components.storage.grocRound.cart.updateById, components.response.send));
    router.use("/contributions", contributions_1.default(components.storage.grocRound.contribution.get, components.storage.grocRound.contribution.getById, components.storage.grocRound.contribution.add, components.storage.grocRound.contribution.updateById, components.storage.grocRound.contribution.removeById, components.response.send));
    router.use("/deliveryFees", delivery_fees_1.default(components.storage.grocRound.deliveryFee.get, components.storage.grocRound.deliveryFee.getById, components.storage.grocRound.deliveryFee.add, components.storage.grocRound.deliveryFee.updateById, components.storage.grocRound.deliveryFee.removeById, components.response.send));
    router.use("/products", products_1.default(components.storage.grocRound.product.get, components.storage.grocRound.product.getById, components.storage.grocRound.product.add, components.storage.grocRound.product.updateById, components.storage.grocRound.product.removeById, components.response.send));
    router.use("/roundContributors", round_contributors_1.default(components.storage.grocRound.roundContributor.get, components.storage.grocRound.roundContributor.getById, components.storage.grocRound.roundContributor.add, components.storage.grocRound.roundContributor.updateById, components.storage.grocRound.roundContributor.removeById, components.response.send));
    router.use("/rounds", rounds_1.default(components.storage.grocRound.round.get, components.storage.grocRound.round.getById, components.storage.grocRound.round.add, components.storage.grocRound.round.updateById, components.storage.grocRound.round.removeById, components.response.send));
    router.use("/shops", shops_1.default(components.storage.grocRound.shop.get, components.storage.grocRound.shop.getById, components.storage.grocRound.shop.add, components.storage.grocRound.shop.updateById, components.storage.grocRound.shop.removeById, components.response.send));
    router.use("/trackProducts", track_products_1.default(components.storage.grocRound.trackProduct.get, components.storage.grocRound.trackProduct.getById, components.storage.grocRound.trackProduct.add, components.storage.grocRound.trackProduct.updateById, components.storage.grocRound.trackProduct.removeById, components.response.send));
    router.use("/tracks", tracks_1.default(components.storage.grocRound.track.get, components.storage.grocRound.track.getById, components.storage.grocRound.track.add, components.storage.grocRound.track.updateById, components.storage.grocRound.track.removeById, components.response.send));
    router.use("/users", users_1.default(components.storage.core.user.get, components.storage.core.user.getById, components.response.send));
    /**********************************************************/
    router.get("/", getAuthCheck("admin", "grocRound-admin"), function (req, res, next) {
        return components.response.send(res, "grocRound-admin", true, null, {
            currentUser: res.locals.currentUser
        });
    });
    /**********************************************************/
    return router;
};
/******************************************************************************/
