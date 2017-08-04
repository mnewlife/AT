/******************************************************************************/

import * as verification from "./verification/index";

import * as interfaces from "../../../../interfaces/index";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";

/******************************************************************************/

export { verification };

/******************************************************************************/

export interface Params {
  generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber;
  getUserById: storageManagerInterfaces.user.GetById;
  updateUserById: storageManagerInterfaces.user.UpdateById;
}

export interface Verification {
  readonly generateCode: verification.GenerateCode;
  readonly verifyAccount: verification.VerifyAccount;
}

/******************************************************************************/
