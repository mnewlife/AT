var SideNavWidget;
(function (SideNavWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget() {
            this.items.push({
                href: "#/profile",
                icon: "person",
                caption: "My Profile"
            });
            this.items.push({
                href: "#/add-admin",
                icon: "plus",
                caption: "Add Admin"
            });
        }
        return Widget;
    }());
    SideNavWidget.Widget = Widget;
})(SideNavWidget || (SideNavWidget = {}));
/*******************************************************************/ 
