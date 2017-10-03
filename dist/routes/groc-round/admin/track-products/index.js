"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var blocks = require("../../../validation/validation-blocks");
var v = require("../../../validation/validation-revised");
/******************************************************************************/
exports.default = function (findTrackProducts, findTrackProductById, createTrackProduct, updateTrackProductById, removeTrackProductById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getTrackProducts", getTrackProducts);
    router.get("/getTrackProduct/:trackProductId", getTrackProduct);
    router.post("/addTrackProduct", addTrackProduct);
    router.post("/updateTrackProduct/:trackProductId", updateTrackProduct);
    router.get("/deleteTrackProduct/:trackProductId", deleteTrackProduct);
    /*********************************************************/
    function getTrackProducts(req, res, next) {
        var innerContext = "get-trackProducts";
        return findTrackProducts(null, null, null)
            .then(function (foundTrackProducts) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundTrackProducts: foundTrackProducts,
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
    function getTrackProduct(req, res, next) {
        var innerContext = "get-trackProduct";
        if (!req.params.trackProductId) {
            return sendResponse(res, "grocRound-admin", false, "TrackProduct ID is missing", {
                innerContext: innerContext
            });
        }
        return findTrackProductById(req.params.trackProductId)
            .then(function (foundTrackProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundTrackProduct: foundTrackProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find trackProduct", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addTrackProduct(req, res, next) {
        var innerContext = "add-trackProduct";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            track: req.body.track,
            product: req.body.product,
            quantity: req.body.quantity,
            value: req.body.value
        };
        return createTrackProduct(details)
            .then(function (createdTrackProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedTrackProduct: createdTrackProduct,
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
    function updateTrackProduct(req, res, next) {
        var innerContext = "update-trackProduct";
        if (!req.params.trackProductId) {
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
        if (req.body.track) {
            details.track = req.body.track;
        }
        if (req.body.product) {
            details.product = req.body.product;
        }
        if (req.body.quantity) {
            details.quantity = req.body.quantity;
        }
        if (req.body.value) {
            details.value = req.body.value;
        }
        return updateTrackProductById(req.params.trackProductId, details)
            .then(function (updatedTrackProduct) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedTrackProduct: updatedTrackProduct,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find trackProduct", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteTrackProduct(req, res, next) {
        var innerContext = "delete-trackProduct";
        if (!req.params.trackProductId) {
            return sendResponse(res, "grocRound-admin", false, "TrackProduct ID is missing", {
                innerContext: innerContext
            });
        }
        return removeTrackProductById(req.params.trackProductId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find trackProduct", {
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
        if (v.track.absent(req.body)) {
            return true;
        }
        if (v.product.absent(req.body)) {
            return true;
        }
        if (blocks.absentWrong(req.body, "quantity", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body, "value", "number")) {
            return true;
        }
        return false;
    }
    /*********************************************************/
    function invalidAddDetails(req) {
        if (v.track.absent(req.body)) {
            return true;
        }
        if (v.product.absent(req.body)) {
            return true;
        }
        if (blocks.absentWrong(req.body, "quantity", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body, "value", "number")) {
            return true;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
