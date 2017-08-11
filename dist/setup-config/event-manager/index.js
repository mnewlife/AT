"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./hook-structure/index");
/******************************************************************************/
var EventManager = (function () {
    function EventManager(hookStructure) {
        this.hookStructure = hookStructure;
    }
    EventManager.prototype.emit = function (happening) { };
    return EventManager;
}());
function setupEventManager(components, tasks) {
    var hookStructure = index_1.default(components, tasks);
    return new EventManager(hookStructure);
}
exports.default = setupEventManager;
/******************************************************************************/
