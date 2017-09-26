module AboutSideNavWidget {

  import interfaces = AboutSideNavWidgetInterfaces;
  import contextsService = AboutContextsServiceInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public items: interfaces.Item[];
    public services: interfaces.Item[];

    /***************************************************/

    constructor( private readonly ContextsService: AboutContextsServiceInterfaces.Instance ) {

      this.items = [];
      this.services = [];

      this.items.push( {
        href: "/passpoint/#/sign-in",
        icon: "input",
        caption: "Sign In"
      } );
      this.items.push( {
        href: "/passpoint/#/sign-up",
        icon: "mode_edit",
        caption: "Sign Up"
      } );

      let href = "/grocRound";

      if ( this.ContextsService.currentUser ) {
        href += "/" + this.ContextsService.currentUser.accessLevel;
      } else {
        href = "";
      }
      this.services.push( {
        href: href,
        icon: "local_grocery_store",
        caption: "Grocery Rounds"
      } );

      href = "/call263";

      if ( this.ContextsService.currentUser ) {
        href += "/" + this.ContextsService.currentUser.accessLevel;
      } else {
        href = "";
      }
      this.services.push( {
        href: href,
        icon: "call",
        caption: "Call263"
      } );

    }

    /***************************************************/
  }

}

  /*******************************************************************/