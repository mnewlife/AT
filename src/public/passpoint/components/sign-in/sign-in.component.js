( function () {

  "use strict";

  angular.module( "signIn", [
    "toolBar",
    "toast",
    "service.signIn",
    "service.contexts"
  ] );

  angular.module( "signIn" ).component( "signIn", {
    templateUrl: "components/sign-in/sign-in.template.html",
    controller: controller
  } );

  controller.$inject = [
    "$routeParams",
    "$location",
    "$timeout",
    "Toast",
    "SignIn",
    "Contexts"
  ];

  function controller ( $routeParams, $location, $timeout, Toast, SignIn, Contexts ) {

    /* jshint validthis: true */
    var vm = this;

    vm.details = {
      emailAddress: "",
      password: ""
    };
    vm.authenticating = false;

    vm.authenticate = authenticate;

    activate();

    function activate () {
      if ( Contexts.appContext ) {
        vm.details.appContext = Contexts.appContext;
      }
    }

    function authenticate () {

      if ( !vm.details.emailAddress ) {
        return Toast.showSimple( "Enter email address" );
      }
      if ( !vm.details.password ) {
        return Toast.showSimple( "Enter password" );
      }

      vm.authenticating = true;
      SignIn.authenticate( vm.details ).then(
        function ( result ) {
          if ( result.success ) {
            if ( Contexts.appContext ) {
              window.location.href = "/" + Contexts.appContext;
            } else {
              window.location.href = "/";
            }
          } else {
            vm.authenticating = false;
            var message = ( result.message ) ? result.message : "Sign in failed";
            Toast.showSimple( message );
          }
        }
      );

    }

  }

} )();
