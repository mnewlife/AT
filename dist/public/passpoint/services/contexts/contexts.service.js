var PasspointContextsService;
(function (PasspointContextsService) {
    var Service = (function () {
        /***************************************************/
        function Service($location) {
            var _this = this;
            this.$location = $location;
            /***************************************************/
            this.handleInnerContext = function (innerContext) {
                _this.innerContext = innerContext;
                if (_this.innerContext === "change-email-address") {
                    _this.$location.path("/sign-in");
                }
                if (_this.innerContext === "request-reset-code") {
                    _this.$location.path("/sign-in");
                }
                if (_this.innerContext === "reset-password") {
                    _this.$location.path("/sign-in");
                }
                if (_this.innerContext === "delete-account") {
                    _this.$location.path("/sign-in");
                }
                if (_this.innerContext === "verify-account") {
                    _this.$location.path("/sign-in");
                }
                if (_this.innerContext === "sign-up") {
                    _this.$location.path("/sign-up");
                }
            };
            var decoded = null;
            try {
                if (window.jsonString) {
                    decoded = JSON.parse(window.jsonString);
                }
            }
            catch (ex) {
                console.log("Something went wrong, " + ex);
            }
            if (decoded && decoded.payload) {
                this.decoded = decoded;
                if (decoded.payload.appContext) {
                    this.appContext = decoded.payload.appContext;
                }
                if (decoded.payload.innerContext) {
                    this.handleInnerContext(decoded.payload.innerContext);
                }
                if (decoded.payload.nextInnerContext) {
                    this.nextInnerContext = decoded.payload.nextInnerContext;
                }
            }
        }
        return Service;
    }());
    PasspointContextsService.Service = Service;
})(PasspointContextsService || (PasspointContextsService = {}));
/*******************************************************************/ 
