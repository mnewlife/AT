"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var mongoose = require("mongoose");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var events = new generic_event_class_1.default(emitEvent, "Core|Invitation");
    return new generic_model_class_1.default(events, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.user) {
            if (filtrationCriteria.user.userId) {
                conditions["user.userId"] = mongoose.Types.ObjectId(filtrationCriteria.user.userId);
            }
            if (filtrationCriteria.user.emailAddress) {
                conditions["user.emailAddress"] = filtrationCriteria.user.emailAddress;
            }
            if (filtrationCriteria.user.fullName) {
                conditions["user.fullName"] = filtrationCriteria.user.fullName;
            }
        }
        if (filtrationCriteria.app) {
            conditions["app"] = filtrationCriteria.app;
        }
        if (filtrationCriteria.textSearch) {
            conditions.$text = { $search: filtrationCriteria.textSearch };
        }
        resolve(conditions);
    });
}
/******************************************************************************/
function makeSortCriteria(sortCriteria) {
    return new Promise(function (resolve, reject) {
        var sortString;
        sortString = sortCriteria.criteria;
        if (sortCriteria.order === "Descending") {
            sortString = "-" + sortString;
        }
        resolve(sortString);
    });
}
/******************************************************************************/
function generateAddDetails(details) {
    var returnDetails = [];
    details.forEach(function (detail) {
        var result = {
            user: {
                userId: mongoose.Types.ObjectId(detail.user.userId),
                emailAddress: detail.user.emailAddress
            },
            app: detail.app,
            invitees: []
        };
        if (detail.user.fullName) {
            result.user.fullName = detail.user.fullName;
        }
        if (detail.invitees.length) {
            detail.invitees.forEach(function (i) {
                var temp = {
                    emailAddress: i.emailAddress,
                    converted: i.converted
                };
                if (i.userId)
                    temp.userId = mongoose.Types.ObjectId(i.userId);
                if (i.fullName)
                    temp.fullName = i.fullName;
                result.invitees.push(temp);
            });
        }
        returnDetails.push(result);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.user) {
            if (details.user.userId) {
                document.user.userId = mongoose.Types.ObjectId(details.user.userId);
            }
            if (details.user.emailAddress) {
                document.user.emailAddress = details.user.emailAddress;
            }
            if (details.user.fullName) {
                document.user.fullName = details.user.fullName;
            }
        }
        if (details.app) {
            document.app = details.app;
        }
        if (details.invitees) {
            document.invitees = [];
            details.invitees.forEach(function (i) {
                var temp = {
                    emailAddress: i.emailAddress,
                    converted: i.converted
                };
                if (i.userId)
                    temp.userId = mongoose.Types.ObjectId(i.userId);
                if (i.fullName)
                    temp.fullName = i.fullName;
                document.invitees.push(temp);
            });
        }
        resolve(document);
    });
}
/******************************************************************************/
function convertToAbstract(events, forceThrow) {
    if (forceThrow === void 0) { forceThrow = false; }
    return this.checkThrow(forceThrow)
        .then(function (response) {
        return new Promise(function (resolve, reject) {
            var returnEvents = [];
            events.forEach(function (inv) {
                var returnEvent = {
                    id: inv._id.toHexString(),
                    user: {
                        userId: inv.user.userId.toHexString(),
                        emailAddress: inv.user.emailAddress
                    },
                    app: inv.app,
                    invitees: [],
                    createdAt: inv.createdAt,
                    updatedAt: inv.updatedAt
                };
                if (inv.user.fullName) {
                    returnEvent.user.fullName = inv.user.fullName;
                }
                if (inv.invitees.length) {
                    inv.invitees.forEach(function (i) {
                        var temp = {
                            emailAddress: i.emailAddress,
                            converted: i.converted
                        };
                        if (i.userId)
                            temp.userId = i.userId.toHexString();
                        if (i.fullName)
                            temp.fullName = i.fullName;
                        returnEvent.invitees.push(temp);
                    });
                }
                returnEvents.push(returnEvent);
            });
            resolve(returnEvents);
        });
    });
}
/******************************************************************************/ 
