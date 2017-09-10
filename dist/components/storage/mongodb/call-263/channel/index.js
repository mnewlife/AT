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
    var models = new generic_event_class_1.default(emitEvent, "Call263|Channel");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.allocated) {
            conditions["allocated"] = filtrationCriteria.allocated;
        }
        if (filtrationCriteria.allocatedTo) {
            conditions["allocatedTo"] = mongoose.Types.ObjectId(filtrationCriteria.allocatedTo);
        }
        if (filtrationCriteria.code) {
            conditions["code"] = filtrationCriteria.code;
        }
        if (filtrationCriteria.phoneNumber) {
            conditions["phoneNumber"] = filtrationCriteria.phoneNumber;
        }
        if (filtrationCriteria.password) {
            conditions["password"] = filtrationCriteria.password;
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
function generateAddDetails(models) {
    var returnDetails = [];
    models.forEach(function (model) {
        var details = {
            allocated: model.allocated,
            allocatedTo: mongoose.Types.ObjectId(model.allocatedTo),
            code: model.code,
            phoneNumber: model.phoneNumber,
            password: model.password
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.allocated) {
            document.allocated = details.allocated;
        }
        if (details.allocatedTo) {
            document.allocatedTo = mongoose.Types.ObjectId(details.allocatedTo);
        }
        if (details.code) {
            document.code = details.code;
        }
        if (details.phoneNumber) {
            document.phoneNumber = details.phoneNumber;
        }
        if (details.password) {
            document.password = details.password;
        }
        resolve(document);
    });
}
/******************************************************************************/
function convertToAbstract(models, forceThrow) {
    if (forceThrow === void 0) { forceThrow = false; }
    return this.checkThrow(forceThrow)
        .then(function (response) {
        return new Promise(function (resolve, reject) {
            var returnModels = [];
            models.forEach(function (model) {
                var returnModel = {
                    id: model._id.toHexString(),
                    allocated: model.allocated,
                    allocatedTo: model.allocatedTo.toHexString(),
                    code: model.code,
                    phoneNumber: model.phoneNumber,
                    password: model.password,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/
