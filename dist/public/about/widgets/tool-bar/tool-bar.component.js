var AboutToolBarWidget;
(function (AboutToolBarWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget($mdSidenav, ContextsService) {
            var _this = this;
            this.$mdSidenav = $mdSidenav;
            this.ContextsService = ContextsService;
            /***************************************************/
            this.signOut = function () {
                _this.ContextsService.signOut();
            };
        }
        Widget.prototype.toggleSideNav = function () {
            this.$mdSidenav("left").toggle();
        };
        return Widget;
    }());
    AboutToolBarWidget.Widget = Widget;
})(AboutToolBarWidget || (AboutToolBarWidget = {}));
