"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var call_263_1 = require("./call-263");
var core_1 = require("./core");
var groc_round_1 = require("./groc-round");
var powertel_1 = require("./powertel");
var routers_1 = require("./routers");
/******************************************************************************/
var MongoDB = (function () {
    /*****************************************************************/
    function MongoDB(emitEvent, mapDetails, checkThrow) {
        this.middleware = [];
        this.linkToDB = "mongodb://127.0.0.1:27017/AthenaTest";
        /*****************************************************************/
        this.connectToDatabase = function (linkToDB) {
            mongoose.connect(linkToDB, function (err, res) {
                if (err) {
                    throw new Error("Error connecting to database : " + linkToDB + ", Error details : " + err);
                }
                else {
                    console.log("Connected to MongoDB database : " + linkToDB);
                }
            });
        };
        this.connectToDatabase(this.linkToDB);
        this.core = core_1.default(emitEvent, mapDetails, checkThrow);
        this.call263 = call_263_1.default(emitEvent, mapDetails, checkThrow);
        this.grocRound = groc_round_1.default(emitEvent, mapDetails, checkThrow);
        this.powertel = powertel_1.default(emitEvent, mapDetails, checkThrow);
        this.routers = routers_1.default(emitEvent, mapDetails, checkThrow);
    }
    return MongoDB;
}());
exports.default = MongoDB;
/******************************************************************************/
