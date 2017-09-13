"use strict";
/*******************************************************************/
exports.__esModule = true;
/// <reference path="..\..\..\..\node_modules\@types\angular-route\index.d.ts"/>
/*******************************************************************/
var Promise = require("bluebird");
var angular = require("angular");
/*******************************************************************/
(function () {
    "use strict";
    angular.module("toast", []);
    angular.module("toast").factory("Toast", ToastService);
    ToastService.$inject = ["$mdToast"];
    function ToastService($mdToast) {
        /***************************************************/
        return {
            showSimple: showSimple,
            showWithAction: showWithAction
        };
        /***************************************************/
        function showSimple(message) {
            return new Promise(function (resolve, reject) {
                var simpleToast = $mdToast.simple()
                    .textContent((message) ? message : "")
                    .hideDelay(3000);
                $mdToast.show(simpleToast)
                    .then(function (response) {
                    resolve();
                });
            });
        }
        /***************************************************/
        function showWithAction(message, action) {
            return new Promise(function (resolve, reject) {
                var toast = $mdToast.simple()
                    .textContent(message)
                    .action(action)
                    .highlightAction(false);
                $mdToast.show(toast)
                    .then(function (response) {
                    if (response == "ok") {
                        return resolve(true);
                    }
                    else {
                        return resolve(false);
                    }
                });
            });
        }
        /***************************************************/
    }
})();
