"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Events = (function () {
    /*****************************************************************/
    function Events(emitEvent, context) {
        var _this = this;
        this.emitEvent = emitEvent;
        this.context = context;
        /*****************************************************************/
        this.got = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "Got",
                data: {
                    filtrationCriteria: data.filtrationCriteria,
                    sortCriteria: data.sortCriteria,
                    limit: data.limit,
                    ids: data.ids
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.getFailed = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "GetFailed",
                data: {
                    filtrationCriteria: data.filtrationCriteria,
                    sortCriteria: data.sortCriteria,
                    limit: data.limit,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.gotById = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "GotById",
                data: {
                    id: data.id
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.getByIdFailed = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "GetByIdFailed",
                data: {
                    id: data.id,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.added = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "Added",
                data: {
                    documents: data.documents
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.addFailed = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "AddFailed",
                data: {
                    details: data.details,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.updated = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "Updated",
                data: {
                    id: (data.id) ? data.id : null,
                    conditions: (data.conditions) ? data.conditions : null,
                    documents: data.documents
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.updateFailed = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "UpdateFailed",
                data: {
                    id: (data.id) ? data.id : null,
                    conditions: (data.conditions) ? data.conditions : null,
                    updates: data.updates,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.removed = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "Removed",
                data: {
                    id: (data.id) ? data.id : null,
                    conditions: (data.conditions) ? data.conditions : null,
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.removeFailed = function (data) {
            var event = {
                context: _this.context,
                tags: [],
                identifier: "RemoveFailed",
                data: {
                    id: (data.id) ? data.id : null,
                    conditions: (data.conditions) ? data.conditions : null,
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
