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
    var events = new generic_event_class_1.default(emitEvent, "Core|Subscription");
    return new generic_model_class_1.default(events, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.userId) {
            conditions["userId"] = mongoose.Types.ObjectId(filtrationCriteria.userId);
        }
        if (filtrationCriteria.subscription) {
            conditions["subscription"] = filtrationCriteria.subscription;
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
        returnDetails.push({
            userId: mongoose.Types.ObjectId(detail.userId),
            subscription: detail.subscription
        });
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.userId) {
            document.userId = mongoose.Types.ObjectId(details.userId);
        }
        if (details.subscription) {
            document.subscription = details.subscription;
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
            events.forEach(function (event) {
                var returnEvent = {
                    id: event._id.toHexString(),
                    userId: event._id.toHexString(),
                    subscription: event.subscription,
                    createdAt: event.createdAt,
                    updatedAt: event.updatedAt
                };
                returnEvents.push(returnEvent);
            });
            resolve(returnEvents);
        });
    });
}
/******************************************************************************/ 
