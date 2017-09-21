module AboutHomeComponent {

  import interfaces = AboutHomeComponentInterfaces;
  import toastService = ToastServiceInterfaces;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public services: interfaces.Service[];

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly ToastService: toastService.Instance
    ) {

      this.services = [
        {
          serviceName: "Grocery Rounds",
          image: "/about/resources/drawable/groceryRound.png",
          description: "Description Here",
          href: "/grocRound"
        },
        {
          serviceName: "Call 263",
          image: "/about/resources/drawable/call263.jpg",
          description: "Description Here",
          href: "/call263"
        },
        {
          serviceName: "More coming soon",
          image: "/about/resources/drawable/mighty-eagle.jpg",
          description: "Description Here",
          href: ""
        }
      ]

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
