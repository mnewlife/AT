"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "Routers|Amounts");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.type) {
            conditions["type"] = filtrationCriteria.type;
        }
        if (filtrationCriteria.count) {
            conditions["count"] = {};
            if (filtrationCriteria.count.min) {
                conditions["count"].$gte = filtrationCriteria.count.min;
            }
            if (filtrationCriteria.count.max) {
                conditions["count"].$lte = filtrationCriteria.count.max;
            }
        }
        if (filtrationCriteria.newStock) {
            conditions["newStock"] = {};
            if (filtrationCriteria.newStock.min) {
                conditions["newStock"].$gte = filtrationCriteria.newStock.min;
            }
            if (filtrationCriteria.newStock.max) {
                conditions["newStock"].$lte = filtrationCriteria.newStock.max;
            }
        }
        if (filtrationCriteria.sold) {
            conditions["sold"] = {};
            if (filtrationCriteria.sold.min) {
                conditions["sold"].$gte = filtrationCriteria.sold.min;
            }
            if (filtrationCriteria.sold.max) {
                conditions["sold"].$lte = filtrationCriteria.sold.max;
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
            type: model.type,
            count: model.count,
            newStock: model.newStock,
            sold: model.sold
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.type) {
            document.type = details.type;
        }
        if (details.countPlus) {
            document.count += details.countPlus;
        }
        if (details.countMinus) {
            document.count -= details.countMinus;
        }
        if (details.count) {
            document.count = details.count;
        }
        if (details.newStockPlus) {
            document.newStock += details.newStockPlus;
        }
        if (details.newStockMinus) {
            document.newStock -= details.newStockMinus;
        }
        if (details.newStock) {
            document.newStock = details.newStock;
        }
        if (details.soldPlus) {
            document.sold += details.soldPlus;
        }
        if (details.soldMinus) {
            document.sold -= details.soldMinus;
        }
        if (details.sold) {
            document.sold = details.sold;
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
                    type: model.type,
                    count: model.count,
                    newStock: model.newStock,
                    sold: model.sold,
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
