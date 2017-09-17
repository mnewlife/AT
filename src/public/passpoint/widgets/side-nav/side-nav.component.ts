module SideNavWidget {

  import interfaces = SideNavWidgetInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public items: interfaces.Item[];

    /***************************************************/

    constructor() {

      this.items = [];

      this.items.push( {
        href: "#/sign-in",
        icon: "input",
        caption: "Sign In"
      } );

      this.items.push( {
        href: "#/sign-up",
        icon: "mode_edit",
        caption: "Sign Up"
      } );

    }

    /***************************************************/
  }

}

  /*******************************************************************/