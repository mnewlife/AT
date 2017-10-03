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
    var events = new generic_event_class_1.default(emitEvent, "Core|Notification");
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
        if (filtrationCriteria.type) {
            conditions["type"] = filtrationCriteria.type;
        }
        if (filtrationCriteria.app) {
            conditions["app"] = filtrationCriteria.app;
        }
        if (filtrationCriteria.label) {
            conditions["label"] = filtrationCriteria.label;
        }
        if (filtrationCriteria.seen) {
            conditions["seen"] = filtrationCriteria.seen;
        }
        if (filtrationCriteria.cleared) {
            conditions["cleared"] = filtrationCriteria.cleared;
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
function generateAddDetails(events) {
    var returnDetails = [];
    events.forEach(function (n) {
        var result = {
            user: {
                userId: mongoose.Types.ObjectId(n.user.userId),
                emailAddress: n.user.emailAddress
            },
            type: n.type,
            app: n.app,
            label: n.label,
            seen: n.seen,
            cleared: n.cleared
        };
        if (n.user.fullName) {
            result.user.fullName = n.user.fullName;
        }
        returnDetails.push();
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
        if (details.type) {
            document.type = details.type;
        }
        if (details.app) {
            document.app = details.app;
        }
        if (details.label) {
            document.label = details.label;
        }
        if (details.seen) {
            document.seen = details.seen;
        }
        if (details.cleared) {
            document.cleared = details.cleared;
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
            events.forEach(function (n) {
                var returnEvent = {
                    id: n._id.toHexString(),
                    user: {
                        userId: n.user.userId.toHexString(),
                        emailAddress: n.user.emailAddress
                    },
                    type: n.type,
                    app: n.app,
                    label: n.label,
                    seen: n.seen,
                    cleared: n.cleared,
                    createdAt: n.createdAt,
                    updatedAt: n.updatedAt
                };
                if (n.user.fullName) {
                    returnEvent.user.fullName = n.user.fullName;
                }
                returnEvents.push(returnEvent);
            });
            resolve(returnEvents);
        });
    });
}
/******************************************************************************/ 
