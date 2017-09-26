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
        angular.module("contextsService", []);
        angular.module("contextsService").factory("ContextsService", Contexts);
        Contexts.$inject = [
            "$http"
        ];
        function Contexts($http) {
            return new AboutContextsService.Service($http);
        }
        /*******************************************************************/
        angular.module("descLimit", []);
        angular.module("descLimit").filter("descLimit", DescLimitFilter.getFilter());
        /*function DescLimit () {
    
          return function ( description: string ) {
            if ( description ) {
              return ( description.length < 100 ) ? description : description.substring( 0, 100 ) + "...";
            }
          }
    
        }*/
        /*******************************************************************/
    };
})(AboutServicesIntegration || (AboutServicesIntegration = {}));
