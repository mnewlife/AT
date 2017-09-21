module CoreAdminSideNavWidget {

  import interfaces = CoreAdminSideNavWidgetInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public apps: interfaces.App[];
    public locals: interfaces.Local[];

    /***************************************************/

    constructor() {

      this.apps = [];
      this.locals = [];

      this.locals.push( {
        href: "#/profile",
        icon: "person",
        caption: "My Profile"
      } );
      this.locals.push( {
        href: "#/edit-profile",
        icon: "mode_edit",
        caption: "Edit Profile"
      } );

      this.apps.push( {
        href: "/grocRound",
        icon: "local_grocery_store",
        caption: "Grocery Rounds"
      } );
      this.apps.push( {
        href: "/call263",
        icon: "call",
        caption: "Call263"
      } );
      this.apps.push( {
        href: "/routers",
        icon: "wifi",
        caption: "Routers"
      } );
      this.apps.push( {
        href: "/phones",
        icon: "smartphone",
        caption: "Smartphones"
      } );

    }

    /***************************************************/
  }

}

  /*******************************************************************/