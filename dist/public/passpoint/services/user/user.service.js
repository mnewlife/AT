var UserService;
(function (UserService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, ToastService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.ToastService = ToastService;
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
                    var message = "Something went wrong";
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
                        return _this.$q.resolve();
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't sign you in";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    var message = "Something went wrong";
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
