var GrocRoundAdminPricesService;
(function (GrocRoundAdminPricesService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, $timeout, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.$timeout = $timeout;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            this.urlPrefix = "/grocRound/admin/prices";
            /***************************************************/
            this.getPrices = function (filtrationCriteria) {
                _this.progress.getPrices = true;
                var criteria = [];
                if (filtrationCriteria) {
                    if (filtrationCriteria.productId) {
                        criteria.push("productId=" + filtrationCriteria.productId);
                    }
                }
                var url = _this.urlPrefix + "/getPrices";
                if (criteria.length) {
                    url += "?" + criteria.join("&");
                }
                return _this.$http.get(url)
                    .then(function (response) {
                    _this.progress.getPrices = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        return _this.$q.resolve(responseData.payload.foundPrices);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get prices";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getPrices = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
            /***************************************************/
            this.getPrice = function (priceId) {
                return _this.$http.get(_this.urlPrefix + "/getPrice/" + priceId)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        return _this.$q.resolve(responseData.payload.foundPrice);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get price record";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getPrices = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
            /***************************************************/
            this.addPrice = function (details) {
                return _this.$http.post(_this.urlPrefix + "/addPrice", details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.ToastService.showSimple("Price Added");
                        return _this.$q.resolve(responseData.payload.addedPrice);
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
            this.updatePrice = function (priceId, details) {
                return _this.$http.post(_this.urlPrefix + "/updatePrice/" + priceId, details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.ToastService.showSimple("Price updated");
                        return _this.$q.resolve(responseData.payload.updatedPrice);
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
            this.removePrice = function (priceId) {
                return _this.$http.get(_this.urlPrefix + "/deletePrice/" + priceId)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.ToastService.showSimple("Price deleted");
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
                getPrices: false
            };
        }
        return Service;
    }());
    GrocRoundAdminPricesService.Service = Service;
})(GrocRoundAdminPricesService || (GrocRoundAdminPricesService = {}));
/*******************************************************************/ 
