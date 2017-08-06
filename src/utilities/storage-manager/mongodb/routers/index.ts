/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as mongoose from "mongoose";

import * as interfaces from "../../../interfaces";
import * as storageManagerInterfaces from "../../../interfaces/utilities/storage-manager";

import userFactory from "./user";
import eventFactory from "./event";
import progressionFactory from "./progression";
import notificationFactory from "./notification";
import subscriptionFactory from "./subscription";

import amendmentRequestFactory from "./amendment-request";
import customerGroupFactory from "./customer-group";
import orderFactory from "./order";
import productFactory from "./product";
import productTypeFactory from "./product-type";

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

class MongodbStorage implements interfaces.utilities.StorageManager {

  readonly user: storageManagerInterfaces.core.user;
  readonly event: storageManagerInterfaces.Event;
  readonly progression: storageManagerInterfaces.Progression;
  readonly notification: storageManagerInterfaces.Notification;
  readonly subscription: storageManagerInterfaces.Subscription;

  readonly amendmentRequest: storageManagerInterfaces.AmendmentRequest;
  readonly customerGroup: storageManagerInterfaces.CustomerGroup;
  readonly order: storageManagerInterfaces.Order;
  readonly product: storageManagerInterfaces.Product;
  readonly productType: storageManagerInterfaces.ProductType;

  readonly middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: {
    linkToDB: string;
    user: storageManagerInterfaces.core.user;
    event: storageManagerInterfaces.Event;
    progression: storageManagerInterfaces.Progression;
    notification: storageManagerInterfaces.Notification;
    subscription: storageManagerInterfaces.Subscription;
    amendmentRequest: storageManagerInterfaces.AmendmentRequest;
    customerGroup: storageManagerInterfaces.CustomerGroup;
    order: storageManagerInterfaces.Order;
    product: storageManagerInterfaces.Product;
    productType: storageManagerInterfaces.ProductType;
  } ) {

    this.connectToDatabase( params.linkToDB );

    this.user = params.user;
    this.event = params.event;
    this.notification = params.notification;
    this.progression = params.progression;
    this.subscription = params.subscription;

    this.amendmentRequest = params.amendmentRequest;
    this.customerGroup = params.customerGroup;
    this.order = params.order;
    this.product = params.product;
    this.productType = params.productType;

  }

  /*****************************************************************/

  private readonly connectToDatabase = ( linkToDB: string ): void => {
    mongoose.connect( linkToDB, function ( err: any, res: any ) {
      if ( err ) {
        throw new Error( "Error connecting to database : " + linkToDB + ", Error details : " + err );
      } else {
        console.log( "Connected to MongoDB database : " + linkToDB );
      }
    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.StorageManager => {

  let productionLink = "mongodb://AllanSimoyi:tatenda#1@ds157499.mlab.com:57499/ximex";
  let developmentLink = "mongodb://127.0.0.1:27017/Ximex";

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.utilities.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
  } );

  return new MongodbStorage( {
    linkToDB: ( config.environment.production ? productionLink : developmentLink ),

    user: userFactory( commonParams ),
    event: eventFactory( commonParams ),
    progression: progressionFactory( commonParams ),
    notification: notificationFactory( commonParams ),
    subscription: subscriptionFactory( commonParams ),

    amendmentRequest: amendmentRequestFactory( commonParams ),
    customerGroup: customerGroupFactory( commonParams ),
    order: orderFactory( commonParams ),
    product: productFactory( commonParams ),
    productType: productTypeFactory( commonParams )
  } );

};

/******************************************************************************/
