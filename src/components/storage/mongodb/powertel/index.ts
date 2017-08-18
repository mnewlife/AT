/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as src from "../../../../src";
import * as storageInterfaces from "../../../../src/components/storage";

import airtimeFactory from "./airtime";
import airtimeSaleFactory from "./airtime-sale";
import cardFactory from "./card";
import cardSaleFactory from "./card-sale";
import newAirtimeStockFactory from "./new-airtime-stock";
import newCardStockFactory from "./new-card-stock";

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

class Powertel implements src.components.storage.Powertel {

  readonly airtime: storageInterfaces.powertel.Airtime;
  readonly airtimeSale: storageInterfaces.powertel.AirtimeSale;
  readonly card: storageInterfaces.powertel.Card;
  readonly cardSale: storageInterfaces.powertel.CardSale;
  readonly newAirtimeStock: storageInterfaces.powertel.NewAirtimeStock;
  readonly newCardStock: storageInterfaces.powertel.NewCardStock;

  /*****************************************************************/

  constructor( params: {
    airtime: storageInterfaces.powertel.Airtime;
    airtimeSale: storageInterfaces.powertel.AirtimeSale;
    card: storageInterfaces.powertel.Card;
    cardSale: storageInterfaces.powertel.CardSale;
    newAirtimeStock: storageInterfaces.powertel.NewAirtimeStock;
    newCardStock: storageInterfaces.powertel.NewCardStock;
  } ) {

    this.airtime = params.airtime;
    this.airtimeSale = params.airtimeSale;
    this.card = params.card;
    this.cardSale = params.cardSale;
    this.newAirtimeStock = params.newAirtimeStock;
    this.newCardStock = params.newCardStock;


  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: src.Config ): src.components.storage.Powertel => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.components.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.components.sharedLogic.moders.checkThrow
  } );

  return new Powertel( {
    airtime: airtimeFactory( commonParams ),
    airtimeSale: airtimeSaleFactory( commonParams ),
    card: cardFactory( commonParams ),
    cardSale: cardSaleFactory( commonParams ),
    newAirtimeStock: newAirtimeStockFactory( commonParams ),
    newCardStock: newCardStockFactory( commonParams )
  } );

};

/******************************************************************************/
