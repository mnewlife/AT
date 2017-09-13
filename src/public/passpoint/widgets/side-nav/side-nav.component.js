( function () {

  "use strict";

  angular.module( "sideNav", [
  ] );

  angular.module( "sideNav" ).component( "sideNav", {
    templateUrl: "widgets/side-nav/side-nav.template.html",
    controller: controller
  } );

  controller.$inject = [
    "$timeout"
  ];

  function controller ( $timeout ) {

    /* jshint validthis: true */
    var vm = this;

    vm.items = [];

    activate();

    function activate () {
      pushNavItems();
    }

    function pushNavItems () {

      vm.items.push( {
        href: "#/profile",
        icon: "person",
        caption: "My Profile"
      } );

      vm.items.push( {
        href: "#/add-admin",
        icon: "plus",
        caption: "Add Admin"
      } );

    }

  }

} )();
