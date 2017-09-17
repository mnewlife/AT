module SignUpComponentInterfaces {

  /*******************************************/

  export interface Instance {
    emailAddress: string;
    password: string;
    confirm: string;
    registering: boolean;
    signUp: SignUp;
  }

  /*******************************************/

  export interface SignUp {
    ( emailAddress: string, password: string ): any;
  }

  /*******************************************/

}
