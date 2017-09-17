var SignInComponent;
(function (SignInComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $routeParams, ToastService, UserService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$routeParams = $routeParams;
            this.ToastService = ToastService;
            this.UserService = UserService;
            this.ContextsService = ContextsService;
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
                    if (_this.ContextsService.appContext) {
                        window.location.href = "/" + _this.ContextsService.appContext;
                    }
                    else {
                        window.location.href = "/";
                    }
                })
                    .catch(function (reason) {
                    _this.authenticating = false;
                    if (reason.message) {
                        _this.ToastService.showSimple(reason.message);
                    }
                });
            };
            this.authenticating = false;
            this.emailAddress = "";
            this.password = "";
        }
        return Component;
    }());
    SignInComponent.Component = Component;
})(SignInComponent || (SignInComponent = {}));
/*******************************************************************/ 
