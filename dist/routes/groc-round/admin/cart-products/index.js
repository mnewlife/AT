"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var coreValidationAdd = require("../../../core/validation-add");
var coreValidationUpdate = require("../../../core/validation-update");
var validationAdd = require("../../validation-add");
var validationUpdate = require("../../validation-update");
/******************************************************************************/
exports.default = function (findCartProducts, findCartProductById, createCartProduct, updateCartProductById, removeCartProductById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getCartProducts", getCartProducts);
    router.get("/getCartProduct/:cartProductId", getCartProduct);
    router.post("/addCartProduct", addCartProduct);
    router.post("/updateCartProduct/:cartProductId", updateCartProduct);
    router.get("/deleteCartProduct/:cartProductId", deleteCartProduct);
    /*********************************************************/
    function getCartProducts(req, res, next) {
        var innerContext = "get-cartProducts";
        return findCartProducts(null, null, null)
            .then(function (foundCartProducts) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundCartProducts: foundCartProducts,
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
    function getCartProduct(req, res, next) {
        var innerContext = "get-cartProduct";
        if (!req.params.cartProductId) {
            return sendResponse(res, "grocRound-admin", false, "CartProduct ID is missing", {
                innerContext: innerContext
            });
        }
        return findCartProductById(req.params.cartProductId)
            .then(function (foundCartProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundCartProduct: foundCartProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find cartProduct", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addCartProduct(req, res, next) {
        var innerContext = "add-cartProduct";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            user: req.body.user,
            round: req.body.round,
            cartId: req.body.cartId,
            product: req.body.product
        };
        return createCartProduct(details)
            .then(function (createdCartProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedCartProduct: createdCartProduct,
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
    function updateCartProduct(req, res, next) {
        var innerContext = "update-cartProduct";
        if (!req.params.cartProductId) {
            return sendResponse(res, "grocRound-admin", false, "CartProduct ID is missing", {
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
        if (req.body.cartId) {
            details.cartId = req.body.cartId;
        }
        if (req.body.product) {
            details.product = req.body.product;
        }
        return updateCartProductById(req.params.cartProductId, details)
            .then(function (updatedCartProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedCartProduct: updatedCartProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find cartProduct", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteCartProduct(req, res, next) {
        var innerContext = "delete-cartProduct";
        if (!req.params.cartProductId) {
            return sendResponse(res, "grocRound-admin", false, "CartProduct ID is missing", {
                innerContext: innerContext
            });
        }
        return removeCartProductById(req.params.cartProductId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find cartProduct", {
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
        if (req.body.cartId && typeof req.body.cartId == "string") {
            return true;
        }
        if (validationUpdate.product(req)) {
            return true;
        }
        if (req.body.quantity && typeof req.body.quantity == "number") {
            return false;
        }
        if (req.body.value && typeof req.body.value == "number") {
            return false;
        }
        return false;
    }
    /*********************************************************/
    function invalidAddDetails(req) {
        if (coreValidationAdd.user(req)) {
            return true;
        }
        if (validationAdd.round(req)) {
            return true;
        }
        if (!req.body.cartId || typeof req.body.cartId !== "string") {
            return true;
        }
        if (validationAdd.product(req)) {
            return true;
        }
        if (!req.body.quantity || typeof req.body.quantity !== "number") {
            return false;
        }
        if (!req.body.value || typeof req.body.value !== "number") {
            return false;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
