"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//import profile from "./profile";
var registration_1 = require("./registration");
/******************************************************************************/
exports.default = function (components, procedures, helpers) {
    /**********************************************************/
    var router = express.Router();
    /**********************************************************/
    router.use("/registration", registration_1.default(components.storage.core.user.get, components.helpers.numbers.generateRandomNumber, components.authentication.createHashedPassword, components.storage.core.user.add, procedures.core.common.mailTemplates.newEmailAddress, components.communication.mailAgent.sendEmail, components.response.send));
    /**********************************************************/
    router.get("/", authCheck, function (req, res, next) {
        return components.response.send(res, "core-consumer", true, null, {
            currentUser: res.locals.currentUser
        });
    });
    /**********************************************************/
    function authCheck(req, res, next) {
        if (!components.session.signedIn(req)) {
            return signInFirst();
        }
        return components.session.getCurrentUser(req)
            .then(function (currentUser) {
            if (currentUser.accessLevel == "consumer") {
                res.locals.currentUser = currentUser;
                return next();
            }
            else {
                return signInFirst();
            }
        });
        function signInFirst() {
            return components.response.send(res, "passpoint", false, "You need to sign in first", null);
        }
    }
    /**********************************************************/
    return router;
};
/******************************************************************************/ 
