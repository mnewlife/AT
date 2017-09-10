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
    var models = new generic_event_class_1.default(emitEvent, "Call263|AirtimePayment");
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
        if (filtrationCriteria.channelId) {
            conditions["channelId"] = mongoose.Types.ObjectId(filtrationCriteria.channelId);
        }
        if (filtrationCriteria.transaction) {
            if (filtrationCriteria.transaction.identifier) {
                conditions["transaction.identifier"] = filtrationCriteria.transaction.identifier;
            }
            if (filtrationCriteria.transaction.amount) {
                conditions["transaction.amount"] = {};
                if (filtrationCriteria.transaction.amount.min) {
                    conditions["transaction.amount"].$gte = filtrationCriteria.transaction.amount.min;
                }
                if (filtrationCriteria.transaction.amount.max) {
                    conditions["transaction.amount"].$lte = filtrationCriteria.transaction.amount.max;
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
        if (sortCriteria.criteria === "amount") {
            sortString = "transaction.amount";
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
            user: {
                userId: mongoose.Types.ObjectId(model.user.userId),
                emailAddress: model.user.emailAddress,
                fullName: model.user.fullName,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            channelId: mongoose.Types.ObjectId(model.channelId),
            transaction: {
                identifier: model.transaction.identifier,
                amount: model.transaction.amount,
                method: model.transaction.method,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        };
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
        if (details.channelId) {
            document.channelId = mongoose.Types.ObjectId(details.channelId);
        }
        if (details.transaction) {
            if (details.transaction.identifier) {
                document.transaction.identifier = details.transaction.identifier;
            }
            if (details.transaction.amount) {
                document.transaction.amount = details.transaction.amount;
            }
            if (details.transaction.method) {
                document.transaction.method = details.transaction.method;
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
                    user: {
                        id: model.user._id.toHexString(),
                        userId: model.user.userId.toHexString(),
                        emailAddress: model.user.emailAddress,
                        fullName: model.user.fullName,
                        createdAt: model.user.createdAt,
                        updatedAt: model.user.updatedAt
                    },
                    channelId: model.channelId.toHexString(),
                    transaction: {
                        id: model.transaction._id.toHexString(),
                        identifier: model.transaction.identifier,
                        amount: model.transaction.amount,
                        method: model.transaction.method,
                        createdAt: model.transaction.createdAt,
                        updatedAt: model.transaction.updatedAt
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
