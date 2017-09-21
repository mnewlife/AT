var AboutServicesIntegration;
(function (AboutServicesIntegration) {
    AboutServicesIntegration.integrate = function () {
        /*******************************************************************/
        angular.module("toastService", []);
        angular.module("toastService").factory("ToastService", Toast);
        Toast.$inject = [
            "$q",
            "$mdToast"
        ];
        function Toast($q, $mdToast) {
            return new ToastService.Service($q, $mdToast);
        }
        /*******************************************************************/
        angular.module("descLimit", []);
        angular.module("descLimit").filter("descLimit", DescLimit);
        function DescLimit() {
            return function (description) {
                if (description) {
                    return (description.length < 100) ? description : description.substring(0, 100) + "...";
                }
            };
            //return DescLimitFilter.getFilter();
        }
        /*******************************************************************/
    };
})(AboutServicesIntegration || (AboutServicesIntegration = {}));
