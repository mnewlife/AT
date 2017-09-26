var GrocRoundAdminProductsComponent;
(function (GrocRoundAdminProductsComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $location, $mdDialog, ToastService, ProductsService) {
            var _this = this;
            this.$q = $q;
            this.$location = $location;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.ProductsService = ProductsService;
            /***************************************************/
            this.attachToPromise = function () {
                _this.ProductsService.promises.getProducts
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
            this.route = function (destination) {
                if (destination) {
                    _this.$location.path(destination);
                }
            };
            /***************************************************/
            this.getProducts = function () {
                _this.ProductsService.getProducts()
                    .catch(function (reason) {
                    _this.errorMessage = (reason && reason.message) ? reason.message : "Couldn't get products";
                });
            };
            this.products = this.ProductsService.products;
            this.progress = this.ProductsService.progress;
            this.attachToPromise();
            if (!this.products.length && !this.ProductsService.progress.getProducts) {
                this.getProducts();
            }
        }
        return Component;
    }());
    GrocRoundAdminProductsComponent.Component = Component;
})(GrocRoundAdminProductsComponent || (GrocRoundAdminProductsComponent = {}));
/*******************************************************************/
