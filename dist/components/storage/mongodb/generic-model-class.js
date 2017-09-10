"use strict";
/******************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_controller_1 = require("./mongo-controller");
/******************************************************************************/
var ModelController = (function (_super) {
    __extends(ModelController, _super);
    /*****************************************************************/
    function ModelController(events, Model, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract) {
        var _this = _super.call(this, events, Model, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract) || this;
        _this.events = events;
        _this.Model = Model;
        _this.mapDetails = mapDetails;
        _this.checkThrow = checkThrow;
        _this.makeConditions = makeConditions;
        _this.makeSortCriteria = makeSortCriteria;
        _this.generateAddDetails = generateAddDetails;
        _this.generateUpdateDetails = generateUpdateDetails;
        _this.convertToAbstract = convertToAbstract;
        return _this;
    }
    return ModelController;
}(mongo_controller_1.default));
exports.default = ModelController;
/******************************************************************************/
