"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Mware = (function () {
    function Mware() {
        /*****************************************************************/
        this.retrieveMwareLists = function (interfaces, subject, subjectModule) {
            if (subjectModule.middleware.length) {
                interfaces[subject] = [];
                subjectModule.middleware.forEach(function (singleMW) {
                    interfaces[subject].push(singleMW);
                });
            }
        };
        /*****************************************************************/
    }
    return Mware;
}());
exports.default = Mware;
/******************************************************************************/
