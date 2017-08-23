/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as EventListener from "../../../../event-listener/interfaces";
import * as DataStructures from "../../../helpers/data-structures/interfaces";
import * as Moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../../interfaces/groc-round";

import price from "./price";
import product from "./product";
import shop from "./shop";

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

class GrocRound implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor(
    readonly price: interfaces.price.ClassInstance,
    readonly product: interfaces.product.ClassInstance,
    readonly shop: interfaces.shop.ClassInstance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.ClassInstance => {

  return new GrocRound(
    price( emitEvent, mapDetails, checkThrow ),
    product( emitEvent, mapDetails, checkThrow ),
    shop( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
