"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Shop");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.shopName) {
            conditions["shopName"] = filtrationCriteria.shopName;
        }
        if (filtrationCriteria.images) {
            conditions["images"] = { $all: filtrationCriteria.images };
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
            shopName: model.shopName,
            numProducts: model.numProducts
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.shopName) {
            document.shopName = details.shopName;
        }
        if (details.imagesToAdd) {
            details.imagesToAdd.forEach(function (image) {
                document.images.push(image);
            });
        }
        if (details.imagesToRemove) {
            details.imagesToRemove.forEach(function (image) {
                var index = document.images.indexOf(image);
                if (index && index != -1) {
                    document.images.splice(index, 1);
                }
            });
        }
        if (details.numProductsPlus) {
            document.numProducts += details.numProductsPlus;
        }
        if (details.numProductsMinus) {
            document.numProducts -= details.numProductsMinus;
        }
        if (details.numProducts) {
            document.numProducts = details.numProducts;
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
                    shopName: model.shopName,
                    numProducts: model.numProducts,
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
