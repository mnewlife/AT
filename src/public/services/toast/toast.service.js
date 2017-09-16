var ToastService;
( function ( ToastService ) {
  function factory ( $q, $mdToast ) {
    return new Service( $q, $mdToast );
  }
  var Service = /** @class */ ( function () {
    /***************************************************/
    function Service ( $q, $mdToast ) {
      var _this = this;
      this.$q = $q;
      this.$mdToast = $mdToast;
      /***************************************************/
      this.showSimple = function ( message ) {
        return _this.$q( function ( resolve, reject ) {
          var simpleToast = _this.$mdToast.simple()
            .textContent(( message ) ? message : "" )
            .hideDelay( 3000 );
          _this.$mdToast.show( simpleToast )
            .then( function ( response ) {
              resolve();
            } );
        } );
      };
      /***************************************************/
      this.showWithAction = function ( message, action ) {
        return _this.$q( function ( resolve, reject ) {
          var toast = _this.$mdToast.simple()
            .textContent( message )
            .action( action )
            .highlightAction( false );
          _this.$mdToast.show( toast )
            .then( function ( response ) {
              if ( response == "ok" ) {
                return resolve( true );
              }
              else {
                return resolve( false );
              }
            } );
        } );
      };
    }
    return Service;
  }() );
} )( ToastService || ( ToastService = {} ) );
/*******************************************************************/
