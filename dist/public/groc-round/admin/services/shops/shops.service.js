var GrocRoundAdminShopsService;
(function (GrocRoundAdminShopsService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, $timeout, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.$timeout = $timeout;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            this.urlPrefix = "/grocRound/admin/shops";
            /***************************************************/
            this.getShops = function () {
                _this.progress.getShops = true;
                var promise = _this.$http.get(_this.urlPrefix + "/getShops")
                    .then(function (response) {
                    _this.progress.getShops = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            if (_this.shops.length) {
                                _this.shops = [];
                            }
                            responseData.payload.foundShops.forEach(function (shop) {
                                _this.shops.push(shop);
                            });
                        });
                        return _this.$q.resolve(true);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get shop records";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getShops = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
                angular.copy(promise, _this.promises.getShops);
                return _this.promises.getShops;
            };
            /***************************************************/
            this.getShop = function (shopId) {
                return _this.$http.get(_this.urlPrefix + "/getShop/" + shopId)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        return _this.$q.resolve(responseData.payload.foundShop);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get shop record";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getShops = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
            /***************************************************/
            this.addShop = function (details) {
                return _this.$http.post(_this.urlPrefix + "/addShop", details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            _this.shops.push(responseData.payload.addedShop);
                        });
                        _this.ToastService.showSimple("Shop Added");
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
            this.updateShop = function (shopId, details) {
                return _this.$http.post(_this.urlPrefix + "/updateShop/" + shopId, details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            var matches = _this.shops.filter(function (shop) {
                                return (responseData.payload.updatedShop.id === shop.id);
                            });
                            if (matches.length) {
                                angular.copy(responseData.payload.updatedShop, _this.shops[_this.shops.indexOf(matches[0])]);
                            }
                        });
                        _this.ToastService.showSimple("Shop record updated");
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
            this.removeShop = function (shopId) {
                return _this.$http.get(_this.urlPrefix + "/deleteShop/" + shopId)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            var matches = _this.shops.filter(function (shop) {
                                return (shop.id === shopId);
                            });
                            if (matches.length) {
                                _this.shops.splice(_this.shops.indexOf(matches[0]), 1);
                            }
                        });
                        _this.ToastService.showSimple("Shop record deleted");
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
                getShops: false
            };
            this.promises = {
                getShops: this.$q.resolve(false)
            };
            this.shops = [];
            this.getShops();
        }
        return Service;
    }());
    GrocRoundAdminShopsService.Service = Service;
})(GrocRoundAdminShopsService || (GrocRoundAdminShopsService = {}));
/*******************************************************************/ 
