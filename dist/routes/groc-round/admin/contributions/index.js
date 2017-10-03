"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var coreValidationAdd = require("../../../core/validation-add");
var coreValidationUpdate = require("../../../core/validation-update");
var validationAdd = require("../../validation-add");
var validationUpdate = require("../../validation-update");
/******************************************************************************/
exports.default = function (findContributions, findContributionById, createContribution, updateContributionById, removeContributionById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getContributions", getContributions);
    router.get("/getContribution/:contributionId", getContribution);
    router.post("/addContribution", addContribution);
    router.post("/updateContribution/:contributionId", updateContribution);
    router.get("/deleteContribution/:contributionId", deleteContribution);
    /*********************************************************/
    function getContributions(req, res, next) {
        var innerContext = "get-contributions";
        return findContributions(null, null, null)
            .then(function (foundContributions) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundContributions: foundContributions,
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
    function getContribution(req, res, next) {
        var innerContext = "get-contribution";
        if (!req.params.contributionId) {
            return sendResponse(res, "grocRound-admin", false, "Contribution ID is missing", {
                innerContext: innerContext
            });
        }
        return findContributionById(req.params.contributionId)
            .then(function (foundContribution) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundContribution: foundContribution,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find contribution", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function addContribution(req, res, next) {
        var innerContext = "add-contribution";
        if (invalidAddDetails(req)) {
            return sendResponse(res, "grocRound-admin", false, "Something wrong with the data you sent", {
                innerContext: innerContext
            });
        }
        var details = {
            user: req.body.user,
            round: req.body.round,
            payment: req.body.payment
        };
        return createContribution(details)
            .then(function (createdContribution) {
            return sendResponse(res, "grocRound-admin", true, null, {
                addedContribution: createdContribution,
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
    function updateContribution(req, res, next) {
        var innerContext = "update-contribution";
        if (!req.params.contributionId) {
            return sendResponse(res, "grocRound-admin", false, "Contribution ID is missing", {
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
        return updateContributionById(req.params.contributionId, details)
            .then(function (updatedContribution) {
            return sendResponse(res, "grocRound-admin", true, null, {
                updatedContribution: updatedContribution,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find contribution", {
                    innerContext: innerContext
                });
            }
            return sendResponse(res, "grocRound-admin", false, null, {
                innerContext: innerContext
            });
        });
    }
    /*********************************************************/
    function deleteContribution(req, res, next) {
        var innerContext = "delete-contribution";
        if (!req.params.contributionId) {
            return sendResponse(res, "grocRound-admin", false, "Contribution ID is missing", {
                innerContext: innerContext
            });
        }
        return removeContributionById(req.params.contributionId)
            .then(function (response) {
            return sendResponse(res, "grocRound-admin", true, null, {
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find contribution", {
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
        if (req.body.payment.method && typeof req.body.payment.method !== "string") {
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
        if (req.body.payment.method && typeof req.body.payment.method !== "string") {
            return true;
        }
        return false;
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
