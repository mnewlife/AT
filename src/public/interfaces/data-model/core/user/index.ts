module User {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Developer extends Super { accessLevel: "developer" };
  export interface Admin extends Super { accessLevel: "admin" };
  export interface Consumer extends Super { accessLevel: "consumer" };

  export interface Super extends dataModel.DataModel {
    emailAddress: string;
    accessLevel: AccessLevel;
    password: string;
    resetCode?: string;
    verification: Verification;
    personalDetails?: PersonalDetails;
    contactDetails?: ContactDetails;
    residentialDetails?: ResidentialDetails;
    activeApps: dataModel.AppName[];
  }

  /******************************************************************************/

  export interface Verification {
    verified: boolean;
    verificationCode?: string;
    numVerAttempts: number;
  }

  /******************************************************************************/

  export interface PersonalDetails {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "Male" | "Female";
  }

  /******************************************************************************/

  export interface ContactDetails {
    phoneNumbers: string[];
  }

  /******************************************************************************/

  export interface ResidentialDetails {
    country: string;
    province: string;
    address: string;
  }

  /******************************************************************************/

  export interface UserInfo {
    userId: string;
    emailAddress: string;
    fullName?: string;
  };

  export type AccessLevel = "developer" | "admin" | "consumer";

  /******************************************************************************/

}