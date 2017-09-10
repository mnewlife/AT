"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Events = (function () {
    /*****************************************************************/
    function Events(emitEvent) {
        var _this = this;
        this.emitEvent = emitEvent;
        /*****************************************************************/
        this.mapDetailsFailed = function (data) {
            var event = {
                context: "DataStructures",
                tags: [],
                identifier: "MapDetailsFailed",
                data: {
                    details: data.details,
                    destination: data.destination,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.sortObjectArrayFailed = function (data) {
            var event = {
                context: "DataStructures",
                tags: [],
                identifier: "SortObjectArrayFailed",
                data: {
                    array: data.array,
                    criteria: data.criteria,
                    order: data.order,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
    }
    return Events;
}());
exports.default = Events;
/******************************************************************************/ 
