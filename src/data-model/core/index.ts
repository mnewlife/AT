/******************************************************************************/

import * as dataModel from "../../data-model";

/******************************************************************************/

import * as event from "./event";
import * as subscription from "./subscription";
import * as user from "./user";

/******************************************************************************/

export { event, subscription, user };

/******************************************************************************/

export type ModelRange = event.Super | subscription.Super | user.Super;
export type ModelArrayRange = event.Super[] | subscription.Super[] | user.Super[];

/******************************************************************************/