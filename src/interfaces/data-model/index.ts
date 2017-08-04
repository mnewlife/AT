/******************************************************************************/

import * as event from "./event";
import * as progression from "./progression";
import * as notification from "./notification";
import * as subscription from "./subscription";

import * as user from "./user";
import * as customerGroup from "./customer-group";
import * as productType from "./product-type";
import * as product from "./product";
import * as amendmentRequest from "./amendment-request";
import * as order from "./order";

/******************************************************************************/

export { event, progression, notification, subscription };
export { user, customerGroup, productType, product, amendmentRequest, order };

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
