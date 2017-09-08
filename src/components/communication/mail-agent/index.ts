/******************************************************************************/

import * as eventListener from "../../../event-listener/interfaces";
import * as moders from "../../helpers/moders/interfaces";

import * as interfaces from "./interfaces";

import NodeMailer from "./node-mailer";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  sendingAddress: string,
  password: string
): interfaces.Instance => {

  return factory( NodeMailer, new Events( emitEvent ), checkThrow, sendingAddress, password );

}

/******************************************************************************/
