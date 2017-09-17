var ComponentsIntegration;
( function ( ComponentsIntegration ) {
  ComponentsIntegration.integrate = function () {
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
    function signIn ( $q, $routeParams, ToastService, UserService, ContextsService ) {
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
    function signUp ( $q, $routeParams, ToastService, UserService, ContextsService ) {
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
    function toolBar ( $mdSideNav ) {
      return new ToolBarWidget.Widget( $mdSideNav );
    }
    /*******************************************************************/
  };
} )( ComponentsIntegration || ( ComponentsIntegration = {} ) );
