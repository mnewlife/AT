module GrocRoundAdminContextsServiceInterfaces {

  /*******************************************/

  import user = User;

  /*******************************************/

  export interface Instance {
    innerContext: string;
    currentUser: user.Super;
    checked: boolean;
  }

  /*******************************************/

}
