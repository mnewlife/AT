"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("./hooks");
/******************************************************************************/
var EventListener = (function () {
    /*****************************************************************/
    function EventListener(hooks) {
        this.hooks = hooks;
        /*****************************************************************/
        this.updateReferences = function (components, procedures) {
            //this.hooks.updateReferences( components, procedures );
        };
        /*****************************************************************/
        this.emit = function (happening) {
            /*
            if ( this.hooks.hookStructure[ happening.context ] ) {
              this.findAndExecuteAfterware( this.hooks.hookStructure[ happening.context ], happening );
            } else {
              this.findAndExecuteAfterware( this.hooks.hookStructure.other, happening );
            }
            */
        };
    }
    return EventListener;
}());
/******************************************************************************/
exports.default = function () {
    var hooksInstance = hooks_1.default();
    return new EventListener(hooksInstance);
};
/******************************************************************************/
