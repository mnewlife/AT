module GrocRoundAdminToolBarWidget {

  import interfaces = GrocRoundAdminToolBarWidgetInterfaces;
  import profileService = GrocRoundAdminProfileServiceInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public progress: profileService.Instance[ "progress" ];

    /***************************************************/

    constructor(
      private readonly $mdSidenav: ng.material.ISidenavService,
      private readonly ProfileService: profileService.Instance
    ) {

      this.progress = this.ProfileService.progress;

    }

    /***************************************************/

    public signOut = () => {

      this.ProfileService.signOut();

    }

    /***************************************************/

    public toggleSideNav () {
      this.$mdSidenav( "left" ).toggle();
    }

    /***************************************************/
  }

}