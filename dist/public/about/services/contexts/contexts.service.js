var AboutContextsService;
(function (AboutContextsService) {
    var Service = (function () {
        /***************************************************/
        function Service($http) {
            var _this = this;
            this.$http = $http;
            /***************************************************/
            this.signOut = function () {
                var promise = _this.$http.get("/core/auth/signOut")
                    .then(function (response) {
                    window.location.href = "/passpoint";
                })
                    .catch(function (reason) {
                    window.alert("Something went wrong signing you out");
                });
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
                if (decoded.payload.currentUser) {
                    this.currentUser = decoded.payload.currentUser;
                }
            }
        }
        return Service;
    }());
    AboutContextsService.Service = Service;
})(AboutContextsService || (AboutContextsService = {}));
/*******************************************************************/ 
