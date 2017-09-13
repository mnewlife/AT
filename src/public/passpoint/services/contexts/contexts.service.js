( function () {

  "use strict";

  angular.module( "service.contexts", [
    "ngResource"
  ] );

  angular.module( "service.contexts" ).factory( "Contexts", dataService );

  dataService.$inject = [ "$http", "$q", "$timeout" ];

  function dataService ( $http, $q, $timeout ) {
    var service = {
      appContext: null,
      accessLevel: null
    };
    return service;

    activate();

    function activate () {
      var payload = null;
      try {
        payload = JSON.parse( window.payloadString );
      } catch ( ex ) {
        console.log( "Something went wrong, " + ex );
      }
      if ( payload ) {
        if ( payload.appContext ) {
          service.appContext = payload.appContext;
        }
        if ( payload.accessLevel ) {
          service.accessLevel = payload.accessLevel;
        }
      }
    }

  }

} )();
