module AboutComponentsIntegration {

  export let integrate = () => {

    /*******************************************************************/

    angular.module( "homeComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "contextsService",
      "descLimit"
    ] );

    angular.module( "homeComponent" ).component( "homeComponent", {
      templateUrl: "/about/components/home/home.template.html",
      controller: home
    } );

    home.$inject = [
      "$q",
      "ToastService",
      "ContextsService"
    ];

    function home (
      $q: ng.IQService,
      ToastService: ToastServiceInterfaces.Instance,
      ContextsService: AboutContextsServiceInterfaces.Instance
    ) {
      return new AboutHomeComponent.Component( $q, ToastService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "sideNavWidget", [
      "contextsService"
    ] );

    angular.module( "sideNavWidget" ).component( "sideNavWidget", {
      templateUrl: "/about/widgets/side-nav/side-nav.template.html",
      controller: sideNav
    } );

    sideNav.$inject = [
      "ContextsService"
    ];

    function sideNav ( ContextsService: AboutContextsServiceInterfaces.Instance ) {
      return new AboutSideNavWidget.Widget( ContextsService );
    }

    /*******************************************************************/

    angular.module( "toolBarWidget", [
      "contextsService"
    ] );

    angular.module( "toolBarWidget" ).component( "toolBarWidget", {
      templateUrl: "/about/widgets/tool-bar/tool-bar.template.html",
      controller: toolBar,
      bindings: {
        title: "@"
      }
    } );

    toolBar.$inject = [
      "$mdSidenav",
      "ContextsService"
    ];

    function toolBar ( $mdSidenav: ng.material.ISidenavService, ContextsService: AboutContextsServiceInterfaces.Instance ) {
      return new AboutToolBarWidget.Widget( $mdSidenav, ContextsService );
    }

    /*******************************************************************/

  }

}