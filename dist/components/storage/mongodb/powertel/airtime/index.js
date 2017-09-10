"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "Powertel|Airtime");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.checkpoint) {
            conditions["checkpoint"] = {};
            if (filtrationCriteria.checkpoint.min) {
                conditions["checkpoint"].$gte = filtrationCriteria.checkpoint.min;
            }
            if (filtrationCriteria.checkpoint.max) {
                conditions["checkpoint"].$lte = filtrationCriteria.checkpoint.max;
            }
        }
        if (filtrationCriteria.newStockValue) {
            conditions["newStockValue"] = {};
            if (filtrationCriteria.newStockValue.min) {
                conditions["newStockValue"].$gte = filtrationCriteria.newStockValue.min;
            }
            if (filtrationCriteria.newStockValue.max) {
                conditions["newStockValue"].$lte = filtrationCriteria.newStockValue.max;
            }
        }
        if (filtrationCriteria.amountSold) {
            conditions["amountSold"] = {};
            if (filtrationCriteria.amountSold.min) {
                conditions["amountSold"].$gte = filtrationCriteria.amountSold.min;
            }
            if (filtrationCriteria.amountSold.max) {
                conditions["amountSold"].$lte = filtrationCriteria.amountSold.max;
            }
        }
        if (filtrationCriteria.balance) {
            conditions["balance"] = {};
            if (filtrationCriteria.balance.min) {
                conditions["balance"].$gte = filtrationCriteria.balance.min;
            }
            if (filtrationCriteria.balance.max) {
                conditions["balance"].$lte = filtrationCriteria.balance.max;
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
            checkpoint: model.checkpoint,
            newStockValue: model.newStockValue,
            amountSold: model.amountSold,
            balance: model.balance
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.checkpoint) {
            document.checkpoint = details.checkpoint;
        }
        if (details.newStockValuePlus) {
            document.newStockValue += details.newStockValuePlus;
        }
        if (details.newStockValueMinus) {
            document.newStockValue -= details.newStockValueMinus;
        }
        if (details.newStockValue) {
            document.newStockValue = details.newStockValue;
        }
        if (details.amountSoldPlus) {
            document.amountSold += details.amountSoldPlus;
        }
        if (details.amountSoldMinus) {
            document.amountSold -= details.amountSoldMinus;
        }
        if (details.amountSold) {
            document.amountSold = details.amountSold;
        }
        if (details.balancePlus) {
            document.balance += details.balancePlus;
        }
        if (details.balanceMinus) {
            document.balance -= details.balanceMinus;
        }
        if (details.balance) {
            document.balance = details.balance;
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
                    checkpoint: model.checkpoint,
                    newStockValue: model.newStockValue,
                    amountSold: model.amountSold,
                    balance: model.balance,
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
