/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../../interfaces/index";
import * as dataImplementations from "../../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "Core|Admin|Registration";

/******************************************************************************/

export interface AddedAdminData {
  user: dataImplementations.UserModel;
}
export interface AddedAdmin extends Happening {
  context: context;
  identifier: "AddedAdmin";
  data: AddedAdminData;
}

export interface AddAdminFailedData {
  emailAddress: string;
  reason: any;
}
export interface AddAdminFailed extends Happening {
  context: context;
  identifier: "AddAdminFailed";
  data: AddAdminFailedData;
}

/******************************************************************************/