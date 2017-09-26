var GrocRoundAdminShopsComponent;
(function (GrocRoundAdminShopsComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $location, $mdDialog, ToastService, ShopsService) {
            var _this = this;
            this.$q = $q;
            this.$location = $location;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.ShopsService = ShopsService;
            /***************************************************/
            this.route = function (destination) {
                if (destination) {
                    _this.$location.path(destination);
                }
            };
            /***************************************************/
            this.attachToPromise = function () {
                _this.ShopsService.promises.getShops
                    .then(function (done) {
                    if (done) {
                        _this.errorMessage = null;
                    }
                })
                    .catch(function (reason) {
                    _this.errorMessage = (reason && reason.message) ? reason.message : "Couldn't get shops";
                });
            };
            /***************************************************/
            this.getShops = function () {
                _this.ShopsService.getShops()
                    .catch(function (reason) {
                    _this.errorMessage = (reason && reason.message) ? reason.message : "Couldn't get shop records";
                });
            };
            this.shops = this.ShopsService.shops;
            this.attachToPromise();
            if (!this.shops.length && !this.ShopsService.progress.getShops) {
                this.getShops();
            }
        }
        return Component;
    }());
    GrocRoundAdminShopsComponent.Component = Component;
})(GrocRoundAdminShopsComponent || (GrocRoundAdminShopsComponent = {}));
/*******************************************************************/
