( function () {

  "use strict";

  angular.module( "service.signUp", [
    "ngResource",
    "toast"
  ] );

  angular.module( "service.signUp" ).factory( "SignUp", dataService );

  dataService.$inject = [
    "$http",
    "$q",
    "$timeout",
    "Toast"
  ];

  function dataService ( $http, $q, $timeout, Toast ) {
    var service = {
      signUp: signUp
    };
    return service;

    /**************************************************************************/

    function signUp ( details ) {

      var body = {
        emailAddress: details.emailAddress,
        password: details.password
      };

      return $http.post( "/core/consumer/registration/signUp", body ).then(
        function success ( response ) {
          if ( response.data.success ) {
            return {
              success: true,
              message: ""
            };
          } else {
            var message = ( response.data.message ) ? response.data.message : "Couldn't sign you up, please try again";
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

    /**************************************************************************/

  }

} )();
