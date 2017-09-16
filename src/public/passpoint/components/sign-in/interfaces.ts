module SignInComponentInterfaces {

  /*******************************************/

  export interface Instance {
    emailAddress: string;
    password: string;
    authenticating: boolean;
    signIn: SignIn;
  }

  /*******************************************/

  export interface SignIn {
    ( emailAddress: string, password: string ): any;
  }

  /*******************************************/

}
