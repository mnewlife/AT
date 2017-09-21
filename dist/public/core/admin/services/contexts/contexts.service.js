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
            var payload = null;
            try {
                if (window.jsonString) {
                    payload = JSON.parse(window.jsonString);
                }
            }
            catch (ex) {
                console.log("Something went wrong, " + ex);
            }
            if (payload) {
                this.payload = payload;
                if (payload.currentUser) {
                    this.currentUser = payload.currentUser;
                }
                if (payload.innerContext) {
                    this.handleInnerContexts(payload.innerContext);
                }
            }
        }
        return Service;
    }());
    CoreAdminContextsService.Service = Service;
})(CoreAdminContextsService || (CoreAdminContextsService = {}));
/*******************************************************************/ 
