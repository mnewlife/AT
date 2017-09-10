"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "Powertel|NewAirtimeStock");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.initialBalance) {
            conditions["initialBalance"] = {};
            if (filtrationCriteria.initialBalance.min) {
                conditions["initialBalance"].$gte = filtrationCriteria.initialBalance.min;
            }
            if (filtrationCriteria.initialBalance.max) {
                conditions["initialBalance"].$lte = filtrationCriteria.initialBalance.max;
            }
        }
        if (filtrationCriteria.newBalance) {
            conditions["newBalance"] = {};
            if (filtrationCriteria.newBalance.min) {
                conditions["newBalance"].$gte = filtrationCriteria.newBalance.min;
            }
            if (filtrationCriteria.newBalance.max) {
                conditions["newBalance"].$lte = filtrationCriteria.newBalance.max;
            }
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
function generateAddDetails(models) {
    var returnDetails = [];
    models.forEach(function (model) {
        var details = {
            initialBalance: model.initialBalance,
            newBalance: model.newBalance,
            amount: model.amount
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.initialBalance) {
            document.initialBalance = details.initialBalance;
        }
        if (details.newBalance) {
            document.newBalance = details.newBalance;
        }
        if (details.amount) {
            document.amount = details.amount;
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
                    initialBalance: model.initialBalance,
                    newBalance: model.newBalance,
                    amount: model.amount,
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
