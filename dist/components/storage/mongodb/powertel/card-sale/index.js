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
    var models = new generic_event_class_1.default(emitEvent, "Powertel|CardSale");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.cardId) {
            conditions["cardId"] = mongoose.Types.ObjectId(filtrationCriteria.cardId);
        }
        if (filtrationCriteria.mdn) {
            conditions["mdn"] = filtrationCriteria.mdn;
        }
        if (filtrationCriteria.cost) {
            conditions["cost"] = filtrationCriteria.cost;
        }
        if (filtrationCriteria.conditions) {
            if (filtrationCriteria.conditions.withRouter) {
                conditions["conditions.withRouter"] = filtrationCriteria.conditions.withRouter;
            }
            if (filtrationCriteria.conditions.routerType) {
                conditions["conditions.routerType"] = filtrationCriteria.conditions.routerType;
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
            cardId: mongoose.Types.ObjectId(model.cardId),
            mdn: model.mdn,
            cost: model.cost
        };
        if (model.conditions) {
            details.conditions = {};
            if (model.conditions.withRouter) {
                details.conditions.withRouter = model.conditions.withRouter;
            }
            if (model.conditions.routerType) {
                details.conditions.routerType = model.conditions.routerType;
            }
        }
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.cardId) {
            document.cardId = mongoose.Types.ObjectId(details.cardId);
        }
        if (details.mdn) {
            document.mdn = details.mdn;
        }
        if (details.cost) {
            document.cost = details.cost;
        }
        if (details.conditions) {
            if (details.conditions.withRouter) {
                document.conditions.withRouter = details.conditions.withRouter;
            }
            if (details.conditions.routerType) {
                document.conditions.routerType = details.conditions.routerType;
            }
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
                    cardId: model.cardId.toHexString(),
                    mdn: model.mdn,
                    cost: model.cost,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.conditions) {
                    returnModel.conditions = {};
                    if (model.conditions.withRouter) {
                        returnModel.conditions.withRouter = model.conditions.withRouter;
                    }
                    if (model.conditions.routerType) {
                        returnModel.conditions.routerType = model.conditions.routerType;
                    }
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/
