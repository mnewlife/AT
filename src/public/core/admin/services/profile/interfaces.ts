module CoreAdminProfileServiceInterfaces {

  /*******************************************/

  import user = User;

  /*******************************************/

  export interface Instance {
    user: user.Super;

    progress: {
      getUser: boolean;
      updateDetails: boolean;
      changeEmailAddress: boolean;
      changePassword: boolean;
      signOut: boolean;
    };

    promises: {
      getUser: ng.IPromise<boolean>;
      signOut: ng.IPromise<boolean>;
    };

    getUser: GetUser;
    updateDetails: UpdateDetails;
    changeEmailAddress: ChangeEmailAddress;
    changePassword: ChangePassword;
    signOut: SignOut;
  }

  /*******************************************/

  export interface UpdateDetails {
    personalDetails?: Partial<user.PersonalDetails>;
    contactDetails?: Partial<{
      phoneNumbers?: string[];
      phoneNumbersToAdd: string[];
      phoneNumbersToRemove: string[];
    }>;
    residentialDetails?: Partial<user.ResidentialDetails>;
  }

  /*******************************************/

  export interface SignOut {
    (): void;
  }

  export interface GetUser {
    (): ng.IPromise<boolean>;
  }

  export interface UpdateDetails {
    ( details: UpdateDetails ): ng.IPromise<void>;
  }

  export interface ChangeEmailAddress {
    ( password: string, newAddress: string ): ng.IPromise<void>;
  }

  export interface ChangePassword {
    ( oldPassword: string, newPassword: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
