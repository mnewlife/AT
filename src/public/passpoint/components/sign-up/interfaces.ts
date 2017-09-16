module SignUpComponentInterfaces {

  /*******************************************/

  export interface Instance {
    emailAddress: string;
    password: string;
    confirm: string;
    registering: boolean;
    signUp: SignUp;
  }

  export interface Tile {
    service: string;
    src: string;
    alt: string;
    span: {
      row: number;
      col: number;
    };
  }
  
  /*******************************************/

  export interface SignUp {
    ( emailAddress: string, password: string ): any;
  }

  /*******************************************/

}
