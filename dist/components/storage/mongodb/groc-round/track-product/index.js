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
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|TrackProduct");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.track) {
            if (filtrationCriteria.track.trackId) {
                conditions["track.trackId"] = mongoose.Types.ObjectId(filtrationCriteria.track.trackId);
            }
            if (filtrationCriteria.track.trackName) {
                conditions["track.trackName"] = filtrationCriteria.track.trackName;
            }
        }
        if (filtrationCriteria.product) {
            if (filtrationCriteria.product.productId) {
                conditions["product.productId"] = mongoose.Types.ObjectId(filtrationCriteria.product.productId);
            }
            if (filtrationCriteria.product.label) {
                conditions["product.label"] = filtrationCriteria.product.label;
            }
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
        if (filtrationCriteria.value) {
            conditions["value"] = {};
            if (filtrationCriteria.value.min) {
                conditions["value"].$gte = filtrationCriteria.value.min;
            }
            if (filtrationCriteria.value.max) {
                conditions["value"].$lte = filtrationCriteria.value.max;
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
            track: {
                trackId: mongoose.Types.ObjectId(model.track.trackId),
                trackName: model.track.trackName
            },
            product: {
                productId: mongoose.Types.ObjectId(model.product.productId),
                label: model.product.label
            },
            quantity: model.quantity,
            value: model.value
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.track) {
            if (details.track.trackId) {
                document.track.trackId = mongoose.Types.ObjectId(details.track.trackId);
            }
            if (details.track.trackName) {
                document.track.trackName = details.track.trackName;
            }
        }
        if (details.product) {
            if (details.product.productId) {
                document.product.productId = mongoose.Types.ObjectId(details.product.productId);
            }
            if (details.product.label) {
                document.product.label = details.product.label;
            }
        }
        if (details.quantity) {
            document.quantity = details.quantity;
        }
        if (details.value) {
            document.value = details.value;
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
                    track: {
                        trackId: model.track.trackId.toHexString(),
                        trackName: model.track.trackName
                    },
                    product: {
                        productId: model.product.productId.toHexString(),
                        label: model.product.label
                    },
                    quantity: model.quantity,
                    value: model.value,
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
