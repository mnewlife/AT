var ContextsService;
(function (ContextsService) {
    var Service = (function () {
        /***************************************************/
        function Service() {
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
                if (payload.appContext) {
                    this.appContext = payload.appContext;
                }
                if (payload.innerContext) {
                    this.innerContext = payload.innerContext;
                }
            }
        }
        return Service;
    }());
    ContextsService.Service = Service;
})(ContextsService || (ContextsService = {}));
/*******************************************************************/ 
