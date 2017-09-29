var SignInComponent;
(function (SignInComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $routeParams, ToastService, DialogService, UserService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$routeParams = $routeParams;
            this.ToastService = ToastService;
            this.DialogService = DialogService;
            this.UserService = UserService;
            this.ContextsService = ContextsService;
            /***************************************************/
            this.checkInnerContext = function () {
                if (!_this.ContextsService.innerContext) {
                    return;
                }
                if (_this.ContextsService.innerContext === "change-email-address") {
                    if (_this.ContextsService.decoded.success) {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Email address changed successfully. Sign in with your address";
                        return _this.DialogService.showAlert("Email Address Changed", message);
                    }
                }
                if (_this.ContextsService.innerContext === "request-reset-code") {
                    if (_this.ContextsService.decoded.success) {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "An email with the reset code has been sent to your email address";
                        return _this.DialogService.showAlert("Reset Password", message);
                    }
                    else {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Something went wrong";
                        return _this.DialogService.showAlert("Reset Password", message);
                    }
                }
                if (_this.ContextsService.innerContext === "reset-password") {
                    if (_this.ContextsService.decoded.success) {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Your password has been reset. ";
                        if (_this.ContextsService.decoded.payload && _this.ContextsService.decoded.payload.newRandomPassword) {
                            message += "Use this password: " + _this.ContextsService.decoded.payload.newRandomPassword;
                        }
                        else {
                            message += "<b>( Something went wrong, contact support )</b>";
                        }
                        return _this.DialogService.showAlert("Reset Password", message);
                    }
                    else {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Something went wrong";
                        return _this.DialogService.showAlert("Reset Password", message);
                    }
                }
                if (_this.ContextsService.innerContext === "delete-account") {
                    return _this.DialogService.showAlert("Delete Account", "Account deleted", null, "Ok");
                }
                if (_this.ContextsService.innerContext === "verify-account") {
                    if (_this.ContextsService.decoded.success) {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Your account has been verified. Sign in with your email address";
                        return _this.DialogService.showAlert("Account Verification", message);
                    }
                    else {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Something went wrong";
                        return _this.DialogService.showAlert("Account Verification", message);
                    }
                }
            };
            /***************************************************/
            this.forgot = function () {
                return _this.DialogService.showPrompt("Forgot Password", "Enter your email address and we'll send you a recovery link.", null, "Enter your email address", "Yes, Send", "No")
                    .then(function (emailAddress) {
                    if (!emailAddress) {
                        return _this.$q.reject();
                    }
                    return _this.UserService.requestResetCode(emailAddress);
                });
            };
            /***************************************************/
            this.signIn = function () {
                if (!_this.emailAddress) {
                    return _this.ToastService.showSimple("Provide an email address");
                }
                if (!_this.password) {
                    return _this.ToastService.showSimple("Enter your password");
                }
                _this.authenticating = true;
                return _this.UserService.signIn(_this.emailAddress, _this.password)
                    .then(function (response) {
                    _this.authenticating = false;
                })
                    .catch(function (reason) {
                    _this.authenticating = false;
                });
            };
            this.authenticating = false;
            this.emailAddress = "";
            this.password = "";
            this.checkInnerContext();
            if (!this.ContextsService.checked) {
                this.ContextsService.checked = true;
            }
        }
        return Component;
    }());
    SignInComponent.Component = Component;
})(SignInComponent || (SignInComponent = {}));
/*******************************************************************/
