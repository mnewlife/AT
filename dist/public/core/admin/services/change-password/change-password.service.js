var CoreAdminChangePasswordService;
(function (CoreAdminChangePasswordService) {
    var Service = (function () {
        /***************************************************/
        function Service($mdDialog) {
            var _this = this;
            this.$mdDialog = $mdDialog;
            /***************************************************/
            this.clear = function () {
                _this.oldPassword = "";
                _this.newPassword = "";
                _this.confirm = "";
                _this.error = "";
            };
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
                _this.$mdDialog.hide({
                    oldPassword: _this.oldPassword,
                    newPassword: _this.newPassword
                });
                return _this.clear();
            };
            /***************************************************/
            this.cancel = function () {
                _this.$mdDialog.cancel();
            };
            this.clear();
        }
        return Service;
    }());
    CoreAdminChangePasswordService.Service = Service;
})(CoreAdminChangePasswordService || (CoreAdminChangePasswordService = {}));
/*******************************************************************/ 
