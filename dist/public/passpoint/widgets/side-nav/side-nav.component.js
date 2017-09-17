var SideNavWidget;
(function (SideNavWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget() {
            this.items = [];
            this.items.push({
                href: "#/sign-in",
                icon: "input",
                caption: "Sign In"
            });
            this.items.push({
                href: "#/sign-up",
                icon: "mode_edit",
                caption: "Sign Up"
            });
        }
        return Widget;
    }());
    SideNavWidget.Widget = Widget;
})(SideNavWidget || (SideNavWidget = {}));
/*******************************************************************/ 
