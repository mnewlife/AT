/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageInterfaces from "../../../../interfaces/components/storage";

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

class Call263 implements interfaces.components.storage.Call263 {

  readonly airtimePayment: storageInterfaces.call263.AirtimePayment;
  readonly airtimeTransfer: storageInterfaces.call263.AirtimeTransfer;
  readonly channel: storageInterfaces.call263.Channel;

  /*****************************************************************/

  constructor( params: {
    airtimePayment: storageInterfaces.call263.AirtimePayment;
    airtimeTransfer: storageInterfaces.call263.AirtimeTransfer;
    channel: storageInterfaces.call263.Channel;
  } ) {

    this.airtimePayment = params.airtimePayment;
    this.airtimeTransfer = params.airtimeTransfer;
    this.channel = params.channel;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.storage.Call263 => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.components.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.components.sharedLogic.moders.checkThrow
  } );

  return new Call263( {
    airtimePayment: airtimePaymentFactory( commonParams ),
    airtimeTransfer: airtimeTransferFactory( commonParams ),
    channel: channelFactory( commonParams )
  } );

};

/******************************************************************************/
