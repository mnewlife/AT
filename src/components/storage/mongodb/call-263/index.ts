/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as EventListener from "../../../../event-listener/interfaces";
import * as DataStructures from "../../../helpers/data-structures/interfaces";
import * as Moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../../interfaces/call-263";

import airtimePayment from "./airtime-payment";
import airtimeTransfer from "./airtime-transfer";
import channel from "./channel";

/******************************************************************************/

class Call263 implements interfaces.Instance {

  /*****************************************************************/

  constructor(
    readonly airtimePayment: interfaces.airtimePayment.Instance,
    readonly airtimeTransfer: interfaces.airtimeTransfer.Instance,
    readonly channel: interfaces.channel.Instance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.Instance => {

  return new Call263(
    airtimePayment( emitEvent, mapDetails, checkThrow ),
    airtimeTransfer( emitEvent, mapDetails, checkThrow ),
    channel( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
