"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (findUsers, findUserById, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.get("/getUsers", getUsers);
    router.get("/getUser/:userId", getUser);
    /*********************************************************/
    function getUsers(req, res, next) {
        var innerContext = "get-users";
        return findUsers(null, null, null)
            .then(function (foundUsers) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundUsers: foundUsers,
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
    function getUser(req, res, next) {
        var innerContext = "get-user";
        if (!req.params.userId) {
            return sendResponse(res, "grocRound-admin", false, "User ID is missing", {
                innerContext: innerContext
            });
        }
        return findUserById(req.params.userId)
            .then(function (foundUser) {
            return sendResponse(res, "grocRound-admin", true, null, {
                foundUser: foundUser,
                innerContext: innerContext
            });
        })
            .catch(function (reason) {
            if (reason && reason.identifier && reason.identifier === "DocumentNotFound") {
                return sendResponse(res, "grocRound-admin", false, "Couldn't find user", {
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
