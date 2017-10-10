module GrocRoundAdminUsersServiceInterfaces {

  /*******************************************/

  import user = User;
  
  export interface Instance {
    users: user.Super[];

    progress: {
      getUsers: boolean;
    };

    promises: {
      getUsers: ng.IPromise<boolean>;
    };

    getUsers: GetUsers;
    getUser: GetUser;
  }

  /*******************************************/

  export interface GetUsers {
    (): ng.IPromise<boolean>;
  }

  export interface GetUser {
    ( userId: string ): ng.IPromise<user.Super>;
  }

  /*******************************************/

}
