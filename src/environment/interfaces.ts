/******************************************************************************/

export interface Environment {
  readonly applicationName: string;
  readonly applicationDescription: string;
  readonly contactDetails: {
    readonly emailAddress: string;
    readonly phoneNumber: string;
  };
  readonly copyrightMessage: string;
  readonly production: boolean;
  readonly host: string;
}

/******************************************************************************/
