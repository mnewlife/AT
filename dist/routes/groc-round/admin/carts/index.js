"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var coreValidationUpdate = require("../../../core/validation-update");
var validationUpdate = require("../../validation-update");
/******************************************************************************/
exports.default = function (findCarts, findCartById, updateCartById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getCarts", getCarts);
    router.get("/getCart/:cartId", getCart);
    router.post("/updateCart/:cartId", updateCart);
    /*********************************************************/
    function getCarts(req, res, next) {
        var innerContext = "get-carts";
        return findCarts(null, null, null)
            .then(function (foundCarts) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundCarts: foundCarts,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function getCart(req, res, next) {
        var innerContext = "get-cart";
        if (!req.params.cartId) {
            return sendResponse(res, "grocRound-admin", false, "Cart ID is missing", {
                innerContext: innerContext
            });
        }
        return findCartById(req.params.cartId)
            .then(function (foundCart) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundCart: foundCart,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find cart", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function updateCart(req, res, next) {
        var innerContext = "update-cart";
        if (!req.params.cartId) {
            return sendResponse(res, "grocRound-admin", false, "Cart ID is missing", {
                innerContext: innerContext
            });
        }
        if (invalidUpdateDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {};
        if (req.body.user) {
            details.user = req.body.user;
        }
        if (req.body.round) {
            details.round = req.body.round;
        }
        if (req.body.adminFeePercentage) {
            details.adminFeePercentage = req.body.adminFeePercentage;
        }
        if (req.body.numProducts) {
            details.numProducts = req.body.numProducts;
        }
        if (req.body.valueProducts) {
            details.valueProducts = req.body.valueProducts;
        }
        return updateCartById(req.params.cartId, details)
            .then(function (updatedCart) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedCart: updatedCart,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find cart", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function invalidUpdateDetails(req) {
        if (coreValidationUpdate.user(req)) {
            return true;
        }
        if (validationUpdate.round(req)) {
            return true;
        }
        if (req.body.adminFeePercentage && typeof req.body.adminFeePercentage !== "number") {
            return true;
        }
        if (req.body.numProducts && typeof req.body.numProducts !== "number") {
            return true;
        }
        if (req.body.valueProducts && typeof req.body.valueProducts !== "number") {
            return true;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
