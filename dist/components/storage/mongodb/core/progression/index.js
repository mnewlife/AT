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
    var events = new generic_event_class_1.default(emitEvent, "Core|Progression");
    return new generic_model_class_1.default(events, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.type) {
            conditions["type"] = filtrationCriteria.type;
        }
        if (filtrationCriteria.typeId) {
            conditions["typeId"] = mongoose.Types.ObjectId(filtrationCriteria.typeId);
        }
        if (filtrationCriteria.subject) {
            conditions["subject"] = filtrationCriteria.subject;
        }
        if (filtrationCriteria.timeMeasure) {
            conditions["timeMeasure"] = filtrationCriteria.timeMeasure;
        }
        if (filtrationCriteria.amount) {
            conditions["amount"] = {};
            if (filtrationCriteria.amount.min) {
                conditions["amount"].$gte = filtrationCriteria.amount.min;
            }
            if (filtrationCriteria.amount.max) {
                conditions["amount"].$lte = filtrationCriteria.amount.max;
            }
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
    events.forEach(function (event) {
        var result = {
            type: event.type,
            typeId: mongoose.Types.ObjectId(event.typeId),
            subject: event.subject,
            timeMeasure: event.timeMeasure,
            amount: event.amount
        };
        returnDetails.push(result);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.type) {
            document.type = details.type;
        }
        if (details.typeId) {
            document.typeId = mongoose.Types.ObjectId(details.typeId);
        }
        if (details.subject) {
            document.subject = details.subject;
        }
        if (details.timeMeasure) {
            document.timeMeasure = details.timeMeasure;
        }
        if (details.amount) {
            document.amount = details.amount;
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
                    type: event.type,
                    typeId: event.typeId.toHexString(),
                    subject: event.subject,
                    timeMeasure: event.timeMeasure,
                    amount: event.amount,
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
