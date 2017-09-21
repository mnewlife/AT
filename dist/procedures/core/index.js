"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./common/");
/******************************************************************************/
var Core = (function () {
    function Core(common) {
        this.common = common;
    }
    return Core;
}());
/******************************************************************************/
exports.default = function (emitEvent, components) {
    return new Core(_1.default(emitEvent, components.helpers.moders.checkThrow, components.authentication.signIn, components.communication.mailAgent.sendEmail, components.authentication.authPassword, components.authentication.createHashedPassword, components.session.signedIn, components.session.signOut, components.helpers.numbers.generateRandomNumber, components.storage.core.user.getById, components.storage.core.user.update, components.storage.core.user.updateById, components.storage.core.user.removeById));
};
/******************************************************************************/
