var GrocRoundAdminProductsService;
(function (GrocRoundAdminProductsService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, $timeout, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.$timeout = $timeout;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            this.urlPrefix = "/grocRound/admin/products";
            /***************************************************/
            this.getProducts = function () {
                _this.progress.getProducts = true;
                var promise = _this.$http.get(_this.urlPrefix + "/getProducts")
                    .then(function (response) {
                    _this.progress.getProducts = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            if (_this.products.length) {
                                _this.products = [];
                            }
                            responseData.payload.foundProducts.forEach(function (product) {
                                _this.products.push(product);
                            });
                        });
                        return _this.$q.resolve(true);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get product records";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getProducts = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
                angular.copy(promise, _this.promises.getProducts);
                return _this.promises.getProducts;
            };
            /***************************************************/
            this.getProduct = function (productId) {
                return _this.$http.get(_this.urlPrefix + "/getProduct/" + productId)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        return _this.$q.resolve(responseData.payload.foundProduct);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get product record";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getProducts = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
            /***************************************************/
            this.addProduct = function (details) {
                return _this.$http.post(_this.urlPrefix + "/addProduct", details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            _this.products.push(responseData.payload.addedProduct);
                        });
                        _this.ToastService.showSimple("Product Added");
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    if (reason.message) {
                        _this.ToastService.showSimple(reason.message);
                        return _this.$q.reject({
                            message: reason.message
                        });
                    }
                    else {
                        var message = "Something went wrong";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                });
            };
            /***************************************************/
            this.updateProduct = function (productId, details) {
                return _this.$http.post(_this.urlPrefix + "/updateProduct/" + productId, details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            var matches = _this.products.filter(function (product) {
                                return (responseData.payload.updatedProduct.id === product.id);
                            });
                            if (matches.length) {
                                angular.copy(responseData.payload.updatedProduct, _this.products[_this.products.indexOf(matches[0])]);
                            }
                        });
                        _this.ToastService.showSimple("Product record updated");
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    if (reason.message) {
                        _this.ToastService.showSimple(reason.message);
                        return _this.$q.reject({
                            message: reason.message
                        });
                    }
                    else {
                        var message = "Something went wrong";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                });
            };
            /***************************************************/
            this.removeProduct = function (productId) {
                return _this.$http.get(_this.urlPrefix + "/deleteProduct/" + productId)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            var matches = _this.products.filter(function (product) {
                                return (product.id === productId);
                            });
                            if (matches.length) {
                                _this.products.splice(_this.products.indexOf(matches[0]), 1);
                            }
                        });
                        _this.ToastService.showSimple("Product record deleted");
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    if (reason.message) {
                        _this.ToastService.showSimple(reason.message);
                        return _this.$q.reject({
                            message: reason.message
                        });
                    }
                    else {
                        var message = "Something went wrong";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                });
            };
            this.progress = {
                getProducts: false
            };
            this.promises = {
                getProducts: this.$q.resolve(false)
            };
            this.products = [];
            this.getProducts();
        }
        return Service;
    }());
    GrocRoundAdminProductsService.Service = Service;
})(GrocRoundAdminProductsService || (GrocRoundAdminProductsService = {}));
/*******************************************************************/ 
