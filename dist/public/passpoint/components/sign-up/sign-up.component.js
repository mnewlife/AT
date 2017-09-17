var SignUpComponent;
(function (SignUpComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $routeParams, ToastService, UserService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.$routeParams = $routeParams;
            this.ToastService = ToastService;
            this.UserService = UserService;
            this.ContextsService = ContextsService;
            this.tiles = [
                {
                    service: "Grocery Rounds",
                    src: "resources/drawable/groceryRound.png",
                    alt: "Athena Resources",
                    span: { row: 1, col: 1 }
                },
                {
                    service: "Call 263",
                    src: "resources/drawable/call263.jpg",
                    alt: "Affordable calling rates internationally",
                    span: { row: 1, col: 1 }
                },
                {
                    service: "Wifi Routers",
                    src: "resources/drawable/router.png",
                    alt: "Sentar and Huawei wifi routers",
                    span: { row: 1, col: 1 }
                },
                {
                    service: "CDMA Smartphones",
                    src: "resources/drawable/smartphone.png",
                    alt: "Cheap CDMA smartphones",
                    span: { row: 1, col: 1 }
                }
            ];
            /***************************************************/
            this.signUp = function () {
                if (!_this.emailAddress) {
                    return _this.ToastService.showSimple("Provide an email address");
                }
                if (!_this.password) {
                    return _this.ToastService.showSimple("Enter your password");
                }
                if (_this.password === _this.confirm) {
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
        }
        return Component;
    }());
    SignUpComponent.Component = Component;
})(SignUpComponent || (SignUpComponent = {}));
/*******************************************************************/ 
