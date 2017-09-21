var AboutToolBarWidget;
(function (AboutToolBarWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget($mdSidenav) {
            this.$mdSidenav = $mdSidenav;
        }
        /***************************************************/
        Widget.prototype.toggleSideNav = function () {
            this.$mdSidenav("left").toggle();
        };
        return Widget;
    }());
    AboutToolBarWidget.Widget = Widget;
})(AboutToolBarWidget || (AboutToolBarWidget = {}));
