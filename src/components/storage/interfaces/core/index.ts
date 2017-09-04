/******************************************************************************/

import * as event from "./event";
import * as subscription from "./subscription";
import * as user from "./user";

/******************************************************************************/

export { event, subscription, user };

/******************************************************************************/

export interface ClassInstance {
  readonly event: event.ClassInstance;
  readonly subscription: subscription.ClassInstance;
  readonly user: user.ClassInstance;
}

/******************************************************************************/