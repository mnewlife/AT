module CoreAdminChangePasswordServiceInterfaces {

  /*******************************************/

  export interface Instance {
    oldPassword: string;
    newPassword: string;
    confirm: string;

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
