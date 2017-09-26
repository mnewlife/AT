var CoreAdminProfileService;
(function (CoreAdminProfileService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $http, $timeout, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.$timeout = $timeout;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            this.urlPrefix = "/core/admin/profile";
            /***************************************************/
            this.signOut = function () {
                _this.progress.signOut = true;
                var promise = _this.$http.get("/core/auth/signOut")
                    .then(function (response) {
                    _this.progress.signOut = false;
                    window.location.href = "/passpoint";
                    return _this.$q.resolve(true);
                })
                    .catch(function (reason) {
                    _this.progress.signOut = false;
                    _this.ToastService.showSimple("Something went wrong signing you out");
                });
                angular.copy(promise, _this.promises.signOut);
            };
            /***************************************************/
            this.getUser = function () {
                _this.progress.getUser = true;
                var promise = _this.$http.get(_this.urlPrefix + "/getDetails")
                    .then(function (response) {
                    _this.progress.getUser = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            if (!_this.user) {
                                _this.user = {};
                            }
                            angular.copy(responseData.payload.foundUser, _this.user);
                        });
                        return _this.$q.resolve(true);
                    }
                    else {
                        var message = (responseData.message) ? responseData.message : "Couldn't get your details";
                        _this.ToastService.showSimple(message);
                        return _this.$q.reject({
                            message: message
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.getUser = false;
                    var message = "Something went wrong";
                    _this.ToastService.showSimple(message);
                    return _this.$q.reject({
                        message: message
                    });
                });
                angular.copy(promise, _this.promises.getUser);
                return _this.promises.getUser;
            };
            /***************************************************/
            this.updateDetails = function (details) {
                _this.progress.updateDetails = true;
                return _this.$http.post(_this.urlPrefix + "/updateDetails", details)
                    .then(function (response) {
                    _this.progress.updateDetails = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.$timeout(function () {
                            angular.copy(responseData.payload.updatedUser, _this.user);
                            if (_this.user.personalDetails && _this.user.personalDetails.dateOfBirth) {
                                _this.user.personalDetails.dateOfBirth = new Date(_this.user.personalDetails.dateOfBirth);
                            }
                        });
                        _this.ToastService.showSimple("Profile updated");
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.updateDetails = false;
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
            this.changeEmailAddress = function (password, newEmailAddress) {
                var details = {
                    password: password,
                    newEmailAddress: newEmailAddress
                };
                _this.progress.changeEmailAddress = true;
                return _this.$http.post(_this.urlPrefix + "/changeEmailAddress", details)
                    .then(function (response) {
                    _this.progress.changeEmailAddress = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        window.location.href = "/passpoint";
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.changeEmailAddress = false;
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
            this.changePassword = function (oldPassword, newPassword) {
                var details = {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                };
                _this.progress.changePassword = true;
                return _this.$http.post(_this.urlPrefix + "/changePassword", details)
                    .then(function (response) {
                    _this.progress.changePassword = false;
                    var responseData = response.data;
                    if (responseData.success) {
                        _this.ToastService.showSimple("Password changed");
                        return _this.$q.resolve();
                    }
                    else {
                        return _this.$q.reject({
                            message: (responseData.message) ? responseData.message : ""
                        });
                    }
                })
                    .catch(function (reason) {
                    _this.progress.changePassword = false;
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
                getUser: false,
                updateDetails: false,
                changeEmailAddress: false,
                changePassword: false,
                signOut: false
            };
            this.promises = {
                getUser: this.$q.resolve(false),
                signOut: this.$q.resolve(false)
            };
            if (this.ContextsService.currentUser) {
                this.user = {};
                angular.copy(this.ContextsService.currentUser, this.user);
            }
            else {
                this.getUser();
            }
        }
        return Service;
    }());
    CoreAdminProfileService.Service = Service;
})(CoreAdminProfileService || (CoreAdminProfileService = {}));
/*******************************************************************/ 
