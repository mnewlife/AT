var CoreAdminChangeEmailAddressService;
(function (CoreAdminChangeEmailAddressService) {
    var Service = (function () {
        /***************************************************/
        function Service($mdDialog) {
            var _this = this;
            this.$mdDialog = $mdDialog;
            /***************************************************/
            this.change = function () {
                if (!_this.password) {
                    return _this.error = "Enter your password";
                }
                if (!_this.newEmailAddress) {
                    return _this.error = "Enter the new email address";
                }
                return _this.$mdDialog.hide({
                    password: _this.password,
                    newEmailAddress: _this.newEmailAddress
                });
            };
            /***************************************************/
            this.cancel = function () {
                _this.$mdDialog.cancel();
            };
            this.password = "";
            this.newEmailAddress = "";
            this.error = "";
        }
        return Service;
    }());
    CoreAdminChangeEmailAddressService.Service = Service;
})(CoreAdminChangeEmailAddressService || (CoreAdminChangeEmailAddressService = {}));
/*******************************************************************/ 
