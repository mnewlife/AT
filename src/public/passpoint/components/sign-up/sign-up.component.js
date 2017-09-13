( function () {

  "use strict";

  angular.module( "signUp", [
    "toolBar",
    "dialog",
    "service.signUp",
    "service.contexts"
  ] );

  angular.module( "signUp" ).component( "signUp", {
    templateUrl: "components/sign-up/sign-up.template.html",
    controller: controller
  } );

  controller.$inject = [
    "$routeParams",
    "$location",
    "Dialog",
    "SignUp",
    "Contexts"
  ];

  function controller ( $routeParams, $location, Dialog, SignUp, Contexts ) {

    /* jshint validthis: true */
    var vm = this;

    vm.tiles = [
      {
        service: "Grocery Rounds",
        src: "resources/drawable/groceryRound.png",
        alt: "Athena Resources",
        span: { row: 1, col: 1 }
      },
      {
        service: "Call 263",
        src: "resources/drawable/call263.jpg",
        alt: "Affordable calling rates internationally",
        span: { row: 1, col: 1 }
      },
      {
        service: "Wifi Routers",
        src: "resources/drawable/router.png",
        alt: "Sentar and Huawei wifi routers",
        span: { row: 1, col: 1 }
      },
      {
        service: "CDMA Smartphones",
        src: "resources/drawable/smartphone.png",
        alt: "Cheap CDMA smartphones",
        span: { row: 1, col: 1 }
      }
    ];

    vm.details = {
      emailAddress: "",
      password: "",
      confirm: ""
    };
    vm.signingUp = false;

    vm.signUp = signUp;

    function signUp () {

      if ( !vm.details.emailAddress ) {
        return Toast.showSimple( "Enter email address" );
      }
      if ( !vm.details.password ) {
        return Toast.showSimple( "Enter password" );
      }
      if ( vm.details.password !== vm.details.confirm ) {
        return Toast.showSimple( "Passwords don't match" );
      }

      vm.signingUp = true;
      SignUp.signUp( vm.details ).then(
        function ( result ) {
          vm.signingUp = false;
          if ( result.success ) {
            Dialog.showAlert( {
              title: "Done",
              content: "We have sent a verification email to your email address: <b>" + 
                vm.details.emailAddress + 
                "</b><br/>Click on the link therein to verify your account.",
              okText: "Got It"
            } );
          }
        }
      );

    }

  }

} )();
