var CoreAdminChangePasswordService;
(function (CoreAdminChangePasswordService) {
    var Service = (function () {
        /***************************************************/
        function Service($mdDialog) {
            var _this = this;
            this.$mdDialog = $mdDialog;
            /***************************************************/
            this.change = function () {
                if (!_this.oldPassword) {
                    return _this.error = "Enter your password";
                }
                if (!_this.newPassword) {
                    return _this.error = "Enter the new email address";
                }
                if (!_this.confirm) {
                    return _this.error = "Re-enter your password to confirm";
                }
                if (_this.newPassword !== _this.confirm) {
                    return _this.error = "Passwords don't match";
                }
                return _this.$mdDialog.hide({
                    password: _this.oldPassword,
                    newPassword: _this.newPassword
                });
            };
            /***************************************************/
            this.cancel = function () {
                _this.$mdDialog.cancel();
            };
            this.oldPassword = "";
            this.newPassword = "";
            this.confirm = "";
            this.error = "";
        }
        return Service;
    }());
    CoreAdminChangePasswordService.Service = Service;
})(CoreAdminChangePasswordService || (CoreAdminChangePasswordService = {}));
/*******************************************************************/ 
