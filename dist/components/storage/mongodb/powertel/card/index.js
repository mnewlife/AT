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
    var models = new generic_event_class_1.default(emitEvent, "Powertel|Card");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.pin) {
            conditions["pin"] = filtrationCriteria.pin;
        }
        if (filtrationCriteria.puk) {
            conditions["puk"] = filtrationCriteria.puk;
        }
        if (filtrationCriteria.mdn) {
            conditions["mdn"] = filtrationCriteria.mdn;
        }
        if (filtrationCriteria.buyer) {
            if (filtrationCriteria.buyer.cardSaleId) {
                conditions["buyer.cardSaleId"] = mongoose.Types.ObjectId(filtrationCriteria.buyer.cardSaleId);
            }
            if (filtrationCriteria.buyer.fullName) {
                conditions["buyer.fullName"] = filtrationCriteria.buyer.fullName;
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
            pin: model.pin,
            puk: model.puk,
            mdn: model.mdn
        };
        if (model.buyer) {
            details.buyer = {
                cardSaleId: mongoose.Types.ObjectId(model.buyer.cardSaleId),
                fullName: model.buyer.fullName
            };
        }
        if (model.user) {
            details.user = {
                userId: mongoose.Types.ObjectId(model.user.userId),
                emailAddress: model.user.emailAddress,
                fullName: model.user.fullName
            };
        }
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.pin) {
            document.pin = details.pin;
        }
        if (details.puk) {
            document.puk = details.puk;
        }
        if (details.mdn) {
            document.mdn = details.mdn;
        }
        if (details.buyer) {
            if (details.buyer.cardSaleId) {
                document.buyer.cardSaleId = mongoose.Types.ObjectId(details.buyer.cardSaleId);
            }
            if (details.buyer.fullName) {
                document.buyer.fullName = details.buyer.fullName;
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
                    pin: model.pin,
                    puk: model.puk,
                    mdn: model.mdn,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.buyer) {
                    returnModel.buyer = {
                        cardSaleId: model.buyer.cardSaleId.toHexString(),
                        fullName: model.buyer.fullName
                    };
                }
                if (model.user) {
                    returnModel.user = {
                        userId: model.user.userId.toHexString(),
                        emailAddress: model.user.emailAddress,
                        fullName: model.user.fullName
                    };
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/ 
