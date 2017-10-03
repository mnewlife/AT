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
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Product");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.label) {
            conditions["label"] = filtrationCriteria.label;
        }
        if (filtrationCriteria.images) {
            conditions["images"] = { $all: filtrationCriteria.images };
        }
        if (filtrationCriteria.priceValues) {
            if (filtrationCriteria.priceValues.min) {
                if (filtrationCriteria.priceValues.min.shopId) {
                    conditions["priceValues.min.shopId"] = mongoose.Types.ObjectId(filtrationCriteria.priceValues.min.shopId);
                }
                if (filtrationCriteria.priceValues.min.price) {
                    conditions["priceValues.min.price"] = {};
                    if (filtrationCriteria.priceValues.min.price.min) {
                        conditions["priceValues.min.price"].$gte = filtrationCriteria.priceValues.min.price.min;
                    }
                    if (filtrationCriteria.priceValues.min.price.max) {
                        conditions["priceValues.min.price"].$lte = filtrationCriteria.priceValues.min.price.max;
                    }
                }
            }
            if (filtrationCriteria.priceValues.max) {
                if (filtrationCriteria.priceValues.max.shopId) {
                    conditions["priceValues.max.shopId"] = mongoose.Types.ObjectId(filtrationCriteria.priceValues.max.shopId);
                }
                if (filtrationCriteria.priceValues.max.price) {
                    conditions["priceValues.max.price"] = {};
                    if (filtrationCriteria.priceValues.max.price.min) {
                        conditions["priceValues.max.price"].$gte = filtrationCriteria.priceValues.max.price.min;
                    }
                    if (filtrationCriteria.priceValues.max.price.max) {
                        conditions["priceValues.max.price"].$lte = filtrationCriteria.priceValues.max.price.max;
                    }
                }
            }
            if (filtrationCriteria.priceValues.median) {
                if (filtrationCriteria.priceValues.median.shopId) {
                    conditions["priceValues.median.shopId"] = mongoose.Types.ObjectId(filtrationCriteria.priceValues.median.shopId);
                }
                if (filtrationCriteria.priceValues.median.price) {
                    conditions["priceValues.median.price"] = {};
                    if (filtrationCriteria.priceValues.median.price.min) {
                        conditions["priceValues.median.price"].$gte = filtrationCriteria.priceValues.median.price.min;
                    }
                    if (filtrationCriteria.priceValues.median.price.max) {
                        conditions["priceValues.median.price"].$lte = filtrationCriteria.priceValues.median.price.max;
                    }
                }
            }
            if (filtrationCriteria.priceValues.mean) {
                if (filtrationCriteria.priceValues.mean.shopId) {
                    conditions["priceValues.mean.shopId"] = mongoose.Types.ObjectId(filtrationCriteria.priceValues.mean.shopId);
                }
                if (filtrationCriteria.priceValues.mean.price) {
                    conditions["priceValues.mean.price"] = {};
                    if (filtrationCriteria.priceValues.mean.price.min) {
                        conditions["priceValues.mean.price"].$gte = filtrationCriteria.priceValues.mean.price.min;
                    }
                    if (filtrationCriteria.priceValues.mean.price.max) {
                        conditions["priceValues.mean.price"].$lte = filtrationCriteria.priceValues.mean.price.max;
                    }
                }
            }
        }
        if (filtrationCriteria.effectivePrice) {
            if (filtrationCriteria.effectivePrice.shopId) {
                conditions["effectivePrice.shopId"] = mongoose.Types.ObjectId(filtrationCriteria.effectivePrice.shopId);
            }
            if (filtrationCriteria.effectivePrice.price) {
                conditions["effectivePrice.price"] = {};
                if (filtrationCriteria.effectivePrice.price.min) {
                    conditions["effectivePrice.price"].$gte = filtrationCriteria.effectivePrice.price.min;
                }
                if (filtrationCriteria.effectivePrice.price.max) {
                    conditions["effectivePrice.price"].$lte = filtrationCriteria.effectivePrice.price.max;
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
        if (sortCriteria.criteria === "effectivePrice") {
            sortString = "effectivePrice.price";
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
            label: model.label,
            priceValues: {},
            prices: [],
            effectivePrice: {
                price: model.effectivePrice.price
            }
        };
        if (model.effectivePrice.shopId) {
            details.effectivePrice.shopId = mongoose.Types.ObjectId(model.effectivePrice.shopId);
        }
        if (model.images) {
            details.images = model.images;
        }
        if (model.priceValues.min) {
            details.priceValues.min = {
                shopId: mongoose.Types.ObjectId(model.priceValues.min.shopId),
                price: model.priceValues.min.price
            };
        }
        if (model.priceValues.max) {
            details.priceValues.max = {
                shopId: mongoose.Types.ObjectId(model.priceValues.max.shopId),
                price: model.priceValues.max.price
            };
        }
        if (model.priceValues.median) {
            details.priceValues.median = {
                shopId: mongoose.Types.ObjectId(model.priceValues.median.shopId),
                price: model.priceValues.median.price
            };
        }
        if (model.priceValues.mean) {
            details.priceValues.mean = {
                shopId: mongoose.Types.ObjectId(model.priceValues.mean.shopId),
                price: model.priceValues.mean.price
            };
        }
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.label) {
            document.label = details.label;
        }
        if (details.images) {
            document.images = [];
            details.images.forEach(function (image) {
                document.images.push(image);
            });
        }
        if (details.prices) {
            document.prices = [];
            details.prices.forEach(function (price) {
                document.prices.push({
                    shop: {
                        shopId: mongoose.Types.ObjectId(price.shop.shopId),
                        shopName: price.shop.shopName
                    },
                    quantity: price.quantity,
                    price: price.price
                });
            });
        }
        if (details.priceValues) {
            if (details.priceValues.min) {
                document.priceValues.min.shopId = mongoose.Types.ObjectId(details.priceValues.min.shopId);
                document.priceValues.min.price = details.priceValues.min.price;
            }
            if (details.priceValues.max) {
                document.priceValues.max.shopId = mongoose.Types.ObjectId(details.priceValues.max.shopId);
                document.priceValues.max.price = details.priceValues.max.price;
            }
            if (details.priceValues.median) {
                document.priceValues.median.shopId = mongoose.Types.ObjectId(details.priceValues.median.shopId);
                document.priceValues.median.price = details.priceValues.median.price;
            }
            if (details.priceValues.mean) {
                document.priceValues.mean.shopId = mongoose.Types.ObjectId(details.priceValues.mean.shopId);
                document.priceValues.mean.price = details.priceValues.mean.price;
            }
        }
        if (details.effectivePrice) {
            document.effectivePrice.shopId = mongoose.Types.ObjectId(details.effectivePrice.shopId);
            document.effectivePrice.price = details.effectivePrice.price;
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
                    label: model.label,
                    prices: [],
                    priceValues: {},
                    effectivePrice: {
                        price: model.effectivePrice.price
                    },
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.effectivePrice.shopId) {
                    returnModel.effectivePrice.shopId = model.effectivePrice.shopId.toHexString();
                }
                if (model.images) {
                    returnModel.images = model.images;
                }
                if (model.prices) {
                    model.prices.forEach(function (price) {
                        returnModel.prices.push({
                            shop: {
                                shopId: price.shop.shopId.toHexString(),
                                shopName: price.shop.shopName
                            },
                            quantity: price.quantity,
                            price: price.price
                        });
                    });
                }
                if (model.priceValues.min) {
                    returnModel.priceValues.min = {
                        shopId: model.priceValues.min.shopId.toHexString(),
                        price: model.priceValues.min.price
                    };
                }
                if (model.priceValues.max) {
                    returnModel.priceValues.max = {
                        shopId: model.priceValues.max.shopId.toHexString(),
                        price: model.priceValues.max.price
                    };
                }
                if (model.priceValues.median) {
                    returnModel.priceValues.median = {
                        shopId: model.priceValues.median.shopId.toHexString(),
                        price: model.priceValues.median.price
                    };
                }
                if (model.priceValues.mean) {
                    returnModel.priceValues.mean = {
                        shopId: model.priceValues.mean.shopId.toHexString(),
                        price: model.priceValues.mean.price
                    };
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/
