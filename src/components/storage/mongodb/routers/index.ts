/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageInterfaces from "../../../../interfaces/components/storage";

import amountsFactory from "./amounts";
import newRouterStockFactory from "./new-router-stock";
import saleFactory from "./sale";

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

class Routers implements interfaces.components.storage.Routers {

  readonly amounts: storageInterfaces.routers.Amounts;
  readonly newRouterStock: storageInterfaces.routers.NewRouterStock;
  readonly sale: storageInterfaces.routers.Sale;

  /*****************************************************************/

  constructor( params: {
    amounts: storageInterfaces.routers.Amounts;
    newRouterStock: storageInterfaces.routers.NewRouterStock;
    sale: storageInterfaces.routers.Sale;
  } ) {

    this.amounts = params.amounts;
    this.newRouterStock = params.newRouterStock;
    this.sale = params.sale;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.storage.Routers => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.components.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.components.sharedLogic.moders.checkThrow
  } );

  return new Routers( {
    amounts: amountsFactory( commonParams ),
    newRouterStock: newRouterStockFactory( commonParams ),
    sale: saleFactory( commonParams )
  } );

};

/******************************************************************************/
