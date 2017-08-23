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

export interface Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInfo extends Document, mongoose.Document {
  userId: mongoose.Types.ObjectId;
  emailAddress: string;
  fullName: string;
}
export type UserInfo_Partial = Partial<UserInfo>;

/******************************************************************************/

class Powertel implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor(
    readonly airtime: interfaces.airtime.ClassInstance,
    readonly airtimeSale: interfaces.airtimeSale.ClassInstance,
    readonly card: interfaces.card.ClassInstance,
    readonly cardSale: interfaces.cardSale.ClassInstance,
    readonly newAirtimeStock: interfaces.newAirtimeStock.ClassInstance,
    readonly newCardStock: interfaces.newCardStock.ClassInstance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.ClassInstance => {

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
