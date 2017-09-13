( function () {

  "use strict";

  angular.module( "toolBar" , [] );

  angular.module( "toolBar" ).component( "toolBar" , {
    templateUrl : "widgets/tool-bar/tool-bar.template.html" ,
    controller : controller ,
    bindings : {
      title : "@"
    }
  } );

  controller.$inject = [
    "$mdSidenav" ,
    "$mdDialog"
  ];

  function controller ( $mdSidenav , $mdDialog ) {

    /* jshint validthis: true */
    var vm = this;

    function openMenu ( $mdOpenMenu , event ) {
      $mdOpenMenu( event );
    }

  }

} )();
