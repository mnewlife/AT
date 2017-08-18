/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as src from "../../../../src";
import * as storageInterfaces from "../../../../src/components/storage";

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

class GrocRound implements src.components.storage.GrocRound {

  readonly price: storageInterfaces.grocRound.Price;
  readonly product: storageInterfaces.grocRound.Product;
  readonly shop: storageInterfaces.grocRound.Shop;

  /*****************************************************************/

  constructor( params: {
    price: storageInterfaces.grocRound.Price;
    product: storageInterfaces.grocRound.Product;
    shop: storageInterfaces.grocRound.Shop;
  } ) {

    this.price = params.price;
    this.product = params.product;
    this.shop = params.shop;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: src.Config ): src.components.storage.GrocRound => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.components.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.components.sharedLogic.moders.checkThrow
  } );

  return new GrocRound( {
    price: priceFactory( commonParams ),
    product: productFactory( commonParams ),
    shop: shopFactory( commonParams )
  } );

};

/******************************************************************************/
