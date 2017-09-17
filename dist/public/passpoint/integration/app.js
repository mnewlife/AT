var App;
(function (App) {
    var components = ComponentsIntegration;
    var services = ServicesIntegration;
    angular.module("Passpoint", [
        "ngMaterial",
        "ngAnimate",
        "ngRoute",
        "ngMessages",
        "signInComponent",
        "signUpComponent"
    ]);
    angular.module("Passpoint").config(config);
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
        $routeProvider.
            when("/sign-in", {
            template: "<sign-in-component></sign-in-component>"
        })
            .when("/sign-up", {
            template: "<sign-up-component></sign-up-component>"
        })
            .otherwise({
            template: "<sign-in-component></sign-in-component>"
        });
    }
    angular.module("Passpoint").controller("MainController", function () { });
    components.integrate();
    services.integrate();
})(App || (App = {}));
