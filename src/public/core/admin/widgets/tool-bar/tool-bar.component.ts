module CoreAdminToolBarWidget {

  import interfaces = CoreAdminToolBarWidgetInterfaces;
  import profileService = CoreAdminProfileServiceInterfaces;

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

      

    }

    /***************************************************/

    public toggleSideNav () {
      this.$mdSidenav( "left" ).toggle();
    }

    /***************************************************/
  }

}