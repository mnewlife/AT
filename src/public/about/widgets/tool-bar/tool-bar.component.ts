module AboutToolBarWidget {

  import interfaces = AboutToolBarWidgetInterfaces;
  import contextService = AboutContextsServiceInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    constructor(
      private readonly $mdSidenav: ng.material.ISidenavService,
      private readonly ContextsService: contextService.Instance
    ) { }

    /***************************************************/

    public signOut = () => {

      this.ContextsService.signOut();

    }

    public toggleSideNav () {
      this.$mdSidenav( "left" ).toggle();
    }

    /***************************************************/
  }

}