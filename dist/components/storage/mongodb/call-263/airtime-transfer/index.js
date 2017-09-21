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
    var models = new generic_event_class_1.default(emitEvent, "Call263|AirtimeTransfer");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.userId) {
            conditions["userId"] = mongoose.Types.ObjectId(filtrationCriteria.userId);
        }
        if (filtrationCriteria.channelId) {
            conditions["channelId"] = mongoose.Types.ObjectId(filtrationCriteria.channelId);
        }
        if (filtrationCriteria.paymentId) {
            conditions["paymentId"] = mongoose.Types.ObjectId(filtrationCriteria.paymentId);
        }
        if (filtrationCriteria.transfer) {
            if (filtrationCriteria.transfer.identifier) {
                conditions["transfer.identifier"] = filtrationCriteria.transfer.identifier;
            }
            if (filtrationCriteria.transfer.amount) {
                conditions["transfer.amount"] = {};
                if (filtrationCriteria.transfer.amount.min) {
                    conditions["transfer.amount"].$gte = filtrationCriteria.transfer.amount.min;
                }
                if (filtrationCriteria.transfer.amount.max) {
                    conditions["transfer.amount"].$lte = filtrationCriteria.transfer.amount.max;
                }
            }
            if (filtrationCriteria.transfer.paymentRecorded) {
                conditions["transfer.paymentRecorded"] = filtrationCriteria.transfer.paymentRecorded;
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
            sortString = "transfer.amount";
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
            userId: mongoose.Types.ObjectId(model.userId),
            channelId: mongoose.Types.ObjectId(model.userId),
            paymentId: mongoose.Types.ObjectId(model.userId),
            transfer: {
                identifier: model.transfer.identifier,
                amount: model.transfer.amount,
                paymentRecorded: model.transfer.paymentRecorded
            }
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.userId) {
            document.userId = mongoose.Types.ObjectId(details.userId);
        }
        if (details.channelId) {
            document.channelId = mongoose.Types.ObjectId(details.channelId);
        }
        if (details.paymentId) {
            document.paymentId = mongoose.Types.ObjectId(details.paymentId);
        }
        if (details.transfer) {
            if (details.transfer.identifier) {
                document.transfer.identifier = details.transfer.identifier;
            }
            if (details.transfer.amount) {
                document.transfer.amount = details.transfer.amount;
            }
            if (details.transfer.paymentRecorded) {
                document.transfer.paymentRecorded = details.transfer.paymentRecorded;
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
                    userId: model.userId.toHexString(),
                    channelId: model.channelId.toHexString(),
                    paymentId: model.paymentId.toHexString(),
                    transfer: {
                        identifier: model.transfer.identifier,
                        amount: model.transfer.amount,
                        paymentRecorded: model.transfer.paymentRecorded
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
