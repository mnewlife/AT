/******************************************************************************/

import * as event from "./event";
import * as invitation from "./invitation";
import * as notification from "./notification";
import * as progression from "./progression";
import * as user from "./user";

/******************************************************************************/

export { event, invitation, notification, progression, user };

/******************************************************************************/

export interface Instance {
  readonly event: event.Instance;
  readonly invitation: invitation.Instance;
  readonly notification: notification.Instance;
  readonly progression: progression.Instance;
  readonly user: user.Instance;
}

/******************************************************************************/