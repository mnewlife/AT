module ComponentsIntegration {

  export let integrate = () => {

    /*******************************************************************/

    angular.module( "signInComponent", [
      "toolBarWidget",
      "sideNavWidget",
      "toastService",
      "userService",
      "contextsService"
    ] );

    angular.module( "signInComponent" ).component( "signInComponent", {
      templateUrl: "/passpoint/components/sign-in/sign-in.template.html",
      controller: signIn
    } );

    signIn.$inject = [
      "$q",
      "$routeParams",
      "ToastService",
      "UserService",
      "ContextsService"
    ];

    function signIn (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      ToastService: ToastServiceInterfaces.Instance,
      UserService: UserServiceInterfaces.Instance,
      ContextsService: ContextsServiceInterfaces.Instance
    ) {
      return new SignInComponent.Component( $q, $routeParams, ToastService, UserService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "signUpComponent", [
      "toolBarWidget",
      "toastService",
      "userService",
      "contextsService"
    ] );

    angular.module( "signUpComponent" ).component( "signUpComponent", {
      templateUrl: "/passpoint/components/sign-up/sign-up.template.html",
      controller: signUp
    } );

    signUp.$inject = [
      "$routeParams",
      "$location",
      "$timeout",
      "ToastService",
      "UserService",
      "ContextsService"
    ];

    function signUp (
      $q: ng.IQService,
      $routeParams: ng.route.IRouteParamsService,
      ToastService: ToastServiceInterfaces.Instance,
      UserService: UserServiceInterfaces.Instance,
      ContextsService: ContextsServiceInterfaces.Instance
    ) {
      return new SignUpComponent.Component( $q, $routeParams, ToastService, UserService, ContextsService );
    }

    /*******************************************************************/

    angular.module( "sideNavWidget", [] );

    angular.module( "sideNavWidget" ).component( "sideNavWidget", {
      templateUrl: "/passpoint/widgets/side-nav/side-nav.template.html",
      controller: sideNav
    } );

    function sideNav () {
      return new SideNavWidget.Widget();
    }

    /*******************************************************************/

    angular.module( "toolBarWidget", [] );

    angular.module( "toolBarWidget" ).component( "toolBarWidget", {
      templateUrl: "/passpoint/widgets/tool-bar/tool-bar.template.html",
      controller: toolBar,
      bindings: {
        title: "@"
      }
    } );

    toolBar.$inject = [
      "$mdSidenav"
    ];

    function toolBar ( $mdSidenav: ng.material.ISidenavService ) {
      return new ToolBarWidget.Widget( $mdSidenav );
    }

    /*******************************************************************/

  }

}