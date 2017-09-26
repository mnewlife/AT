"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (findPrices, findPriceById, createPrice, updatePriceById, removePriceById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getPrices", getPrices);
    router.get("/getPrice/:priceId", getPrice);
    router.post("/addPrice", addPrice);
    router.post("/updatePrice/:priceId", updatePrice);
    router.get("/deletePrice/:priceId", deletePrice);
    /*********************************************************/
    function getPrices(req, res, next) {
        var innerContext = "get-prices";
        var filtrationCriteria = {};
        if (req.query.productId) {
            filtrationCriteria.productId = req.query.productId;
        }
        if (req.query.shopId) {
            filtrationCriteria.shopId = req.query.shopId;
        }
        return findPrices(filtrationCriteria, null, null)
            .then(function (foundPrices) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundPrices: foundPrices,
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
    function getPrice(req, res, next) {
        var innerContext = "get-price";
        if (!req.params.priceId) {
            return sendResponse(res, "grocRound-admin", false, "Price ID is missing", {
                innerContext: innerContext
            });
        }
        return findPriceById(req.params.priceId)
            .then(function (foundPrice) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundPrice: foundPrice,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find price", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addPrice(req, res, next) {
        var innerContext = "add-price";
        if (!req.body.priceName) {
            return sendResponse(res, "grocRound-admin", false, "Price name is missing", {
                innerContext: innerContext
            });
        }
        var details = {
            productId: req.body.productId,
            shopId: req.body.shopId,
            quantity: req.body.quantity,
            price: req.body.price
        };
        return createPrice(details)
            .then(function (createdPrice) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedPrice: createdPrice,
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
    function updatePrice(req, res, next) {
        var innerContext = "update-price";
        if (!req.params.priceId) {
            return sendResponse(res, "grocRound-admin", false, "Price ID is missing", {
                innerContext: innerContext
            });
        }
        var details = {};
        /**
         * productId: req.body.productId,
          shopId: req.body.shopId,
          quantity: req.body.quantity,
          price: req.body.price
         */
        if (req.body.productId) {
            details.productId = req.body.productId;
        }
        if (req.body.shopId) {
            details.shopId = req.body.shopId;
        }
        if (req.body.quantity) {
            details.quantity = req.body.quantity;
        }
        if (req.body.price) {
            details.price = req.body.price;
        }
        return updatePriceById(req.params.priceId, details)
            .then(function (updatedPrice) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedPrice: updatedPrice,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find price", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deletePrice(req, res, next) {
        var innerContext = "delete-price";
        if (!req.params.priceId) {
            return sendResponse(res, "grocRound-admin", false, "Price ID is missing", {
                innerContext: innerContext
            });
        }
        return removePriceById(req.params.priceId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find price", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
