/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as EventListener from "../../../../event-listener/interfaces";
import * as DataStructures from "../../../helpers/data-structures/interfaces";
import * as Moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../../interfaces/powertel";

import airtime from "./airtime";
import airtimeSale from "./airtime-sale";
import card from "./card";
import cardSale from "./card-sale";
import newAirtimeStock from "./new-airtime-stock";
import newCardStock from "./new-card-stock";

/******************************************************************************/

class Powertel implements interfaces.Instance {

  /*****************************************************************/

  constructor(
    readonly airtime: interfaces.airtime.Instance,
    readonly airtimeSale: interfaces.airtimeSale.Instance,
    readonly card: interfaces.card.Instance,
    readonly cardSale: interfaces.cardSale.Instance,
    readonly newAirtimeStock: interfaces.newAirtimeStock.Instance,
    readonly newCardStock: interfaces.newCardStock.Instance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.Instance => {

  return new Powertel(
    airtime( emitEvent, mapDetails, checkThrow ),
    airtimeSale( emitEvent, mapDetails, checkThrow ),
    card( emitEvent, mapDetails, checkThrow ),
    cardSale( emitEvent, mapDetails, checkThrow ),
    newAirtimeStock( emitEvent, mapDetails, checkThrow ),
    newCardStock( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
