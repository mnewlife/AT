"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var coreValidationAdd = require("../../../core/validation-add");
var coreValidationUpdate = require("../../../core/validation-update");
var validationAdd = require("../../validation-add");
var validationUpdate = require("../../validation-update");
var blocks = require("../../../validation/validation-blocks");
/******************************************************************************/
exports.default = function (findRoundContributors, findRoundContributorById, createRoundContributor, updateRoundContributorById, removeRoundContributorById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getRoundContributors", getRoundContributors);
    router.get("/getRoundContributor/:roundContributorId", getRoundContributor);
    router.post("/addRoundContributor", addRoundContributor);
    router.post("/updateRoundContributor/:roundContributorId", updateRoundContributor);
    router.get("/deleteRoundContributor/:roundContributorId", deleteRoundContributor);
    /*********************************************************/
    function getRoundContributors(req, res, next) {
        var innerContext = "get-roundContributors";
        return findRoundContributors(null, null, null)
            .then(function (foundRoundContributors) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundRoundContributors: foundRoundContributors,
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
    function getRoundContributor(req, res, next) {
        var innerContext = "get-roundContributor";
        if (!req.params.roundContributorId) {
            return sendResponse(res, "grocRound-admin", false, "RoundContributor ID is missing", {
                innerContext: innerContext
            });
        }
        return findRoundContributorById(req.params.roundContributorId)
            .then(function (foundRoundContributor) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundRoundContributor: foundRoundContributor,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find roundContributor", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addRoundContributor(req, res, next) {
        var innerContext = "add-roundContributor";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            round: req.body.round,
            user: req.body.user,
            contributions: req.body.contributions,
            tracks: req.body.tracks,
            cart: req.body.cart,
            deliveryFees: req.body.deliveryFees,
            complete: req.body.complete
        };
        return createRoundContributor(details)
            .then(function (createdRoundContributor) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedRoundContributor: createdRoundContributor,
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
    function updateRoundContributor(req, res, next) {
        var innerContext = "update-roundContributor";
        if (!req.params.roundContributorId) {
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
        if (req.body.round) {
            details.round = req.body.round;
        }
        if (req.body.user) {
            details.user = req.body.user;
        }
        if (req.body.contributions) {
            details.contributions = req.body.contributions;
        }
        if (req.body.tracks) {
            details.tracks = req.body.tracks;
        }
        if (req.body.cart) {
            details.cart = req.body.cart;
        }
        if (req.body.deliveryFees) {
            details.deliveryFees = req.body.deliveryFees;
        }
        if (req.body.complete) {
            details.complete = req.body.complete;
        }
        return updateRoundContributorById(req.params.roundContributorId, details)
            .then(function (updatedRoundContributor) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedRoundContributor: updatedRoundContributor,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find roundContributor", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteRoundContributor(req, res, next) {
        var innerContext = "delete-roundContributor";
        if (!req.params.roundContributorId) {
            return sendResponse(res, "grocRound-admin", false, "RoundContributor ID is missing", {
                innerContext: innerContext
            });
        }
        return removeRoundContributorById(req.params.roundContributorId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find roundContributor", {
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
        if (req.body.contributions && typeof req.body.contributions == "object") {
            return true;
        }
        if (req.body.contributions.num && typeof req.body.contributions.num == "number") {
            return true;
        }
        if (req.body.contributions.value && typeof req.body.contributions.value == "number") {
            return true;
        }
        if (req.body.contributions.valueDue && typeof req.body.contributions.valueDue == "number") {
            return true;
        }
        if (req.body.tracks && !Array.isArray(req.body.tracks)) {
            return true;
        }
        if (!req.body.tracks.track.trackId || typeof req.body.tracks.track.trackId !== "string") {
            return true;
        }
        if (!req.body.tracks.track.trackName || typeof req.body.tracks.track.trackName !== "string") {
            return true;
        }
        if (!req.body.deviations || typeof req.body.deviations !== "object") {
            return true;
        }
        for (var kind in ["additions", "subtractions"]) {
            if (!req.body.deviations[kind] || !Array.isArray(req.body.deviations[kind])) {
                return true;
            }
            for (var _i = 0, _a = req.body.deviations[kind]; _i < _a.length; _i++) {
                var deviationKind = _a[_i];
                if (!deviationKind.product || typeof deviationKind.product !== "object") {
                    return true;
                }
                if (!deviationKind.product.productId || typeof deviationKind.product.productId !== "string") {
                    return true;
                }
                if (!deviationKind.product.label || typeof deviationKind.product.label !== "string") {
                    return true;
                }
                if (!deviationKind.quantity || typeof deviationKind.quantity !== "number") {
                    return true;
                }
                if (!deviationKind.value || typeof deviationKind.value !== "number") {
                    return true;
                }
            }
        }
        if (blocks.optionalWrong(req.body, "cart", "object")) {
            return true;
        }
        if (blocks.optionalWrong(req.body.cart, "num", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body.cart, "value", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body, "deliveryFees", "object")) {
            return true;
        }
        if (blocks.optionalWrong(req.body.deliveryFees, "valuePaid", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body.deliveryFees, "valueDue", "number")) {
            return true;
        }
        if (blocks.optionalWrong(req.body, "complete", "boolean")) {
            return true;
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
        if (!req.body.contributions || typeof req.body.contributions !== "object") {
            return true;
        }
        if (!req.body.contributions.num || typeof req.body.contributions.num !== "number") {
            return true;
        }
        if (!req.body.contributions.value || typeof req.body.contributions.value !== "number") {
            return true;
        }
        if (!req.body.contributions.valueDue || typeof req.body.contributions.valueDue !== "number") {
            return true;
        }
        if (!req.body.tracks || !Array.isArray(req.body.tracks)) {
            return true;
        }
        if (!req.body.tracks.track.trackId || typeof req.body.tracks.track.trackId !== "string") {
            return true;
        }
        if (!req.body.tracks.track.trackName || typeof req.body.tracks.track.trackName !== "string") {
            return true;
        }
        if (!req.body.deviations || typeof req.body.deviations !== "object") {
            return true;
        }
        for (var kind in ["additions", "subtractions"]) {
            if (!req.body.deviations[kind] || !Array.isArray(req.body.deviations[kind])) {
                return true;
            }
            for (var _i = 0, _a = req.body.deviations[kind]; _i < _a.length; _i++) {
                var deviationKind = _a[_i];
                if (!deviationKind.product || typeof deviationKind.product !== "object") {
                    return true;
                }
                if (!deviationKind.product.productId || typeof deviationKind.product.productId !== "string") {
                    return true;
                }
                if (!deviationKind.product.label || typeof deviationKind.product.label !== "string") {
                    return true;
                }
                if (!deviationKind.quantity || typeof deviationKind.quantity !== "number") {
                    return true;
                }
                if (!deviationKind.value || typeof deviationKind.value !== "number") {
                    return true;
                }
            }
        }
        if (blocks.absentWrong(req.body, "cart", "object")) {
            return true;
        }
        if (blocks.absentWrong(req.body.cart, "num", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body.cart, "value", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body, "deliveryFees", "object")) {
            return true;
        }
        if (blocks.absentWrong(req.body.deliveryFees, "valuePaid", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body.deliveryFees, "valueDue", "number")) {
            return true;
        }
        if (blocks.absentWrong(req.body, "complete", "boolean")) {
            return true;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
