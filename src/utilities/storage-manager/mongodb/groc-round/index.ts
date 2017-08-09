/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";

import priceFactory from "./price";
import productFactory from "./product";
import shopFactory from "./shop";

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

class GrocRound implements interfaces.utilities.storageManager.GrocRound {

  readonly price: storageManagerInterfaces.grocRound.Price;
  readonly product: storageManagerInterfaces.grocRound.Product;
  readonly shop: storageManagerInterfaces.grocRound.Shop;

  /*****************************************************************/

  constructor( params: {
    price: storageManagerInterfaces.grocRound.Price;
    product: storageManagerInterfaces.grocRound.Product;
    shop: storageManagerInterfaces.grocRound.Shop;
  } ) {

    this.price = params.price;
    this.product = params.product;
    this.shop = params.shop;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.storageManager.GrocRound => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.utilities.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
  } );

  return new GrocRound( {
    price: priceFactory( commonParams ),
    product: productFactory( commonParams ),
    shop: shopFactory( commonParams )
  } );

};

/******************************************************************************/
