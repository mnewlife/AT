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
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Cart");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
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
        if (filtrationCriteria.round) {
            if (filtrationCriteria.round.roundId) {
                conditions["round.roundId"] = mongoose.Types.ObjectId(filtrationCriteria.round.roundId);
            }
            if (filtrationCriteria.round.roundName) {
                conditions["round.roundName"] = filtrationCriteria.round.roundName;
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
        if (filtrationCriteria.numProducts) {
            conditions["numProducts"] = {};
            if (filtrationCriteria.numProducts.min) {
                conditions["numProducts"].$gte = filtrationCriteria.numProducts.min;
            }
            if (filtrationCriteria.numProducts.max) {
                conditions["numProducts"].$lte = filtrationCriteria.numProducts.max;
            }
        }
        if (filtrationCriteria.valueProducts) {
            conditions["valueProducts"] = {};
            if (filtrationCriteria.valueProducts.min) {
                conditions["valueProducts"].$gte = filtrationCriteria.valueProducts.min;
            }
            if (filtrationCriteria.valueProducts.max) {
                conditions["valueProducts"].$lte = filtrationCriteria.valueProducts.max;
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
            user: {
                userId: mongoose.Types.ObjectId(model.user.userId),
                emailAddress: model.user.emailAddress
            },
            round: {
                roundId: mongoose.Types.ObjectId(model.round.roundId),
                roundName: model.round.roundName
            },
            adminFeePercentage: model.adminFeePercentage,
            numProducts: model.numProducts,
            valueProducts: model.valueProducts
        };
        if (model.user.fullName) {
            details.user.fullName = model.user.fullName;
        }
        returnDetails.push(details);
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
        if (details.round) {
            if (details.round.roundId) {
                document.round.roundId = mongoose.Types.ObjectId(details.round.roundId);
            }
            if (details.round.roundName) {
                document.round.roundName = details.round.roundName;
            }
        }
        if (details.adminFeePercentage) {
            document.adminFeePercentage = details.adminFeePercentage;
        }
        if (details.numProducts) {
            document.numProducts = details.numProducts;
        }
        if (details.valueProducts) {
            document.valueProducts = details.valueProducts;
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
                    user: {
                        userId: model.user.userId.toHexString(),
                        emailAddress: model.user.emailAddress
                    },
                    round: {
                        roundId: model.round.roundId.toHexString(),
                        roundName: model.round.roundName
                    },
                    adminFeePercentage: model.adminFeePercentage,
                    numProducts: model.numProducts,
                    valueProducts: model.valueProducts,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.user.fullName) {
                    returnModel.user.fullName = model.user.fullName;
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/ 
