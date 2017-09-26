"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var shops_1 = require("./shops");
var products_1 = require("./products");
var prices_1 = require("./prices");
/******************************************************************************/
exports.default = function (components, procedures, getAuthCheck) {
    /**********************************************************/
    var router = express.Router();
    /**********************************************************/
    router.use("/shops", shops_1.default(components.storage.grocRound.shop.get, components.storage.grocRound.shop.getById, components.storage.grocRound.shop.add, components.storage.grocRound.shop.updateById, components.storage.grocRound.shop.removeById, components.response.send));
    router.use("/products", products_1.default(components.storage.grocRound.product.get, components.storage.grocRound.product.getById, components.storage.grocRound.product.add, components.storage.grocRound.product.updateById, components.storage.grocRound.product.removeById, components.response.send));
    router.use("/prices", prices_1.default(components.storage.grocRound.price.get, components.storage.grocRound.price.getById, components.storage.grocRound.price.add, components.storage.grocRound.price.updateById, components.storage.grocRound.price.removeById, components.response.send));
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
