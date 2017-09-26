var GrocRoundAdminShopComponent;
(function (GrocRoundAdminShopComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $location, $routeParams, $mdDialog, ToastService, DialogService, ShopsService) {
            var _this = this;
            this.$q = $q;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.DialogService = DialogService;
            this.ShopsService = ShopsService;
            /***************************************************/
            this.initMembers = function () {
                _this.shop = {};
            };
            /***************************************************/
            this.deriveShopId = function () {
                if (_this.$routeParams.shopId) {
                    _this.getShopRecord(_this.$routeParams.shopId);
                }
                else {
                    window.history.back();
                }
            };
            /***************************************************/
            this.getShopRecord = function (id) {
                var loading = true;
                var matches = _this.ShopsService.shops.filter(function (shop) {
                    return (shop.id === id);
                });
                if (matches.length) {
                    _this.shop = _this.ShopsService.shops[_this.ShopsService.shops.indexOf(matches[0])];
                    _this.errorMessage = null;
                    _this.loading = false;
                }
                else {
                    _this.ShopsService.getShop(id)
                        .then(function (foundShop) {
                        angular.copy(foundShop, _this.shop);
                        _this.errorMessage = null;
                    })
                        .catch(function (reason) {
                        _this.errorMessage = (reason && reason.message) ? reason.message : "Couldn't get shop record";
                    })
                        .finally(function () {
                        _this.loading = false;
                    });
                }
            };
            /***************************************************/
            this.deleteShop = function () {
                _this.deleting = true;
                _this.DialogService.showConfirm("Delete Shop", "Are you sure?", null)
                    .then(function (sure) {
                    if (sure) {
                        return _this.ShopsService.removeShop(_this.shop.id);
                    }
                    else {
                        return _this.$q.reject();
                    }
                })
                    .then(function (response) {
                    _this.$location.path("/shops");
                })
                    .finally(function () {
                    _this.deleting = false;
                });
            };
            this.initMembers();
        }
        return Component;
    }());
    GrocRoundAdminShopComponent.Component = Component;
})(GrocRoundAdminShopComponent || (GrocRoundAdminShopComponent = {}));
/*******************************************************************/
