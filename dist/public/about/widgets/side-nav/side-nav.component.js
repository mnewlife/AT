var AboutSideNavWidget;
(function (AboutSideNavWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget() {
            this.items = [];
            this.services = [];
            this.items.push({
                href: "/passpoint/#/sign-in",
                icon: "input",
                caption: "Sign In"
            });
            this.items.push({
                href: "/passpoint/#/sign-up",
                icon: "mode_edit",
                caption: "Sign Up"
            });
            this.services.push({
                href: "/grocRound",
                icon: "local_grocery_store",
                caption: "Grocery Rounds"
            });
            this.services.push({
                href: "/call263",
                icon: "call",
                caption: "Call263"
            });
        }
        return Widget;
    }());
    AboutSideNavWidget.Widget = Widget;
})(AboutSideNavWidget || (AboutSideNavWidget = {}));
/*******************************************************************/ 
