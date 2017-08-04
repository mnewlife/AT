"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./core/index");
var index_2 = require("./call-263/index");
var index_3 = require("./groc-round/index");
/******************************************************************************/
var Components = (function () {
    function Components(config, components) {
        this.core = components.core;
        this.call263 = components.call263;
        this.grocRound = components.grocRound;
    }
    return Components;
}());
/******************************************************************************/
function factory(config) {
    var components = {
        core: index_1.default,
        call263: index_2.default,
        grocRound: index_3.default
    };
    return new Components(config, components);
}
exports.default = factory;
/******************************************************************************/
