/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as coreInterfaces from "../../../../../interfaces/components/core/index";

/******************************************************************************/

export interface Params {
  verification: coreInterfaces.sharedCode.Verification;
}

export interface Verification {
  readonly generateCode: coreInterfaces.sharedCode.verification.GenerateCode;
  readonly verifyAccount: coreInterfaces.sharedCode.verification.VerifyAccount;
}

/******************************************************************************/
