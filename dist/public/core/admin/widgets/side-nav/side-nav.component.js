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
                href: "/grocRound/admin",
                icon: "local_grocery_store",
                caption: "Grocery Rounds"
            });
            this.apps.push({
                href: "/call263/admin",
                icon: "call",
                caption: "Call263"
            });
            this.apps.push({
                href: "/powertel/admin",
                icon: "web",
                caption: "Powertel"
            });
            this.apps.push({
                href: "/routers/admin",
                icon: "routers",
                caption: "Routers"
            });
        }
        return Widget;
    }());
    CoreAdminSideNavWidget.Widget = Widget;
})(CoreAdminSideNavWidget || (CoreAdminSideNavWidget = {}));
/*******************************************************************/ 
