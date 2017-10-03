"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var coreValidationAdd = require("../../../core/validation-add");
var coreValidationUpdate = require("../../../core/validation-update");
var validationAdd = require("../../validation-add");
var validationUpdate = require("../../validation-update");
/******************************************************************************/
exports.default = function (findDeliveryFees, findDeliveryFeeById, createDeliveryFee, updateDeliveryFeeById, removeDeliveryFeeById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getDeliveryFees", getDeliveryFees);
    router.get("/getDeliveryFee/:deliveryFeeId", getDeliveryFee);
    router.post("/addDeliveryFee", addDeliveryFee);
    router.post("/updateDeliveryFee/:deliveryFeeId", updateDeliveryFee);
    router.get("/deleteDeliveryFee/:deliveryFeeId", deleteDeliveryFee);
    /*********************************************************/
    function getDeliveryFees(req, res, next) {
        var innerContext = "get-deliveryFees";
        return findDeliveryFees(null, null, null)
            .then(function (foundDeliveryFees) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundDeliveryFees: foundDeliveryFees,
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
    function getDeliveryFee(req, res, next) {
        var innerContext = "get-deliveryFee";
        if (!req.params.deliveryFeeId) {
            return sendResponse(res, "grocRound-admin", false, "DeliveryFee ID is missing", {
                innerContext: innerContext
            });
        }
        return findDeliveryFeeById(req.params.deliveryFeeId)
            .then(function (foundDeliveryFee) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundDeliveryFee: foundDeliveryFee,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find deliveryFee", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addDeliveryFee(req, res, next) {
        var innerContext = "add-deliveryFee";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something is wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            user: req.body.user,
            round: req.body.round,
            payment: req.body.payment
        };
        return createDeliveryFee(details)
            .then(function (createdDeliveryFee) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedDeliveryFee: createdDeliveryFee,
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
    function updateDeliveryFee(req, res, next) {
        var innerContext = "update-deliveryFee";
        if (!req.params.deliveryFeeId) {
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
        if (req.body.user) {
            details.user = req.body.user;
        }
        if (req.body.round) {
            details.round = req.body.round;
        }
        if (req.body.payment) {
            details.payment = req.body.payment;
        }
        return updateDeliveryFeeById(req.params.deliveryFeeId, details)
            .then(function (updatedDeliveryFee) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedDeliveryFee: updatedDeliveryFee,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find deliveryFee", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteDeliveryFee(req, res, next) {
        var innerContext = "delete-deliveryFee";
        if (!req.params.deliveryFeeId) {
            return sendResponse(res, "grocRound-admin", false, "DeliveryFee ID is missing", {
                innerContext: innerContext
            });
        }
        return removeDeliveryFeeById(req.params.deliveryFeeId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find deliveryFee", {
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
        if (req.body.payment && typeof req.body.payment !== "object") {
            return true;
        }
        if (req.body.payment.identifier && typeof req.body.payment.identifier !== "string") {
            return true;
        }
        if (req.body.payment.amount && typeof req.body.payment.amount !== "number") {
            return true;
        }
        if (req.body.payment.identifier && typeof req.body.payment.identifier !== "string") {
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
        if (!req.body.payment || typeof req.body.payment !== "object") {
            return true;
        }
        if (!req.body.payment.identifier || typeof req.body.payment.identifier !== "string") {
            return true;
        }
        if (!req.body.payment.amount || typeof req.body.payment.amount !== "number") {
            return true;
        }
        if (!req.body.payment.identifier || typeof req.body.payment.identifier !== "string") {
            return true;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
