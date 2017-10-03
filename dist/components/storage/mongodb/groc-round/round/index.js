"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Round");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.roundName) {
            conditions["roundName"] = filtrationCriteria.roundName;
        }
        if (filtrationCriteria.inProgress) {
            conditions["inProgress"] = filtrationCriteria.inProgress;
        }
        if (filtrationCriteria.duration) {
            if (filtrationCriteria.duration.start) {
                conditions["duration.start"] = {};
                if (filtrationCriteria.duration.start.min) {
                    conditions["duration.start"].$gte = filtrationCriteria.duration.start.min;
                }
                if (filtrationCriteria.duration.start.max) {
                    conditions["duration.start"].$lte = filtrationCriteria.duration.start.max;
                }
            }
            if (filtrationCriteria.duration.end) {
                conditions["duration.end"] = {};
                if (filtrationCriteria.duration.end.min) {
                    conditions["duration.end"].$gte = filtrationCriteria.duration.end.min;
                }
                if (filtrationCriteria.duration.end.max) {
                    conditions["duration.end"].$lte = filtrationCriteria.duration.end.max;
                }
            }
            if (filtrationCriteria.duration.months) {
                conditions["duration.months"] = {};
                if (filtrationCriteria.duration.months.min) {
                    conditions["duration.months"].$gte = filtrationCriteria.duration.months.min;
                }
                if (filtrationCriteria.duration.months.max) {
                    conditions["duration.months"].$lte = filtrationCriteria.duration.months.max;
                }
            }
        }
        if (filtrationCriteria.deliveries) {
            if (filtrationCriteria.deliveries.fee) {
                conditions["deliveries.fee"] = {};
                if (filtrationCriteria.deliveries.fee.min) {
                    conditions["deliveries.fee"].$gte = filtrationCriteria.deliveries.fee.min;
                }
                if (filtrationCriteria.deliveries.fee.max) {
                    conditions["deliveries.fee"].$lte = filtrationCriteria.deliveries.fee.max;
                }
            }
            if (filtrationCriteria.deliveries.numPayments) {
                conditions["deliveries.numPayments"] = {};
                if (filtrationCriteria.deliveries.numPayments.min) {
                    conditions["deliveries.numPayments"].$gte = filtrationCriteria.deliveries.numPayments.min;
                }
                if (filtrationCriteria.deliveries.numPayments.max) {
                    conditions["deliveries.numPayments"].$lte = filtrationCriteria.deliveries.numPayments.max;
                }
            }
            if (filtrationCriteria.deliveries.valuePayments) {
                conditions["deliveries.valuePayments"] = {};
                if (filtrationCriteria.deliveries.valuePayments.min) {
                    conditions["deliveries.valuePayments"].$gte = filtrationCriteria.deliveries.valuePayments.min;
                }
                if (filtrationCriteria.deliveries.valuePayments.max) {
                    conditions["deliveries.valuePayments"].$lte = filtrationCriteria.deliveries.valuePayments.max;
                }
            }
        }
        if (filtrationCriteria.contributions) {
            if (filtrationCriteria.contributions.num) {
                conditions["contributions.num"] = {};
                if (filtrationCriteria.contributions.num.min) {
                    conditions["contributions.num"].$gte = filtrationCriteria.contributions.num.min;
                }
                if (filtrationCriteria.contributions.num.max) {
                    conditions["contributions.num"].$lte = filtrationCriteria.contributions.num.max;
                }
            }
            if (filtrationCriteria.contributions.value) {
                conditions["contributions.value"] = {};
                if (filtrationCriteria.contributions.value.min) {
                    conditions["contributions.value"].$gte = filtrationCriteria.contributions.value.min;
                }
                if (filtrationCriteria.contributions.value.max) {
                    conditions["contributions.value"].$lte = filtrationCriteria.contributions.value.max;
                }
            }
        }
        if (filtrationCriteria.numTracks) {
            conditions["numTracks"] = {};
            if (filtrationCriteria.numTracks.min) {
                conditions["numTracks"].$gte = filtrationCriteria.numTracks.min;
            }
            if (filtrationCriteria.numTracks.max) {
                conditions["numTracks"].$lte = filtrationCriteria.numTracks.max;
            }
        }
        if (filtrationCriteria.valueCartProducts) {
            conditions["valueCartProducts"] = {};
            if (filtrationCriteria.valueCartProducts.min) {
                conditions["valueCartProducts"].$gte = filtrationCriteria.valueCartProducts.min;
            }
            if (filtrationCriteria.valueCartProducts.max) {
                conditions["valueCartProducts"].$lte = filtrationCriteria.valueCartProducts.max;
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
            roundName: model.roundName,
            inProgress: model.inProgress,
            duration: {
                start: model.duration.start,
                end: model.duration.end,
                months: model.duration.months
            },
            deliveries: {
                fee: model.deliveries.fee,
                numPayments: model.deliveries.numPayments,
                valuePayments: model.deliveries.valuePayments
            },
            contributions: {
                num: model.contributions.num,
                value: model.contributions.value
            },
            numTracks: model.numTracks,
            valueCartProducts: model.valueCartProducts
        };
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.roundName) {
            document.roundName = details.roundName;
        }
        if (details.inProgress) {
            document.inProgress = details.inProgress;
        }
        if (details.duration) {
            if (details.duration.start) {
                document.duration.start = details.duration.start;
            }
            if (details.duration.end) {
                document.duration.end = details.duration.end;
            }
            if (details.duration.months) {
                document.duration.months = details.duration.months;
            }
        }
        if (details.deliveries) {
            if (details.deliveries.fee) {
                document.deliveries.fee = details.deliveries.fee;
            }
            if (details.deliveries.numPayments) {
                document.deliveries.numPayments = details.deliveries.numPayments;
            }
            if (details.deliveries.valuePayments) {
                document.deliveries.valuePayments = details.deliveries.valuePayments;
            }
        }
        if (details.contributions) {
            if (details.contributions.num) {
                document.contributions.num = details.contributions.num;
            }
            if (details.contributions.value) {
                document.contributions.value = details.contributions.value;
            }
        }
        if (details.numTracks) {
            document.numTracks = details.numTracks;
        }
        if (details.valueCartProducts) {
            document.valueCartProducts = details.valueCartProducts;
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
                    roundName: model.roundName,
                    inProgress: model.inProgress,
                    duration: {
                        start: model.duration.start,
                        end: model.duration.end,
                        months: model.duration.months
                    },
                    deliveries: {
                        fee: model.deliveries.fee,
                        numPayments: model.deliveries.numPayments,
                        valuePayments: model.deliveries.valuePayments
                    },
                    contributions: {
                        num: model.contributions.num,
                        value: model.contributions.value
                    },
                    numTracks: model.numTracks,
                    valueCartProducts: model.valueCartProducts,
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
