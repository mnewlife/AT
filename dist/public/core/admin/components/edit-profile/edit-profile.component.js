var CoreAdminEditProfileComponent;
(function (CoreAdminEditProfileComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, $location, $mdDialog, ToastService, CountriesService, ProfileService, ChangeEmailAddressService, ChangePasswordService) {
            var _this = this;
            this.$q = $q;
            this.$location = $location;
            this.$mdDialog = $mdDialog;
            this.ToastService = ToastService;
            this.CountriesService = CountriesService;
            this.ProfileService = ProfileService;
            this.ChangeEmailAddressService = ChangeEmailAddressService;
            this.ChangePasswordService = ChangePasswordService;
            /***************************************************/
            this.initDates = function () {
                var now = new Date;
                _this.minDate = new Date(1927, now.getMonth(), now.getDate());
                _this.maxDate = new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
            };
            /***************************************************/
            this.initDetails = function () {
                angular.copy(_this.ProfileService.user.personalDetails, _this.details.personalDetails);
                _this.details.contactDetails.phoneNumbers = [];
                _this.ProfileService.user.contactDetails.phoneNumbers.forEach(function (number) {
                    _this.details.contactDetails.phoneNumbers.push(number);
                });
                angular.copy(_this.ProfileService.user.residentialDetails, _this.details.residentialDetails);
            };
            /***************************************************/
            this.openChangeEmailAddress = function (ev) {
                var config = {
                    controller: function ($mdDialog) { return _this.ChangeEmailAddressService; },
                    controllerAs: "this",
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
                })
                    .catch(function (reason) {
                    return _this.ToastService.showSimple((reason.message) ? reason.message : "Something went wrong");
                });
            };
            /***************************************************/
            this.openChangePassword = function (ev) {
                var config = {
                    controller: function ($mdDialog) { return _this.ChangePasswordService; },
                    controllerAs: "this",
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
                })
                    .catch(function (reason) {
                    return _this.ToastService.showSimple((reason.message) ? reason.message : "Something went wrong");
                });
            };
            /***************************************************/
            this.saveChanges = function () {
                if (!_this.details.personalDetails.firstName) {
                    return _this.ToastService.showSimple("First name is missing");
                }
                if (!_this.details.personalDetails.lastName) {
                    return _this.ToastService.showSimple("Last name is missing");
                }
                if (!_this.details.personalDetails.dateOfBirth) {
                    return _this.ToastService.showSimple("Date of birth is missing");
                }
                if (!_this.details.personalDetails.gender) {
                    return _this.ToastService.showSimple("Gender is missing");
                }
                if (!_this.details.contactDetails.phoneNumbers || !_this.details.contactDetails.phoneNumbers.length) {
                    return _this.ToastService.showSimple("Phone numbers are missing");
                }
                if (!_this.details.residentialDetails.country) {
                    return _this.ToastService.showSimple("Country is missing");
                }
                if (!_this.details.residentialDetails.province) {
                    return _this.ToastService.showSimple("Province is missing");
                }
                if (!_this.details.residentialDetails.address) {
                    return _this.ToastService.showSimple("Address is missing");
                }
                return _this.ProfileService.updateDetails(_this.details)
                    .then(function (response) {
                    _this.$location.path("/profile");
                })
                    .catch(function (reason) {
                    if (reason.message) {
                        _this.ToastService.showSimple(reason.message);
                    }
                });
            };
            this.countries = this.CountriesService.list;
            this.initDetails();
            this.initDates();
        }
        return Component;
    }());
    CoreAdminEditProfileComponent.Component = Component;
})(CoreAdminEditProfileComponent || (CoreAdminEditProfileComponent = {}));
/*******************************************************************/ 
