var AboutHomeComponent;
(function (AboutHomeComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, ToastService, ContextsService) {
            var _this = this;
            this.$q = $q;
            this.ToastService = ToastService;
            this.ContextsService = ContextsService;
            /***************************************************/
            this.initServices = function () {
                _this.services = [];
                var href = "/grocRound";
                if (_this.ContextsService.currentUser) {
                    href += "/" + _this.ContextsService.currentUser.accessLevel;
                }
                else {
                    href = "";
                }
                _this.services.push({
                    serviceName: "Grocery Rounds",
                    image: "/about/resources/drawable/groceryRound.png",
                    description: "Description Here",
                    href: href
                });
                href = "/call263";
                if (_this.ContextsService.currentUser) {
                    href += "/" + _this.ContextsService.currentUser.accessLevel;
                }
                else {
                    href = "";
                }
                _this.services.push({
                    serviceName: "Call 263",
                    image: "/about/resources/drawable/call263.jpg",
                    description: "Description Here",
                    href: href
                });
                _this.services.push({
                    serviceName: "More coming soon",
                    image: "/about/resources/drawable/mighty-eagle.jpg",
                    description: "Description Here",
                    href: ""
                });
            };
            /***************************************************/
            this.route = function (destination) {
                if (destination) {
                    window.location.href = destination;
                }
            };
            this.initServices();
        }
        return Component;
    }());
    AboutHomeComponent.Component = Component;
})(AboutHomeComponent || (AboutHomeComponent = {}));
/*******************************************************************/
