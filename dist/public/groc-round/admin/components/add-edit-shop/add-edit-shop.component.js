var GrocRoundAdminAddEditShopComponent;
(function (GrocRoundAdminAddEditShopComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $routeParams, $location, $mdDialog, ToastService, DialogService, ShopsService) {
            var _this = this;
            this.$q = $q;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.DialogService = DialogService;
            this.ShopsService = ShopsService;
            /***************************************************/
            this.initMembers = function () {
                _this.promises = _this.ShopsService.promises;
                _this.progress = _this.ShopsService.progress;
                _this.addDetails = {
                    shopName: ""
                };
                _this.updateDetails = {
                    shopName: ""
                };
            };
            /***************************************************/
            this.determineMode = function () {
                if (_this.$routeParams.shopId) {
                    _this.editMode = true;
                    _this.shopId = _this.$routeParams.shopId;
                    _this.findShopInfo();
                }
                else {
                    _this.editMode = false;
                }
            };
            /***************************************************/
            this.findShopInfo = function () {
                _this.loading = true;
                var matches = _this.ShopsService.shops.filter(function (shop) {
                    return (_this.shopId === shop.id);
                });
                if (matches.length) {
                    _this.copyDetails(matches[0]);
                    _this.loading = false;
                }
                else {
                    _this.ShopsService.getShop(_this.shopId)
                        .then(function (foundShop) {
                        _this.copyDetails(foundShop);
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
            this.copyDetails = function (foundShop) {
                _this.updateDetails = {
                    shopName: foundShop.shopName
                };
            };
            /***************************************************/
            this.addShop = function () {
                if (!_this.addDetails.shopName) {
                    return _this.ToastService.showSimple("Shop name is missing");
                }
                _this.adding = true;
                return _this.ShopsService.addShop(_this.addDetails)
                    .then(function (response) {
                    _this.$location.path("/shops");
                })
                    .finally(function () {
                    _this.adding = false;
                });
            };
            /***************************************************/
            this.updateShop = function () {
                if (!_this.shopId) {
                    return _this.ToastService.showSimple("Shop ID is missing");
                }
                if (!_this.updateDetails.shopName) {
                    return _this.ToastService.showSimple("Shop name is missing");
                }
                _this.updating = true;
                return _this.ShopsService.updateShop(_this.shopId, _this.updateDetails)
                    .then(function (response) {
                    _this.$location.path("/shops");
                })
                    .finally(function () {
                    _this.updating = false;
                });
            };
            /***************************************************/
            this.deleteShop = function () {
                if (!_this.shopId) {
                    return _this.ToastService.showSimple("Shop ID is missing");
                }
                _this.deleting = true;
                _this.DialogService.showConfirm("Delete Shop", "Are you sure?", null)
                    .then(function (sure) {
                    if (sure) {
                        return _this.ShopsService.removeShop(_this.shopId);
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
            this.determineMode();
        }
        return Component;
    }());
    GrocRoundAdminAddEditShopComponent.Component = Component;
})(GrocRoundAdminAddEditShopComponent || (GrocRoundAdminAddEditShopComponent = {}));
/*******************************************************************/
