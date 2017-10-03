"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var blocks = require("../../../validation/validation-blocks");
var v = require("../../../validation/validation-revised");
/******************************************************************************/
exports.default = function (findTracks, findTrackById, createTrack, updateTrackById, removeTrackById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getTracks", getTracks);
    router.get("/getTrack/:trackId", getTrack);
    router.post("/addTrack", addTrack);
    router.post("/updateTrack/:trackId", updateTrack);
    router.get("/deleteTrack/:trackId", deleteTrack);
    /*********************************************************/
    function getTracks(req, res, next) {
        var innerContext = "get-tracks";
        return findTracks(null, null, null)
            .then(function (foundTracks) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundTracks: foundTracks,
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
    function getTrack(req, res, next) {
        var innerContext = "get-track";
        if (!req.params.trackId) {
            return sendResponse(res, "grocRound-admin", false, "Track ID is missing", {
                innerContext: innerContext
            });
        }
        return findTrackById(req.params.trackId)
            .then(function (foundTrack) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundTrack: foundTrack,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find track", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addTrack(req, res, next) {
        var innerContext = "add-track";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            round: req.body.round,
            trackName: req.body.trackName,
            contributions: req.body.contributions,
            adminFeePercentage: req.body.adminFeePercentage,
            products: req.body.products
        };
        return createTrack(details)
            .then(function (createdTrack) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedTrack: createdTrack,
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
    function updateTrack(req, res, next) {
        var innerContext = "update-track";
        if (!req.params.trackId) {
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
        if (req.body.trackName) {
            details.trackName = req.body.trackName;
        }
        if (req.body.round) {
            details.round = req.body.round;
        }
        if (req.body.contributions) {
            details.contributions = req.body.contributions;
        }
        if (req.body.adminFeePercentage) {
            details.adminFeePercentage = req.body.adminFeePercentage;
        }
        if (req.body.products) {
            details.products = req.body.products;
        }
        return updateTrackById(req.params.trackId, details)
            .then(function (updatedTrack) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedTrack: updatedTrack,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find track", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteTrack(req, res, next) {
        var innerContext = "delete-track";
        if (!req.params.trackId) {
            return sendResponse(res, "grocRound-admin", false, "Track ID is missing", {
                innerContext: innerContext
            });
        }
        return removeTrackById(req.params.trackId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find track", {
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
        if (v.round.optional(req.body)) {
            return true;
        }
        if (blocks.optionalWrong(req.body, "trackName", "string")) {
            return true;
        }
        var parent = "contributions";
        if (blocks.optionalWrong(req.body, parent, "object")) {
            return true;
        }
        if (blocks.optionalWrong(req.body[parent], "installmentValue", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body[parent], "totalValue", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body, "adminFeePercentage", "number")) {
            return true;
        }
        parent = "products";
        if (blocks.optionalWrong(req.body, parent, "object")) {
            return true;
        }
        if (blocks.optionalWrong(req.body[parent], "num", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body[parent], "value", "number")) {
            return true;
        }
        return false;
    }
    /*********************************************************/
    function invalidAddDetails(req) {
        if (v.round.absent(req.body)) {
            return true;
        }
        if (blocks.absentWrong(req.body, "trackName", "string")) {
            return true;
        }
        var parent = "contributions";
        if (blocks.absentWrong(req.body, parent, "object")) {
            return true;
        }
        if (blocks.absentWrong(req.body[parent], "installmentValue", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body[parent], "totalValue", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body, "adminFeePercentage", "number")) {
            return true;
        }
        parent = "products";
        if (blocks.absentWrong(req.body, parent, "object")) {
            return true;
        }
        if (blocks.absentWrong(req.body[parent], "num", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body[parent], "value", "number")) {
            return true;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
