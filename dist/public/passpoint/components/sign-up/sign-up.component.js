var SignUpComponent;
(function (SignUpComponent) {
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
                if (_this.ContextsService.innerContext === "sign-up") {
                    if (_this.ContextsService.decoded.success) {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Sign up done. A verification email has been sent to your email address";
                        return _this.DialogService.showAlert("", message);
                    }
                    else {
                        var message = (_this.ContextsService.decoded.message) ? _this.ContextsService.decoded.message : "Something went wrong";
                        return _this.DialogService.showAlert("Sign Up", message);
                    }
                }
            };
            /***************************************************/
            this.signUp = function () {
                if (!_this.emailAddress) {
                    return _this.ToastService.showSimple("Provide an email address");
                }
                if (!_this.password) {
                    return _this.ToastService.showSimple("Enter your password");
                }
                if (!_this.confirm) {
                    return _this.ToastService.showSimple("Re-enter your password");
                }
                if (_this.password !== _this.confirm) {
                    return _this.ToastService.showSimple("Passwords don't match");
                }
                _this.registering = true;
                return _this.UserService.signUp(_this.emailAddress, _this.password)
                    .then(function (response) {
                    _this.registering = false;
                    if (_this.ContextsService.appContext) {
                        window.location.href = "/" + _this.ContextsService.appContext;
                    }
                    else {
                        window.location.href = "/";
                    }
                })
                    .catch(function (reason) {
                    _this.registering = false;
                    if (reason.message) {
                        _this.ToastService.showSimple(reason.message);
                    }
                });
            };
            this.registering = false;
            this.emailAddress = "";
            this.password = "";
            this.confirm = "";
            this.checkInnerContext();
            if (!this.ContextsService.checked) {
                this.ContextsService.checked = true;
            }
        }
        return Component;
    }());
    SignUpComponent.Component = Component;
})(SignUpComponent || (SignUpComponent = {}));
/*******************************************************************/ 
