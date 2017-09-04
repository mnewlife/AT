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

class Call263 implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor(
    readonly airtimePayment: interfaces.airtimePayment.ClassInstance,
    readonly airtimeTransfer: interfaces.airtimeTransfer.ClassInstance,
    readonly channel: interfaces.channel.ClassInstance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.ClassInstance => {

  return new Call263(
    airtimePayment( emitEvent, mapDetails, checkThrow ),
    airtimeTransfer( emitEvent, mapDetails, checkThrow ),
    channel( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
