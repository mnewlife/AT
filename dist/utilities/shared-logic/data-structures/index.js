"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var DataStructures = (function () {
    function DataStructures() {
    }
    /*****************************************************************/
    DataStructures.prototype.findInArray = function (arr, id, criteria) {
        return new Promise(function (resolve, reject) {
            var matches = arr.filter(function (subject) {
                return (subject[criteria] === id);
            });
            resolve(matches);
        });
    };
    /*****************************************************************/
    DataStructures.prototype.removeFromArray = function (arr, identifier) {
        return new Promise(function (resolve, reject) {
            if (typeof identifier === "string") {
                return removeById(identifier);
            }
            else {
                return removeByElement(identifier);
            }
            function removeById(id) {
                var matches = this.findInArray(arr, id);
                if (matches.length) {
                    matches.forEach(function (match) {
                        arr.splice(arr.indexOf(match), 1);
                    });
                    resolve();
                }
                else {
                    reject();
                }
            }
            function removeByElement(element) {
                var index = arr.indexOf(element);
                if (index !== -1) {
                    arr.splice(index, 1);
                    resolve();
                }
                else {
                    reject();
                }
            }
        });
    };
    /*****************************************************************/
    DataStructures.prototype.pushToArray = function (items, destination) {
        return new Promise(function (resolve, reject) {
            items.forEach(function (item) {
                destination.push(item);
            });
            resolve();
        });
    };
    /*****************************************************************/
    DataStructures.prototype.mapDetails = function (details, destination) {
        return new Promise(function (resolve, reject) {
            for (var detail in details) {
                if (details.hasOwnProperty(detail)) {
                    destination[detail] = details[detail];
                }
            }
            resolve();
        });
    };
    return DataStructures;
}());
/******************************************************************************/
exports.default = new DataStructures();
/******************************************************************************/
