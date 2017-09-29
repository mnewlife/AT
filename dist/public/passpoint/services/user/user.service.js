var UserService;
(function (UserService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            /***************************************************/
            this.requestResetCode = function (emailAddress) {
                return _this.$http.get("/core/profile/requestPasswordResetCode/" + emailAddress)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.ToastService.showSimple("Done. An email has been sent to your email address");
                        return _this.$q.resolve();
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Something went wrong";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    var message = (reason && reason.message) ? reason.message : "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
            /***************************************************/
            this.signUp = function (emailAddress, password) {
                var details = {
                    emailAddress: emailAddress,
                    password: password
                };
                return _this.$http.post("/core/consumer/registration/signUp", details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        return _this.$q.resolve();
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't sign you up";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    var message = (reason && reason.message) ? reason.message : "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
            /***************************************************/
            this.signIn = function (emailAddress, password) {
                var details = {
                    emailAddress: emailAddress,
                    password: password
                };
                return _this.$http.post("/core/auth/signIn", details)
                    .then(function (response) {
                    var responseData = response.data;
                    if (responseData.success) {
                        if (_this.ContextsService.appContext) {
                            var url = "/" + _this.ContextsService.appContext.split("-").join("/");
                            if (_this.ContextsService.nextInnerContext) {
                                url += "?innerContext=" + _this.ContextsService.nextInnerContext;
                            }
                            window.location.href = url;
                        }
                        else {
                            window.location.href = "/";
                        }
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    var message = (reason && reason.message) ? reason.message : "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
            };
        }
        return Service;
    }());
    UserService.Service = Service;
})(UserService || (UserService = {}));
/*******************************************************************/ 
