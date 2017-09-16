module ComponentsIntegration {

  export let integrate = () => {

    /*******************************************************************/

    angular.module( "signInComponent", [
      "toolBarWidget",
      "toastService",
      "userService",
      "contextsService"
    ] );

    angular.module( "signInComponent" ).component( "signInComponent", {
      templateUrl: "components/sign-in/sign-in.template.html",
      controller: signIn
    } );

    signIn.$inject = [
      "$routeParams",
      "$location",
      "$timeout",
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
      templateUrl: "components/sign-up/sign-up.template.html",
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
      templateUrl: "widgets/side-nav/side-nav.template.html",
      controller: sideNav
    } );

    function sideNav () {
      return new SideNavWidget.Widget();
    }

    /*******************************************************************/

    angular.module( "toolBarWidget", [] );

    angular.module( "toolBarWidget" ).component( "toolBarWidget", {
      templateUrl: "widgets/tool-bar/tool-bar.template.html",
      controller: toolBar
    } );

    toolBar.$inject = [
      "$mdSideNav"
    ];

    function toolBar ( $mdSideNav: ng.material.ISidenavService ) {
      return new ToolBarWidget.Widget( $mdSideNav );
    }

    /*******************************************************************/

  }

}