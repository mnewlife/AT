/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as EventListener from "../../../../event-listener/interfaces";
import * as DataStructures from "../../../helpers/data-structures/interfaces";
import * as Moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../../interfaces/routers";

import amounts from "./amounts";
import newRouterStock from "./new-router-stock";
import sale from "./sale";

/******************************************************************************/

class Routers implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor(
    readonly amounts: interfaces.amounts.ClassInstance,
    readonly newRouterStock: interfaces.newRouterStock.ClassInstance,
    readonly sale: interfaces.sale.ClassInstance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.ClassInstance => {

  return new Routers(
    amounts( emitEvent, mapDetails, checkThrow ),
    newRouterStock( emitEvent, mapDetails, checkThrow ),
    sale( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
