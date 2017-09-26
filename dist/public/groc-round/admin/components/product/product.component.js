var GrocRoundAdminProductComponent;
(function (GrocRoundAdminProductComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $location, $routeParams, $mdDialog, ToastService, DialogService, ProductsService, PricesService) {
            var _this = this;
            this.$q = $q;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.DialogService = DialogService;
            this.ProductsService = ProductsService;
            this.PricesService = PricesService;
            /***************************************************/
            this.initMembers = function () {
                _this.product = {};
                _this.prices = [];
            };
            /***************************************************/
            this.deriveProductId = function () {
                if (_this.$routeParams.productId) {
                    _this.getProductRecord(_this.$routeParams.productId);
                    _this.findPriceInfo(_this.$routeParams.productId);
                }
                else {
                    window.history.back();
                }
            };
            /***************************************************/
            this.findPriceInfo = function (id) {
                _this.loadingPrices = true;
                _this.PricesService.getPrices({ productId: id })
                    .then(function (prices) {
                    prices.forEach(function (price) {
                        _this.prices.push(price);
                    });
                })
                    .finally(function () {
                    _this.loadingPrices = false;
                });
            };
            /***************************************************/
            this.getProductRecord = function (id) {
                _this.loading = true;
                var matches = _this.ProductsService.products.filter(function (product) {
                    return (product.id === id);
                });
                if (matches.length) {
                    _this.product = _this.ProductsService.products[_this.ProductsService.products.indexOf(matches[0])];
                    _this.loading = false;
                }
                else {
                    _this.ProductsService.getProduct(id)
                        .then(function (foundProduct) {
                        angular.copy(foundProduct, _this.product);
                    })
                        .catch(function (reason) {
                        _this.errorMessage = (reason && reason.message) ? reason.message : "Couldn't get product record";
                    })
                        .finally(function () {
                        _this.loading = false;
                    });
                }
            };
            /***************************************************/
            this.deleteProduct = function () {
                _this.deleting = true;
                _this.DialogService.showConfirm("Delete Product", "Are you sure?", null)
                    .then(function (sure) {
                    if (sure) {
                        return _this.ProductsService.removeProduct(_this.product.id);
                    }
                    else {
                        return _this.$q.reject();
                    }
                })
                    .then(function (response) {
                    _this.$location.path("/products");
                })
                    .finally(function () {
                    _this.deleting = false;
                });
            };
            this.initMembers();
            this.deriveProductId();
        }
        return Component;
    }());
    GrocRoundAdminProductComponent.Component = Component;
})(GrocRoundAdminProductComponent || (GrocRoundAdminProductComponent = {}));
/*******************************************************************/
