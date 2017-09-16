module SideNavWidget {

  import interfaces = SideNavWidgetInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public items: interfaces.Item[];

    /***************************************************/

    constructor() {

      this.items.push( {
        href: "#/profile",
        icon: "person",
        caption: "My Profile"
      } );

      this.items.push( {
        href: "#/add-admin",
        icon: "plus",
        caption: "Add Admin"
      } );

    }

    /***************************************************/
  }

}

  /*******************************************************************/