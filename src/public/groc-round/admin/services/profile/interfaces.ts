module GrocRoundAdminProfileServiceInterfaces {

  /*******************************************/

  import user = User;

  /*******************************************/

  export interface Instance {
    user: user.Super;

    progress: {
      signOut: boolean;
    };

    promises: {
      signOut: ng.IPromise<boolean>;
    };

    signOut: SignOut;
  }

  /*******************************************/

  export interface SignOut {
    (): void;
  }

  /*******************************************/

}
