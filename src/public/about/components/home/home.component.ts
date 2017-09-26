module AboutHomeComponent {

  import interfaces = AboutHomeComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import contextsService = AboutContextsServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public services: interfaces.Service[];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly ToastService: toastService.Instance,
      private readonly ContextsService: contextsService.Instance
    ) {

      this.initServices();

    }

    /***************************************************/

    private initServices = () => {

      this.services = [];

      let href = "/grocRound";

      if ( this.ContextsService.currentUser ) {
        href += "/" + this.ContextsService.currentUser.accessLevel;
      } else {
        href = "";
      }

      this.services.push( {
        serviceName: "Grocery Rounds",
        image: "/about/resources/drawable/groceryRound.png",
        description: "Description Here",
        href: href
      } );

      href = "/call263";

      if ( this.ContextsService.currentUser ) {
        href += "/" + this.ContextsService.currentUser.accessLevel;
      } else {
        href = "";
      }

      this.services.push( {
        serviceName: "Call 263",
        image: "/about/resources/drawable/call263.jpg",
        description: "Description Here",
        href: href
      } );

      this.services.push( {
        serviceName: "More coming soon",
        image: "/about/resources/drawable/pixel.png",
        description: "Description Here",
        href: ""
      } );

    }

    /***************************************************/

    public route = ( destination: string ) => {

      if ( destination ) {
        window.location.href = destination;
      }

    }

    /***************************************************/

  }

}

/*******************************************************************/
