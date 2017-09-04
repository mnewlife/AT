/******************************************************************************/

import * as moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  MailAgent: interfaces.Constructor,
  events: events.ClassInstance,
  checkThrow: moders.CheckThrow,
  sendingAddress: string,
  password: string
): interfaces.ClassInstance => {

  return new MailAgent( events, checkThrow, sendingAddress, password );

}

/******************************************************************************/
