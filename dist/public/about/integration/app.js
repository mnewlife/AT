var App;
(function (App) {
    var components = AboutComponentsIntegration;
    var services = AboutServicesIntegration;
    angular.module("About", [
        "ngMaterial",
        "ngAnimate",
        "ngRoute",
        "ngMessages",
        "homeComponent"
    ]);
    angular.module("About").config(config);
    config.$inject = [
        "$locationProvider",
        "$routeProvider",
        "$mdThemingProvider"
    ];
    function config($locationProvider, $routeProvider, $mdThemingProvider) {
        $mdThemingProvider.theme("default")
            .primaryPalette("indigo", {
            'default': '400',
            'hue-1': '700',
            'hue-2': '800'
        })
            .accentPalette("deep-orange", {
            'default': '500',
            'hue-1': 'A700',
            'hue-2': '900'
        })
            .warnPalette("red");
        //.dark();
        $routeProvider.
            when("/home", {
            template: "<home-component></home-component>"
        })
            .otherwise({
            template: "<home-component></home-component>"
        });
    }
    angular.module("About").controller("MainController", function () { });
    services.integrate();
    components.integrate();
})(App || (App = {}));
