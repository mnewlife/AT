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
            this.initMembers = function () {
                var now = new Date;
                _this.minDate = new Date(1927, now.getMonth(), now.getDate());
                _this.maxDate = new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
                _this.errorMessage = "";
                _this.countries = _this.CountriesService.list;
                _this.promises = _this.ProfileService.promises;
                _this.progress = _this.ProfileService.progress;
            };
            /***************************************************/
            this.fetchUser = function () {
                _this.fetchDone(_this.ProfileService.getUser());
            };
            /***************************************************/
            this.connectToPromise = function () {
                _this.fetchDone(_this.promises.getUser);
            };
            /***************************************************/
            this.fetchDone = function (promise) {
                promise
                    .then(function (done) {
                    if (done) {
                        _this.copyDetails();
                    }
                })
                    .catch(function (reason) {
                    _this.errorMessage = (reason && reason.message) ? (reason.message) : "Couldn't get user details";
                })
                    .finally(function () {
                    _this.promises.getUser = _this.$q.resolve(false);
                });
            };
            /***************************************************/
            this.copyDetails = function () {
                _this.details = {
                    personalDetails: {
                        firstName: "",
                        lastName: "",
                        dateOfBirth: undefined,
                        gender: null
                    },
                    contactDetails: {
                        phoneNumbers: []
                    },
                    residentialDetails: {
                        country: "",
                        province: "",
                        address: ""
                    }
                };
                _this.emailAddress = _this.ProfileService.user.emailAddress;
                if (_this.ProfileService.user.personalDetails) {
                    var personalDetails = _this.ProfileService.user.personalDetails;
                    if (personalDetails.firstName) {
                        _this.details.personalDetails.firstName = personalDetails.firstName;
                    }
                    if (personalDetails.lastName) {
                        _this.details.personalDetails.lastName = personalDetails.lastName;
                    }
                    if (personalDetails.dateOfBirth) {
                        _this.details.personalDetails.dateOfBirth = personalDetails.dateOfBirth;
                    }
                    if (personalDetails.gender) {
                        _this.details.personalDetails.gender = personalDetails.gender;
                    }
                }
                if (_this.ProfileService.user.contactDetails) {
                    var contactDetails = _this.ProfileService.user.contactDetails;
                    if (contactDetails.phoneNumbers && contactDetails.phoneNumbers.length) {
                        _this.details.contactDetails.phoneNumbers = [];
                        contactDetails.phoneNumbers.forEach(function (number) {
                            _this.details.contactDetails.phoneNumbers.push(number);
                        });
                    }
                }
                if (_this.ProfileService.user.residentialDetails) {
                    var residentialDetails = _this.ProfileService.user.residentialDetails;
                    if (residentialDetails.country) {
                        _this.details.residentialDetails.country = residentialDetails.country;
                    }
                    if (residentialDetails.province) {
                        _this.details.residentialDetails.province = residentialDetails.province;
                    }
                    if (residentialDetails.address) {
                        _this.details.residentialDetails.address = residentialDetails.address;
                    }
                }
            };
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
                });
            };
            this.initMembers();
            if (this.ProfileService.user) {
                this.copyDetails();
            }
            else {
                if (this.ProfileService.progress.getUser) {
                    this.connectToPromise();
                }
                else {
                    this.fetchUser();
                }
            }
        }
        return Component;
    }());
    CoreAdminEditProfileComponent.Component = Component;
})(CoreAdminEditProfileComponent || (CoreAdminEditProfileComponent = {}));
/*******************************************************************/ 
