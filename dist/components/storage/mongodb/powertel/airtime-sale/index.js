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
    var models = new generic_event_class_1.default(emitEvent, "Powertel|AirtimeSale");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.buyerName) {
            conditions["buyerName"] = filtrationCriteria.buyerName;
        }
        if (filtrationCriteria.card) {
            if (filtrationCriteria.card.cardId) {
                conditions["card.cardId"] = mongoose.Types.ObjectId(filtrationCriteria.card.cardId);
            }
            if (filtrationCriteria.card.mdn) {
                conditions["card.mdn"] = {};
                if (filtrationCriteria.card.mdn.min) {
                    conditions["card.mdn"].$gte = filtrationCriteria.card.mdn.min;
                }
                if (filtrationCriteria.card.mdn.max) {
                    conditions["card.mdn"].$lte = filtrationCriteria.card.mdn.max;
                }
            }
        }
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
        if (filtrationCriteria.bundles) {
            if (filtrationCriteria.bundles.gb) {
                conditions["bundles.gb"] = {};
                if (filtrationCriteria.bundles.gb.min) {
                    conditions["bundles.gb"].$gte = filtrationCriteria.bundles.gb.min;
                }
                if (filtrationCriteria.bundles.gb.max) {
                    conditions["bundles.gb"].$lte = filtrationCriteria.bundles.gb.max;
                }
            }
            if (filtrationCriteria.bundles.days) {
                conditions["bundles.days"] = {};
                if (filtrationCriteria.bundles.days.min) {
                    conditions["bundles.days"].$gte = filtrationCriteria.bundles.days.min;
                }
                if (filtrationCriteria.bundles.days.max) {
                    conditions["bundles.days"].$lte = filtrationCriteria.bundles.days.max;
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
        if (sortCriteria.criteria === "mdn") {
            sortString = "card.mdn";
        }
        else if (sortCriteria.criteria === "gb") {
            sortString = "bundles.gb";
        }
        else if (sortCriteria.criteria === "days") {
            sortString = "bundles.days";
        }
        else {
            sortString = sortCriteria.criteria;
        }
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
            buyerName: model.buyerName,
            amount: model.amount
        };
        if (model.card) {
            details.card = {
                cardId: mongoose.Types.ObjectId(model.card.cardId),
                mdn: model.card.mdn
            };
        }
        if (model.user) {
            details.user = {
                userId: mongoose.Types.ObjectId(model.user.userId),
                emailAddress: model.user.emailAddress,
                fullName: model.user.fullName
            };
        }
        if (model.bundles) {
            details.bundles = {
                gb: model.bundles.gb,
                days: model.bundles.days
            };
        }
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.buyerName) {
            document.buyerName = details.buyerName;
        }
        if (details.card) {
            if (details.card.cardId) {
                document.card.cardId = mongoose.Types.ObjectId(details.card.cardId);
            }
            if (details.card.mdn) {
                document.card.mdn = details.card.mdn;
            }
        }
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
        if (details.bundles) {
            if (details.bundles.gb) {
                document.bundles.gb = details.bundles.gb;
            }
            if (details.bundles.days) {
                document.bundles.days = details.bundles.days;
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
                    buyerName: model.buyerName,
                    amount: model.amount,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.card) {
                    returnModel.card = {
                        id: model.card._id.toHexString(),
                        cardId: model.card.cardId.toHexString(),
                        mdn: model.card.mdn,
                        createdAt: model.card.createdAt,
                        updatedAt: model.card.updatedAt
                    };
                }
                if (model.user) {
                    returnModel.user = {
                        id: model.user._id.toHexString(),
                        userId: model.user.userId.toHexString(),
                        emailAddress: model.user.emailAddress,
                        fullName: model.user.fullName,
                        createdAt: model.user.createdAt,
                        updatedAt: model.user.updatedAt
                    };
                }
                if (model.bundles) {
                    returnModel.bundles = {
                        gb: model.bundles.gb,
                        days: model.bundles.days
                    };
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/ 
