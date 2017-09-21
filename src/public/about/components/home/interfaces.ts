module AboutHomeComponentInterfaces {

  /*******************************************/

  export interface Instance {
    services: Service[];
  }

  /*******************************************/

  export interface Service {
    serviceName: string;
    image: string;
    description: string;
    href: string;
  }

  /*******************************************/

}
