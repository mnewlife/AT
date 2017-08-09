/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";

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

class Powertel implements interfaces.utilities.storageManager.Powertel {

  readonly airtime: storageManagerInterfaces.powertel.Airtime;
  readonly airtimeSale: storageManagerInterfaces.powertel.AirtimeSale;
  readonly card: storageManagerInterfaces.powertel.Card;
  readonly cardSale: storageManagerInterfaces.powertel.CardSale;
  readonly newAirtimeStock: storageManagerInterfaces.powertel.NewAirtimeStock;
  readonly newCardStock: storageManagerInterfaces.powertel.NewCardStock;

  /*****************************************************************/

  constructor( params: {
    airtime: storageManagerInterfaces.powertel.Airtime;
    airtimeSale: storageManagerInterfaces.powertel.AirtimeSale;
    card: storageManagerInterfaces.powertel.Card;
    cardSale: storageManagerInterfaces.powertel.CardSale;
    newAirtimeStock: storageManagerInterfaces.powertel.NewAirtimeStock;
    newCardStock: storageManagerInterfaces.powertel.NewCardStock;
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

export default ( config: interfaces.Config ): interfaces.utilities.storageManager.Powertel => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.utilities.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
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
