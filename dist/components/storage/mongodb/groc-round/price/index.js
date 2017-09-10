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
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Price");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.productId) {
            conditions["productId"] = mongoose.Types.ObjectId(filtrationCriteria.productId);
        }
        if (filtrationCriteria.shopId) {
            conditions["shopId"] = mongoose.Types.ObjectId(filtrationCriteria.shopId);
        }
        if (filtrationCriteria.quantity) {
            conditions["quantity"] = {};
            if (filtrationCriteria.quantity.min) {
                conditions["quantity"].$gte = filtrationCriteria.quantity.min;
            }
            if (filtrationCriteria.quantity.max) {
                conditions["quantity"].$lte = filtrationCriteria.quantity.max;
            }
        }
        if (filtrationCriteria.price) {
            conditions["price"] = {};
            if (filtrationCriteria.price.min) {
                conditions["price"].$gte = filtrationCriteria.price.min;
            }
            if (filtrationCriteria.price.max) {
                conditions["price"].$lte = filtrationCriteria.price.max;
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
            productId: mongoose.Types.ObjectId(model.productId),
            shopId: mongoose.Types.ObjectId(model.shopId),
            quantity: model.quantity,
            price: model.price
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.productId) {
            document.productId = mongoose.Types.ObjectId(details.productId);
        }
        if (details.shopId) {
            document.shopId = mongoose.Types.ObjectId(details.shopId);
        }
        if (details.quantity) {
            document.quantity = details.quantity;
        }
        if (details.price) {
            document.price = details.price;
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
                    productId: model.productId.toHexString(),
                    shopId: model.shopId.toHexString(),
                    quantity: model.quantity,
                    price: model.price,
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
