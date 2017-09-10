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
    var models = new generic_event_class_1.default(emitEvent, "Routers|Sale");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.buyer) {
            if (filtrationCriteria.buyer.fullName) {
                conditions["buyer.fullName"] = filtrationCriteria.buyer.fullName;
            }
            if (filtrationCriteria.buyer.emailAddress) {
                conditions["buyer.emailAddress"] = filtrationCriteria.buyer.emailAddress;
            }
            if (filtrationCriteria.buyer.phoneNumber) {
                conditions["buyer.phoneNumber"] = filtrationCriteria.buyer.phoneNumber;
            }
        }
        if (filtrationCriteria.simCard) {
            if (filtrationCriteria.simCard.cardId) {
                conditions["simCard.cardId"] = mongoose.Types.ObjectId(filtrationCriteria.simCard.cardId);
            }
            if (filtrationCriteria.simCard.mdn) {
                conditions["simCard.mdn"] = filtrationCriteria.simCard.mdn;
            }
        }
        if (filtrationCriteria.type) {
            conditions["type"] = filtrationCriteria.type;
        }
        if (filtrationCriteria.paymentMethod) {
            conditions["paymentMethod"] = filtrationCriteria.paymentMethod;
        }
        if (filtrationCriteria.unitCost) {
            conditions["unitCost"] = {};
            if (filtrationCriteria.unitCost.min) {
                conditions["unitCost"].$gte = filtrationCriteria.unitCost.min;
            }
            if (filtrationCriteria.unitCost.max) {
                conditions["unitCost"].$lte = filtrationCriteria.unitCost.max;
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
        if (filtrationCriteria.totalCost) {
            conditions["totalCost"] = {};
            if (filtrationCriteria.totalCost.min) {
                conditions["totalCost"].$gte = filtrationCriteria.totalCost.min;
            }
            if (filtrationCriteria.totalCost.max) {
                conditions["totalCost"].$lte = filtrationCriteria.totalCost.max;
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
            buyer: {
                fullName: model.buyer.fullName,
                emailAddress: model.buyer.emailAddress,
                phoneNumber: model.buyer.phoneNumber
            },
            type: model.type,
            paymentMethod: model.paymentMethod,
            unitCost: model.unitCost,
            amount: model.amount,
            totalCost: model.totalCost
        };
        if (model.simCard) {
            details.simCard = {
                cardId: mongoose.Types.ObjectId(model.simCard.cardId),
                mdn: model.simCard.mdn
            };
        }
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.buyer) {
            if (details.buyer.fullName) {
                document.buyer.fullName = details.buyer.fullName;
            }
            if (details.buyer.emailAddress) {
                document.buyer.emailAddress = details.buyer.emailAddress;
            }
            if (details.buyer.phoneNumber) {
                document.buyer.phoneNumber = details.buyer.phoneNumber;
            }
        }
        if (details.simCard) {
            if (details.simCard.cardId) {
                document.simCard.cardId = mongoose.Types.ObjectId(details.simCard.cardId);
            }
            if (details.simCard.mdn) {
                document.simCard.mdn = details.simCard.mdn;
            }
        }
        if (details.type) {
            document.type = details.type;
        }
        if (details.paymentMethod) {
            document.paymentMethod = details.paymentMethod;
        }
        if (details.unitCost) {
            document.unitCost = details.unitCost;
        }
        if (details.amount) {
            document.amount = details.amount;
        }
        if (details.totalCost) {
            document.totalCost = details.totalCost;
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
                    buyer: {
                        id: model.buyer._id.toHexString(),
                        fullName: model.buyer.fullName,
                        emailAddress: model.buyer.emailAddress,
                        phoneNumber: model.buyer.phoneNumber,
                        createdAt: model.buyer.createdAt,
                        updatedAt: model.buyer.updatedAt
                    },
                    type: model.type,
                    paymentMethod: model.paymentMethod,
                    unitCost: model.unitCost,
                    amount: model.amount,
                    totalCost: model.totalCost,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.simCard) {
                    returnModel.simCard = {
                        id: model.simCard._id.toHexString(),
                        cardId: model.simCard.cardId.toHexString(),
                        mdn: model.simCard.mdn,
                        createdAt: model.simCard.createdAt,
                        updatedAt: model.simCard.updatedAt
                    };
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/
