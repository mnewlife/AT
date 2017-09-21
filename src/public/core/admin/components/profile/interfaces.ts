module CoreAdminProfileComponentInterfaces {

  /*******************************************/

  import user = User;
  import profileService = CoreAdminProfileServiceInterfaces;

  /*******************************************/

  export interface Instance {
    user: user.Super;
    progress: profileService.Instance[ "progress" ];
    openChangeEmailAddress: OpenChangeEmailAddress;
    openChangePassword: OpenChangePassword;
  }

  /*******************************************/

  export interface OpenChangeEmailAddress {
    ( ev: MouseEvent ): void;
  }

  export interface OpenChangePassword {
    ( ev: MouseEvent ): void;
  }

  /*******************************************/

}
