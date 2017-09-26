var AboutSideNavWidget;
(function (AboutSideNavWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget(ContextsService) {
            this.ContextsService = ContextsService;
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
            var href = "/grocRound";
            if (this.ContextsService.currentUser) {
                href += "/" + this.ContextsService.currentUser.accessLevel;
            }
            else {
                href = "";
            }
            this.services.push({
                href: href,
                icon: "local_grocery_store",
                caption: "Grocery Rounds"
            });
            href = "/call263";
            if (this.ContextsService.currentUser) {
                href += "/" + this.ContextsService.currentUser.accessLevel;
            }
            else {
                href = "";
            }
            this.services.push({
                href: href,
                icon: "call",
                caption: "Call263"
            });
        }
        return Widget;
    }());
    AboutSideNavWidget.Widget = Widget;
})(AboutSideNavWidget || (AboutSideNavWidget = {}));
/*******************************************************************/ 
