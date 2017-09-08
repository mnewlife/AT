/******************************************************************************/

import * as event from "./event";
import * as subscription from "./subscription";
import * as user from "./user";

/******************************************************************************/

export { event, subscription, user };

/******************************************************************************/

export interface Instance {
  readonly event: event.Instance;
  readonly subscription: subscription.Instance;
  readonly user: user.Instance;
}

/******************************************************************************/