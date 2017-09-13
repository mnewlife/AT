( function () {

  "use strict";

  angular.module( "service.signIn", [
    "ngResource",
    "toast"
  ] );

  angular.module( "service.signIn" ).factory( "SignIn", dataService );

  dataService.$inject = [ "$http", "$q", "$timeout", "Toast" ];

  function dataService ( $http, $q, $timeout, Toast ) {
    var service = {
      authenticate: authenticate
    };
    return service;

    function authenticate ( details ) {

      var body = {
        emailAddress: details.emailAddress,
        password: details.password
      };

      return $http.post( "/signIn", body ).then(
        function success ( response ) {
          if ( response.data.success ) {
            Toast.showSimple( "Welcome" );
            return {
              success: true,
              message: "Welcome"
            };
          } else {
            console.log( response );
            var message = ( response.data.message ) ? response.data.message : "Couldn't sign you in";
            Toast.showSimple( message );
            return {
              success: false,
              message: message
            };
          }
        },
        function error ( response ) {
          var message = "Something went wrong";
          Toast.showSimple( message );
          return {
            success: false,
            message: message
          };
        }
      );

    }

  }

} )();
