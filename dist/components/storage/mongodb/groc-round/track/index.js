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
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Track");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.round) {
            if (filtrationCriteria.round.roundId) {
                conditions["round.roundId"] = mongoose.Types.ObjectId(filtrationCriteria.round.roundId);
            }
            if (filtrationCriteria.round.roundName) {
                conditions["round.roundName"] = filtrationCriteria.round.roundName;
            }
        }
        if (filtrationCriteria.trackName) {
            conditions["trackName"] = filtrationCriteria.trackName;
        }
        if (filtrationCriteria.contributions) {
            if (filtrationCriteria.contributions.installmentValue) {
                conditions["contributions.installmentValue"] = {};
                if (filtrationCriteria.contributions.installmentValue.min) {
                    conditions["contributions.installmentValue"].$gte = filtrationCriteria.contributions.installmentValue.min;
                }
                if (filtrationCriteria.contributions.installmentValue.max) {
                    conditions["contributions.installmentValue"].$lte = filtrationCriteria.contributions.installmentValue.max;
                }
            }
            if (filtrationCriteria.contributions.totalValue) {
                conditions["contributions.totalValue"] = {};
                if (filtrationCriteria.contributions.totalValue.min) {
                    conditions["contributions.totalValue"].$gte = filtrationCriteria.contributions.totalValue.min;
                }
                if (filtrationCriteria.contributions.totalValue.max) {
                    conditions["contributions.totalValue"].$lte = filtrationCriteria.contributions.totalValue.max;
                }
            }
        }
        if (filtrationCriteria.adminFeePercentage) {
            conditions["adminFeePercentage"] = {};
            if (filtrationCriteria.adminFeePercentage.min) {
                conditions["adminFeePercentage"].$gte = filtrationCriteria.adminFeePercentage.min;
            }
            if (filtrationCriteria.adminFeePercentage.max) {
                conditions["adminFeePercentage"].$lte = filtrationCriteria.adminFeePercentage.max;
            }
        }
        if (filtrationCriteria.products) {
            if (filtrationCriteria.products.num) {
                conditions["products.num"] = {};
                if (filtrationCriteria.products.num.min) {
                    conditions["products.num"].$gte = filtrationCriteria.products.num.min;
                }
                if (filtrationCriteria.products.num.max) {
                    conditions["products.num"].$lte = filtrationCriteria.products.num.max;
                }
            }
            if (filtrationCriteria.products.value) {
                conditions["products.value"] = {};
                if (filtrationCriteria.products.value.min) {
                    conditions["products.value"].$gte = filtrationCriteria.products.value.min;
                }
                if (filtrationCriteria.products.value.max) {
                    conditions["products.value"].$lte = filtrationCriteria.products.value.max;
                }
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
        if (sortCriteria.criteria == "installmentValue")
            sortString = "contributions.installmentValue";
        if (sortCriteria.criteria == "contributionsValue")
            sortString = "contributions.totalValue";
        if (sortCriteria.criteria == "numProducts")
            sortString = "products.num";
        if (sortCriteria.criteria == "valueProducts")
            sortString = "products.value";
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
            round: {
                roundId: mongoose.Types.ObjectId(model.round.roundId),
                roundName: model.round.roundName
            },
            trackName: model.trackName,
            contributions: {
                installmentValue: model.contributions.installmentValue,
                totalValue: model.contributions.totalValue
            },
            adminFeePercentage: model.adminFeePercentage,
            products: {
                num: model.products.num,
                value: model.products.value
            }
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.round) {
            if (details.round.roundId) {
                document.round.roundId = mongoose.Types.ObjectId(details.round.roundId);
            }
            if (details.round.roundName) {
                document.round.roundName = details.round.roundName;
            }
        }
        if (details.trackName) {
            document.trackName = details.trackName;
        }
        if (details.contributions) {
            if (details.contributions.installmentValue) {
                document.contributions.installmentValue = details.contributions.installmentValue;
            }
            if (details.contributions.totalValue) {
                document.contributions.totalValue = details.contributions.totalValue;
            }
        }
        if (details.adminFeePercentage) {
            document.adminFeePercentage = details.adminFeePercentage;
        }
        if (details.products) {
            if (details.products.num) {
                document.products.num = details.products.num;
            }
            if (details.products.value) {
                document.products.value = details.products.value;
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
                    round: {
                        roundId: model.round.roundId.toHexString(),
                        roundName: model.round.roundName
                    },
                    trackName: model.trackName,
                    contributions: {
                        installmentValue: model.contributions.installmentValue,
                        totalValue: model.contributions.totalValue
                    },
                    adminFeePercentage: model.adminFeePercentage,
                    products: {
                        num: model.products.num,
                        value: model.products.value
                    },
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
