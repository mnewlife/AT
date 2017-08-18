/******************************************************************************/

import * as src from "../../../src";

/******************************************************************************/

import * as event from "./event";
import * as user from "./user";

/******************************************************************************/

export { event, user };

/******************************************************************************/

export type ModelRange = event.Super | user.Super;
export type ModelArrayRange = event.Super[] | user.Super[];

/******************************************************************************/

export interface UserInfo extends dataModel.DataModel {
  userId: string;
  emailAddress: string;
  fullName?: string;
};

export type AccessLevel = "developer" | "admin" | "consumer";

/******************************************************************************/