module CoreAdminEditProfileComponentInterfaces {

  /*******************************************/

  import profileService = CoreAdminProfileServiceInterfaces;
  import user = User;
  import countries = CountriesServiceInterfaces;

  /*******************************************/

  export interface Instance {
    emailAddress: string;
    details: profileService.UpdateDetails;

    minDate: Date;
    maxDate: Date;
    countries: countries.Country[];

    openChangeEmailAddress: OpenChangeEmailAddress;
    openChangePassword: OpenChangePassword;
    saveChanges: SaveChanges;

    errorMessage: string;
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
