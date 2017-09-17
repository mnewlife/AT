var ToolBarWidget;
(function (ToolBarWidget) {
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
    ToolBarWidget.Widget = Widget;
})(ToolBarWidget || (ToolBarWidget = {}));
