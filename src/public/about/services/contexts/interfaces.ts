module AboutContextsServiceInterfaces {

  /*******************************************/

  import user = User;

  /*******************************************/

  export interface Instance {
    currentUser: user.Super;
    signOut: () => any;
    decoded: any;
  }

  /*******************************************/

}
