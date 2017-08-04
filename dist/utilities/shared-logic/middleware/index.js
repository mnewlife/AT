"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Middleware = (function () {
    function Middleware() {
    }
    /*****************************************************************/
    Middleware.prototype.retrieveMwareLists = function (mware, subjectModule) {
        if (subjectModule.middleware && subjectModule.middleware.length) {
            mware[subjectModule] = [];
            subjectModule.middleware.forEach(function (subject) {
                mware[subjectModule].push(subject);
            });
        }
    };
    return Middleware;
}());
/******************************************************************************/
exports.default = new Middleware();
/******************************************************************************/
