"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var events = new generic_event_class_1.default(emitEvent, "Core|Event");
    return new generic_model_class_1.default(events, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.context) {
            conditions["context"] = filtrationCriteria.context;
        }
        if (filtrationCriteria.identifier) {
            conditions["identifier"] = filtrationCriteria.identifier;
        }
        if (filtrationCriteria.tags) {
            conditions["tags"] = { $all: filtrationCriteria.tags };
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
        var details = {
            context: event.context,
            identifier: event.identifier,
            tags: event.tags,
            data: event.data
        };
        returnDetails.push();
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.context) {
            document.context = details.context;
        }
        if (details.identifier) {
            document.identifier = details.identifier;
        }
        if (details.tags) {
            document.tags = [];
            details.tags.forEach(function (tag) {
                document.tags.push(tag);
            });
        }
        if (details.data) {
            document.data = details.data;
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
                    context: event.context,
                    identifier: event.identifier,
                    tags: event.tags,
                    data: event.data,
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
