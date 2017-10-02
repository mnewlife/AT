/******************************************************************************/

import * as dataModel from "../../data-model";

/******************************************************************************/

import * as event from "./event";
import * as invitation from "./invitation";
import * as notification from "./notification";
import * as progression from "./progression";
import * as user from "./user";

/******************************************************************************/

export { event, invitation, notification, progression, user };

/******************************************************************************/

export type ModelRange = event.Super | invitation.Super | notification.Super | progression.Super | user.Super;
export type ModelArrayRange = event.Super[] | invitation.Super[] | notification.Super[] | progression.Super[] | user.Super[];

/******************************************************************************/