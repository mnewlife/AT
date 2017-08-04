/******************************************************************************/

import * as core from "./core";
import * as grocRound from "./groc-round";
import * as call263 from "./call-263";
import * as routers from "./routers";
import * as powertel from "./powertel";

/******************************************************************************/

export { core, grocRound, call263, routers, powertel };

/******************************************************************************/

export type ModelRange = user.Super | amendmentRequest.Super
  | customerGroup.Super | productType.Super
  | product.Super | order.Super

  | event.Super | progression.Super
  | notification.Super | subscription.Super;

export type ModelArrayRange = user.Super[] | amendmentRequest.Super[]
  | customerGroup.Super[] | productType.Super[]
  | product.Super[] | order.Super[]

  | event.Super[] | progression.Super[]
  | notification.Super[] | subscription.Super[];

/******************************************************************************/

export interface DataModel extends DataModel_Partial {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export type DataModel_Partial = Partial<DataModel>;

export type AccessLevel = "developer" | "admin" | "logistics" | "salesRep";

/******************************************************************************/

export interface Happening {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}
export type Happening_Partial = Partial<Happening>;

/******************************************************************************/

export interface UserInfo extends DataModel {
  userId: string;
  emailAddress: string;
  fullName: string;
};
export type UserInfo_Partial = Partial<UserInfo>;

/******************************************************************************/
