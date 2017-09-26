var CoreAdminContextsService;
(function (CoreAdminContextsService) {
    var Service = (function () {
        /***************************************************/
        function Service($location) {
            var _this = this;
            this.$location = $location;
            /***************************************************/
            this.handleInnerContexts = function (innerContext) {
                _this.innerContext = innerContext;
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
            if (decoded) {
                if (decoded.payload) {
                    this.payload = decoded.payload;
                    if (decoded.payload.currentUser) {
                        this.currentUser = decoded.payload.currentUser;
                        if (this.currentUser.personalDetails) {
                            if (this.currentUser.personalDetails.dateOfBirth) {
                                this.currentUser.personalDetails.dateOfBirth = new Date(this.currentUser.personalDetails.dateOfBirth);
                            }
                        }
                    }
                    if (decoded.payload.innerContext) {
                        this.handleInnerContexts(decoded.payload.innerContext);
                    }
                }
            }
        }
        return Service;
    }());
    CoreAdminContextsService.Service = Service;
})(CoreAdminContextsService || (CoreAdminContextsService = {}));
/*******************************************************************/ 
