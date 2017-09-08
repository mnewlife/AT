/******************************************************************************/

import * as moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  MailAgent: interfaces.Constructor,
  events: events.Instance,
  checkThrow: moders.CheckThrow,
  sendingAddress: string,
  password: string
): interfaces.Instance => {

  return new MailAgent( events, checkThrow, sendingAddress, password );

}

/******************************************************************************/
