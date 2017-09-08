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

class GrocRound implements interfaces.Instance {

  /*****************************************************************/

  constructor(
    readonly price: interfaces.price.Instance,
    readonly product: interfaces.product.Instance,
    readonly shop: interfaces.shop.Instance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.Instance => {

  return new GrocRound(
    price( emitEvent, mapDetails, checkThrow ),
    product( emitEvent, mapDetails, checkThrow ),
    shop( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
