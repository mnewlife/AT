var CoreAdminSideNavWidget;
(function (CoreAdminSideNavWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget() {
            this.apps = [];
            this.locals = [];
            this.locals.push({
                href: "#/profile",
                icon: "person",
                caption: "My Profile"
            });
            this.locals.push({
                href: "#/edit-profile",
                icon: "mode_edit",
                caption: "Edit Profile"
            });
            this.apps.push({
                href: "/grocRound",
                icon: "local_grocery_store",
                caption: "Grocery Rounds"
            });
            this.apps.push({
                href: "/call263",
                icon: "call",
                caption: "Call263"
            });
            this.apps.push({
                href: "/routers",
                icon: "wifi",
                caption: "Routers"
            });
            this.apps.push({
                href: "/phones",
                icon: "smartphone",
                caption: "Smartphones"
            });
        }
        return Widget;
    }());
    CoreAdminSideNavWidget.Widget = Widget;
})(CoreAdminSideNavWidget || (CoreAdminSideNavWidget = {}));
/*******************************************************************/ 
