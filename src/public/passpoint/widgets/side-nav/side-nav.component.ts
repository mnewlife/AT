module SideNavWidget {

  import interfaces = SideNavWidgetInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public items: interfaces.Item[];

    /***************************************************/

    constructor() {

      this.items = [
        {
          id: 1,
          href: "#/sign-in",
          icon: "input",
          caption: "Sign In"
        },
        {
          id: 2,
          href: "#/sign-up",
          icon: "mode_edit",
          caption: "Sign Up"
        }
      ];

    }

    /***************************************************/
  }

}

  /*******************************************************************/