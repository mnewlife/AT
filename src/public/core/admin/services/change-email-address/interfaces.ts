module CoreAdminChangeEmailAddressServiceInterfaces {

  /*******************************************/

  export interface Instance {
    password: string;
    newEmailAddress: string;

    error: string;
    
    change: Change;
    cancel: Cancel;
  }

  export interface Change {
    (): any;
  }

  export interface Cancel {
    (): any;
  }

  /*******************************************/

}
