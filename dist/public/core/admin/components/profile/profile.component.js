var CoreAdminProfileComponent;
(function (CoreAdminProfileComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $mdDialog, ToastService, ProfileService, ChangeEmailAddressService, ChangePasswordService) {
            var _this = this;
            this.$q = $q;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.ProfileService = ProfileService;
            this.ChangeEmailAddressService = ChangeEmailAddressService;
            this.ChangePasswordService = ChangePasswordService;
            /***************************************************/
            this.openChangeEmailAddress = function (ev) {
                var config = {
                    controller: function ($mdDialog) { return _this.ChangeEmailAddressService; },
                    controllerAs: "vm",
                    templateUrl: "/core/admin/services/change-email-address/change-email-address.template.html",
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    openFrom: "#change_email_address",
                    closeTo: "#change_email_address",
                    clickOutsideToClose: false
                };
                return _this.$mdDialog.show(config)
                    .then(function (result) {
                    return _this.ProfileService.changeEmailAddress(result.password, result.newEmailAddress);
                });
            };
            /***************************************************/
            this.openChangePassword = function (ev) {
                var config = {
                    controller: function ($mdDialog) { return _this.ChangePasswordService; },
                    controllerAs: "vm",
                    templateUrl: "/core/admin/services/change-password/change-password.template.html",
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    openFrom: "#change_password",
                    closeTo: "#change_password",
                    clickOutsideToClose: false,
                };
                return _this.$mdDialog.show(config)
                    .then(function (result) {
                    return _this.ProfileService.changePassword(result.oldPassword, result.newPassword);
                });
            };
            this.user = this.ProfileService.user;
            this.progress = this.ProfileService.progress;
        }
        return Component;
    }());
    CoreAdminProfileComponent.Component = Component;
})(CoreAdminProfileComponent || (CoreAdminProfileComponent = {}));
/*******************************************************************/
