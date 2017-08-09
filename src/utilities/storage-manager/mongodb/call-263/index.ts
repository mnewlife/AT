/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";

import airtimePaymentFactory from "./airtime-payment";
import airtimeTransferFactory from "./airtime-transfer";
import channelFactory from "./channel";

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

class Call263 implements interfaces.utilities.storageManager.Call263 {

  readonly airtimePayment: storageManagerInterfaces.call263.AirtimePayment;
  readonly airtimeTransfer: storageManagerInterfaces.call263.AirtimeTransfer;
  readonly channel: storageManagerInterfaces.call263.Channel;

  /*****************************************************************/

  constructor( params: {
    airtimePayment: storageManagerInterfaces.call263.AirtimePayment;
    airtimeTransfer: storageManagerInterfaces.call263.AirtimeTransfer;
    channel: storageManagerInterfaces.call263.Channel;
  } ) {

    this.airtimePayment = params.airtimePayment;
    this.airtimeTransfer = params.airtimeTransfer;
    this.channel = params.channel;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.storageManager.Call263 => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.utilities.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
  } );

  return new Call263( {
    airtimePayment: airtimePaymentFactory( commonParams ),
    airtimeTransfer: airtimeTransferFactory( commonParams ),
    channel: channelFactory( commonParams )
  } );

};

/******************************************************************************/
