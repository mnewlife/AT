"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var DataStructures = (function () {
    /*****************************************************************/
    function DataStructures(events, checkThrow) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        /*****************************************************************/
        this.mapDetails = function (details, destination, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    for (var detail in details) {
                        if (details.hasOwnProperty(detail)) {
                            if (isObjLiteral(details[detail])) {
                                _this.mapDetails(details[detail], destination[detail]);
                            }
                            else {
                                destination[detail] = details[detail];
                            }
                        }
                    }
                    resolve();
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.mapDetailsFailed({
                        details: details,
                        destination: destination,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "MapDetailsFailed",
                    data: {
                        reason: reason
                    }
                });
            });
            function isObjLiteral(obj) {
                var test = obj;
                return (typeof obj !== "object" || obj === null ? false : (function () {
                    while (!false) {
                        if (Object.getPrototypeOf(test = Object.getPrototypeOf(test)) === null) {
                            break;
                        }
                    }
                    return Object.getPrototypeOf(obj) === test;
                })());
            }
        };
        /*****************************************************************/
        this.sortObjectArray = function (array, criteria, order, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    var referenceArray = criteria.split(".");
                    array.sort(function (alpha, beta) {
                        var alphaValue = _this.getPropertyReference(alpha, referenceArray);
                        var betaValue = _this.getPropertyReference(beta, referenceArray);
                        if (alphaValue < betaValue)
                            return (order === "Ascending") ? -1 : 1;
                        if (alphaValue > betaValue)
                            return (order === "Ascending") ? 1 : -1;
                        return 0;
                    });
                    resolve(array);
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.sortObjectArrayFailed({
                        array: array,
                        criteria: criteria,
                        order: order,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "SortObjectArrayFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.getPropertyReference = function (object, referenceArray, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            for (var i = 0; i < referenceArray.length; i++) {
                if (!object)
                    return null;
                object = object[referenceArray[i]];
            }
            return object;
        };
    }
    return DataStructures;
}());
exports.default = DataStructures;
/******************************************************************************/
