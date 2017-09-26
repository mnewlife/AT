var GrocRoundAdminProfileService;
(function (GrocRoundAdminProfileService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, $timeout, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.$timeout = $timeout;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            /***************************************************/
            this.signOut = function () {
                _this.progress.signOut = true;
                var promise = _this.$http.get("/core/auth/signOut")
                    .then(function (response) {
                    _this.progress.signOut = false;
                    window.location.href = "/passpoint";
                    return _this.$q.resolve(true);
                })
                    .catch(function (reason) {
                    _this.progress.signOut = false;
                    _this.ToastService.showSimple("Something went wrong signing you out");
                });
                angular.copy(promise, _this.promises.signOut);
            };
            this.progress = {
                signOut: false
            };
            this.promises = {
                signOut: this.$q.resolve(false)
            };
            if (this.ContextsService.currentUser) {
                this.user = {};
                angular.copy(this.ContextsService.currentUser, this.user);
            }
            else {
                window.location.href = "/passpoint";
            }
        }
        return Service;
    }());
    GrocRoundAdminProfileService.Service = Service;
})(GrocRoundAdminProfileService || (GrocRoundAdminProfileService = {}));
/*******************************************************************/ 
