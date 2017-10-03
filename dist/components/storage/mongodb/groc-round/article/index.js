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
    var models = new generic_event_class_1.default(emitEvent, "GrocRound|Article");
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
        if (filtrationCriteria.title) {
            conditions["title"] = filtrationCriteria.title;
        }
        if (filtrationCriteria.images) {
            conditions["images"] = { $all: filtrationCriteria.images };
        }
        if (filtrationCriteria.tags) {
            conditions["tags"] = { $all: filtrationCriteria.tags };
        }
        if (filtrationCriteria.content) {
            conditions["content"] = filtrationCriteria.content;
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
            user: {
                userId: mongoose.Types.ObjectId(model.user.userId),
                emailAddress: model.user.emailAddress
            },
            title: model.title,
            images: model.images,
            tags: model.tags,
            content: model.content
        };
        if (model.user.fullName) {
            details.user.fullName = model.user.fullName;
        }
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
        if (details.title) {
            document.title = details.title;
        }
        if (details.images) {
            document.images = [];
            details.images.forEach(function (image) {
                document.images.push(image);
            });
        }
        if (details.tags) {
            document.tags = [];
            details.tags.forEach(function (tag) {
                document.tags.push(tag);
            });
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
                        userId: model.user.userId.toHexString(),
                        emailAddress: model.user.emailAddress
                    },
                    title: model.title,
                    images: model.images,
                    tags: model.tags,
                    content: model.content,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.user.fullName) {
                    returnModel.user.fullName = model.user.fullName;
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/ 
