module CoreAdminEditProfileComponentInterfaces {

  /*******************************************/

  import profileService = CoreAdminProfileServiceInterfaces;
  import user = User;
  import countries = CountriesServiceInterfaces;

  /*******************************************/

  export interface Instance {
    details: profileService.UpdateDetails;

    minDate: Date;
    maxDate: Date;
    countries: countries.Country[];

    openChangeEmailAddress: OpenChangeEmailAddress;
    openChangePassword: OpenChangePassword;
    saveChanges: SaveChanges;
  }

  /*******************************************/

  export interface OpenChangeEmailAddress {
    ( ev: MouseEvent ): void;
  }

  export interface OpenChangePassword {
    ( ev: MouseEvent ): void;
  }

  export interface SaveChanges {
    ( details: profileService.UpdateDetails ): any;
  }

  /*******************************************/

}
