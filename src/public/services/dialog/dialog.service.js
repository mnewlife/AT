( function () {

  "use strict";

  angular.module( "dialog", [] );

  angular.module( "dialog" ).factory( "Dialog", DialogService );

  DialogService.$inject = [ "$mdDialog" ];

  function DialogService ( $mdDialog ) {

    var service = {
      showAlert: showAlert,
      showConfirm: showConfirm
    };

    return service;

    function showAlert ( settings ) {

      var alert = $mdDialog.alert();
      alert.parent( angular.element( document.body ) );
      alert.clickOutsideToClose( true );
      alert.ariaLabel( "Alert Dialog" );

      if ( settings.title ) {
        alert.title( settings.title );
      }
      if ( settings.content ) {
        alert.textContent( settings.content );
      }
      if ( settings.ev ) {
        alert.targetEvent( settings.ev );
      }

      var okText = ( settings.okText ) ? settings.okText : "Got It";
      alert.ok( okText );

      $mdDialog.show( alert );

    }

    function showConfirm ( settings ) {

      var confirm = this.$mdDialog.confirm();
      confirm.ariaLabel( "Confirm Dialog" );

      if ( settings.title ) {
        confirm.title( settings.title );
      }
      if ( settings.content ) {
        confirm.textContent( settings.content );
      }
      if ( settings.ev ) {
        confirm.targetEvent( settings.ev );
      }

      var okText = ( settings.okText ) ? settings.okText : "Yes";
      confirm.ok( okText );

      var cancelText = ( settings.cancetText ) ? settings.cancelText : "No";
      confirm.cancel( cancelText );

      return $mdDialog.show( confirm ).then(
        function () {
          return true;
        },
        function () {
          return false;
        }
      );

    }

  }

} )();
