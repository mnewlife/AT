module CountriesServiceInterfaces {

  /*******************************************/

  export interface Instance {
    list: Country[];
  }

  /*******************************************/

  export interface Country {
    name: string;
    code: string;
  }

  /*******************************************/

}
