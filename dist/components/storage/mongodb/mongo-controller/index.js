"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var mongoose = require("mongoose");
/******************************************************************************/
var MongoController = (function () {
    /*****************************************************************/
    function MongoController(events, Model, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract) {
        var _this = this;
        this.events = events;
        this.Model = Model;
        this.mapDetails = mapDetails;
        this.checkThrow = checkThrow;
        this.makeConditions = makeConditions;
        this.makeSortCriteria = makeSortCriteria;
        this.generateAddDetails = generateAddDetails;
        this.generateUpdateDetails = generateUpdateDetails;
        this.convertToAbstract = convertToAbstract;
        /*****************************************************************/
        this.get = function (filtrationCriteria, sortCriteria, limit, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                if (filtrationCriteria) {
                    return _this.makeConditions(filtrationCriteria);
                }
                else {
                    return Promise.resolve({});
                }
            })
                .then(function (conditions) {
                if (sortCriteria) {
                    return _this.makeSortCriteria(sortCriteria)
                        .then(function (sortString) {
                        return Promise.resolve({
                            conditions: conditions,
                            sortString: sortString
                        });
                    });
                }
                else {
                    return Promise.resolve({
                        conditions: conditions,
                        sortString: ""
                    });
                }
            })
                .then(function (holder) {
                return _this.find(holder.conditions, holder.sortString, limit);
            })
                .then(function (foundDocuments) {
                return _this.convertToAbstract(foundDocuments);
            })
                .then(function (convertedDocuments) {
                new Promise(function (resolve, reject) {
                    _this.events.got({
                        filtrationCriteria: filtrationCriteria,
                        sortCriteria: sortCriteria,
                        limit: limit,
                        ids: convertedDocuments.map(function (document) {
                            return document.id;
                        })
                    });
                    resolve();
                });
                return Promise.resolve(convertedDocuments);
            })
                .catch(function (reason) {
                console.log(">" + reason);
                new Promise(function (resolve, reject) {
                    _this.events.getFailed({
                        filtrationCriteria: filtrationCriteria,
                        sortCriteria: sortCriteria,
                        limit: limit,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "GetFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.getById = function (documentId, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.findById(mongoose.Types.ObjectId(documentId));
            })
                .then(function (foundDocument) {
                return _this.convertToAbstract([foundDocument]);
            })
                .then(function (convertedDocuments) {
                new Promise(function (resolve, reject) {
                    _this.events.gotById({
                        id: documentId
                    });
                });
                return Promise.resolve(convertedDocuments[0]);
            })
                .catch(function (reason) {
                console.log(">>" + reason);
                new Promise(function (resolve, reject) {
                    _this.events.getByIdFailed({
                        id: documentId,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "GetByIdFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.addBatch = function (documents, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.saveMultipleDocuments(_this.generateAddDetails(documents));
            })
                .then(function (addedDocuments) {
                return _this.convertToAbstract(addedDocuments);
            })
                .then(function (convertedDocuments) {
                new Promise(function (resolve, reject) {
                    _this.events.added({
                        documents: convertedDocuments
                    });
                    resolve();
                });
                return Promise.resolve(convertedDocuments);
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.addFailed({
                        details: documents,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "AddBatchFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.add = function (details, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.saveDocument(_this.generateAddDetails([details])[0]);
            })
                .then(function (addedDocument) {
                return _this.convertToAbstract([addedDocument]);
            })
                .then(function (convertedDocuments) {
                new Promise(function (resolve, reject) {
                    _this.events.added({
                        documents: convertedDocuments
                    });
                    resolve();
                });
                return Promise.resolve(convertedDocuments[0]);
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.addFailed({
                        details: [details],
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "AddFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.update = function (filtrationCriteria, details, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.makeConditions(filtrationCriteria);
            }).then(function (conditions) {
                return _this.find(conditions, null, null);
            })
                .then(function (foundDocuments) {
                return Promise.all(foundDocuments.map(function (document) {
                    return _this.generateUpdateDetails(document, details)
                        .then(function (fedDocument) {
                        return new Promise(function (resolve, reject) {
                            fedDocument.save(function (err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(fedDocument);
                                }
                            });
                        });
                    });
                }));
            })
                .then(function (updatedDocuments) {
                return _this.convertToAbstract(updatedDocuments);
            })
                .then(function (updatedDocuments) {
                new Promise(function (resolve, reject) {
                    _this.events.updated({
                        conditions: filtrationCriteria,
                        documents: updatedDocuments
                    });
                    resolve();
                });
                return Promise.resolve(updatedDocuments);
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.updateFailed({
                        conditions: filtrationCriteria,
                        updates: details,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "UpdateFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.updateById = function (documentId, details, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            var documentObjectId;
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.findById(mongoose.Types.ObjectId(documentId));
            })
                .then(function (document) {
                return _this.generateUpdateDetails(document, details)
                    .then(function (fedDocument) {
                    return new Promise(function (resolve, reject) {
                        fedDocument.save(function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(fedDocument);
                            }
                        });
                    });
                });
            })
                .then(function (updatedDocument) {
                return _this.convertToAbstract([updatedDocument]);
            })
                .then(function (convertedDocuments) {
                new Promise(function (resolve, reject) {
                    _this.events.updated({
                        id: documentId,
                        documents: convertedDocuments
                    });
                    resolve();
                });
                return Promise.resolve(convertedDocuments[0]);
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.updateFailed({
                        id: documentId,
                        updates: details,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "UpdateFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.remove = function (filtrationCriteria, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.makeConditions(filtrationCriteria);
            })
                .then(function (conditions) {
                return _this.removeDocuments(conditions);
            })
                .then(function (response) {
                new Promise(function (resolve, reject) {
                    _this.events.removed({
                        conditions: filtrationCriteria
                    });
                    resolve();
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.removeFailed({
                        conditions: filtrationCriteria,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "RemoveFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.removeById = function (documentId, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.removeDocuments({
                    "_id": mongoose.Types.ObjectId(documentId)
                });
            })
                .then(function (response) {
                new Promise(function (resolve, reject) {
                    _this.events.removed({
                        id: documentId
                    });
                    resolve();
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.removeFailed({
                        id: documentId,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "RemoveFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        /*****************************************************************/
        this.find = function (conditions, sortCriteria, limit) {
            conditions = (conditions) ? conditions : "";
            sortCriteria = (sortCriteria) ? sortCriteria : "-updatedAt";
            limit = (limit) ? limit : 50;
            return new Promise(function (resolve, reject) {
                _this.Model.find(conditions).sort(sortCriteria).limit(limit).exec(function (err, foundDocuments) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(foundDocuments);
                    }
                });
            });
        };
        /*****************************************************************/
        this.findById = function (id) {
            return new Promise(function (resolve, reject) {
                _this.Model.findById(id.toHexString(), function (err, foundDocument) {
                    if (err) {
                        return reject(err);
                    }
                    if (foundDocument) {
                        resolve(foundDocument);
                    }
                    else {
                        reject({
                            identifier: "DocumentNotFound",
                            data: {}
                        });
                    }
                });
            });
        };
        /*****************************************************************/
        this.saveDocument = function (details) {
            return new Promise(function (resolve, reject) {
                var newModel = new _this.Model(details);
                newModel.save(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newModel);
                    }
                });
            });
        };
        /*****************************************************************/
        this.saveMultipleDocuments = function (detailArr) {
            return new Promise(function (resolve, reject) {
                _this.Model.insertMany(detailArr, function (err, savedDocuments) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(savedDocuments);
                    }
                });
            });
        };
        /*****************************************************************/
        this.updateDocuments = function (conditions, details) {
            return new Promise(function (resolve, reject) {
                var returnDocuments = [];
                _this.Model.find(conditions).exec(function (err, foundDocuments) {
                    if (err) {
                        return reject(err);
                    }
                    Promise.all(foundDocuments.map(function (document) {
                        return new Promise(function (resolve, reject) {
                            _this.mapDetails(details, document);
                            document.save(function (err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    returnDocuments.push(document);
                                    resolve();
                                }
                            });
                        });
                    }))
                        .then(function (response) {
                        resolve(returnDocuments);
                    });
                });
            });
        };
        /*****************************************************************/
        this.removeDocuments = function (conditions) {
            return new Promise(function (resolve, reject) {
                _this.Model.find(conditions).remove(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
    }
    return MongoController;
}());
exports.default = MongoController;
/******************************************************************************/
