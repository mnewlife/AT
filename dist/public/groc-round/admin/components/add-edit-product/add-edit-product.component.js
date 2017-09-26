var GrocRoundAdminAddEditProductComponent;
(function (GrocRoundAdminAddEditProductComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $routeParams, $location, $mdDialog, ToastService, DialogService, ProductsService, PricesService) {
            var _this = this;
            this.$q = $q;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.DialogService = DialogService;
            this.ProductsService = ProductsService;
            this.PricesService = PricesService;
            /***************************************************/
            this.initMembers = function () {
                _this.promises = _this.ProductsService.promises;
                _this.progress = _this.ProductsService.progress;
                _this.addDetails = {
                    label: "",
                    effectivePrice: {
                        price: 0
                    }
                };
                _this.updateDetails = {
                    label: "",
                    effectivePrice: {
                        price: 0
                    }
                };
                _this.prices = [];
            };
            /***************************************************/
            this.determineMode = function () {
                if (_this.$routeParams.productId) {
                    _this.editMode = true;
                    _this.productId = _this.$routeParams.productId;
                    _this.findProductInfo();
                    _this.findPriceInfo();
                }
                else {
                    _this.editMode = false;
                }
            };
            /***************************************************/
            this.findProductInfo = function () {
                _this.loading = true;
                var matches = _this.ProductsService.products.filter(function (product) {
                    return (_this.productId === product.id);
                });
                if (matches.length) {
                    _this.copyDetails(matches[0]);
                    _this.loading = false;
                }
                else {
                    _this.ProductsService.getProduct(_this.productId)
                        .then(function (foundProduct) {
                        _this.copyDetails(foundProduct);
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
            this.findPriceInfo = function () {
                _this.loadingPrices = true;
                _this.PricesService.getPrices({ productId: _this.productId })
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
            this.copyDetails = function (foundProduct) {
                _this.updateDetails = {
                    label: foundProduct.label,
                    effectivePrice: foundProduct.effectivePrice
                };
            };
            /***************************************************/
            this.addProduct = function () {
                if (!_this.addDetails.label) {
                    return _this.ToastService.showSimple("Product label is missing");
                }
                _this.adding = true;
                return _this.ProductsService.addProduct(_this.addDetails)
                    .then(function (response) {
                    _this.$location.path("/products");
                })
                    .finally(function () {
                    _this.adding = false;
                });
            };
            /***************************************************/
            this.updateProduct = function () {
                if (!_this.productId) {
                    return _this.ToastService.showSimple("Product ID is missing");
                }
                if (!_this.updateDetails.label) {
                    return _this.ToastService.showSimple("Product label is missing");
                }
                _this.updating = true;
                return _this.ProductsService.updateProduct(_this.productId, _this.updateDetails)
                    .then(function (response) {
                    _this.$location.path("/products");
                })
                    .finally(function () {
                    _this.updating = false;
                });
            };
            /***************************************************/
            this.deleteProduct = function () {
                if (!_this.productId) {
                    return _this.ToastService.showSimple("Product ID is missing");
                }
                _this.deleting = true;
                _this.DialogService.showConfirm("Delete Product", "Are you sure?", null)
                    .then(function (sure) {
                    if (sure) {
                        return _this.ProductsService.removeProduct(_this.productId);
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
            /***************************************************/
            this.addPrice = function (details) {
                if (!details.productId) {
                    return _this.ToastService.showSimple("Product ID is missing");
                }
                if (!details.shopId) {
                    return _this.ToastService.showSimple("Shop ID is missing");
                }
                if (!details.price) {
                    return _this.ToastService.showSimple("Price is missing");
                }
                if (!details.quantity) {
                    return _this.ToastService.showSimple("Quantity is missing");
                }
                _this.addingPrice = true;
                return _this.PricesService.addPrice(details)
                    .then(function (addedPrice) {
                    _this.prices.push(addedPrice);
                })
                    .finally(function () {
                    _this.addingPrice = false;
                });
            };
            /***************************************************/
            this.updatePrice = function (priceId, details) {
                if (!priceId) {
                    return _this.ToastService.showSimple("Price ID is missing");
                }
                if (!details.productId) {
                    return _this.ToastService.showSimple("Product ID is missing");
                }
                if (!details.shopId) {
                    return _this.ToastService.showSimple("Shop ID is missing");
                }
                if (!details.price) {
                    return _this.ToastService.showSimple("Price is missing");
                }
                if (!details.quantity) {
                    return _this.ToastService.showSimple("Quantity is missing");
                }
                _this.updatingPrice = true;
                return _this.PricesService.updatePrice(priceId, details)
                    .then(function (updatedPrice) {
                    var matches = _this.prices.filter(function (price) {
                        return (price.id === updatedPrice.id);
                    });
                    if (matches.length) {
                        matches.forEach(function (price) {
                            angular.copy(updatedPrice, price);
                        });
                    }
                })
                    .finally(function () {
                    _this.updating = false;
                });
            };
            /***************************************************/
            this.deletePrice = function (priceId) {
                if (!priceId) {
                    return _this.ToastService.showSimple("Price ID is missing");
                }
                _this.deletingPrice = true;
                _this.DialogService.showConfirm("Delete Price", "Are you sure?", null)
                    .then(function (sure) {
                    if (sure) {
                        return _this.PricesService.removePrice(priceId);
                    }
                    else {
                        return _this.$q.reject();
                    }
                })
                    .then(function (response) {
                    var matches = _this.prices.filter(function (price) {
                        return (price.id === priceId);
                    });
                    if (matches.length) {
                        matches.forEach(function (price) {
                            _this.prices.splice(_this.prices.indexOf(price), 1);
                        });
                    }
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
    GrocRoundAdminAddEditProductComponent.Component = Component;
})(GrocRoundAdminAddEditProductComponent || (GrocRoundAdminAddEditProductComponent = {}));
/*******************************************************************/
