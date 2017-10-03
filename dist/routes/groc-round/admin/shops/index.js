"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (findShops, findShopById, createShop, updateShopById, removeShopById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getShops", getShops);
    router.get("/getShop/:shopId", getShop);
    router.post("/addShop", addShop);
    router.post("/updateShop/:shopId", updateShop);
    router.get("/deleteShop/:shopId", deleteShop);
    /*********************************************************/
    function getShops(req, res, next) {
        var innerContext = "get-shops";
        return findShops(null, null, null)
            .then(function (foundShops) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundShops: foundShops,
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
    function getShop(req, res, next) {
        var innerContext = "get-shop";
        if (!req.params.shopId) {
            return sendResponse(res, "grocRound-admin", false, "Shop ID is missing", {
                innerContext: innerContext
            });
        }
        return findShopById(req.params.shopId)
            .then(function (foundShop) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundShop: foundShop,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find shop", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addShop(req, res, next) {
        var innerContext = "add-shop";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            shopName: req.body.shopName,
            numProducts: 0
        };
        if (req.body.images) {
            details.images = [];
            req.body.images.forEach(function (image) {
                details.images.push(image);
            });
        }
        return createShop(details)
            .then(function (createdShop) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedShop: createdShop,
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
    function updateShop(req, res, next) {
        var innerContext = "update-shop";
        if (!req.params.shopId) {
            return sendResponse(res, "grocRound-admin", false, "Update id is missing", {
                innerContext: innerContext
            });
        }
        if (invalidUpdateDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {};
        if (req.body.shopName) {
            details.shopName = req.body.shopName;
        }
        if (req.body.images) {
            details.images = req.body.images;
        }
        return updateShopById(req.params.shopId, details)
            .then(function (updatedShop) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedShop: updatedShop,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find shop", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteShop(req, res, next) {
        var innerContext = "delete-shop";
        if (!req.params.shopId) {
            return sendResponse(res, "grocRound-admin", false, "Shop ID is missing", {
                innerContext: innerContext
            });
        }
        return removeShopById(req.params.shopId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find shop", {
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
        if (req.body.shopName && typeof req.body.shopName !== "string") {
            return true;
        }
        if (req.body.images && !Array.isArray(req.body.images)) {
            return true;
        }
        req.body.images.forEach(function (image) {
            if (typeof image !== "string") {
                return true;
            }
        });
        if (req.body.numProducts && typeof req.body.numProducts !== "number") {
            return true;
        }
        return false;
    }
    /*********************************************************/
    function invalidAddDetails(req) {
        if (!req.body.shopName || typeof req.body.shopName !== "string") {
            return true;
        }
        if (req.body.images) {
            if (!Array.isArray(req.body.images)) {
                return true;
            }
            req.body.images.forEach(function (image) {
                if (typeof image !== "string") {
                    return true;
                }
            });
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
