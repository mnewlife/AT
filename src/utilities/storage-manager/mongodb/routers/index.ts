/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";

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

class Routers implements interfaces.utilities.storageManager.Routers {

  readonly amounts: storageManagerInterfaces.routers.Amounts;
  readonly newRouterStock: storageManagerInterfaces.routers.NewRouterStock;
  readonly sale: storageManagerInterfaces.routers.Sale;

  /*****************************************************************/

  constructor( params: {
    amounts: storageManagerInterfaces.routers.Amounts;
    newRouterStock: storageManagerInterfaces.routers.NewRouterStock;
    sale: storageManagerInterfaces.routers.Sale;
  } ) {

    this.amounts = params.amounts;
    this.newRouterStock = params.newRouterStock;
    this.sale = params.sale;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.storageManager.Routers => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.utilities.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
  } );

  return new Routers( {
    amounts: amountsFactory( commonParams ),
    newRouterStock: newRouterStockFactory( commonParams ),
    sale: saleFactory( commonParams )
  } );

};

/******************************************************************************/
