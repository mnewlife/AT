/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as mongoose from "mongoose";

import * as interfaces from "../../../interfaces";
import * as storageManagerInterfaces from "../../../interfaces/utilities/storage-manager";

import call263Factory from "./call-263";
import coreFactory from "./core";
import grocRoundFactory from "./groc-round";
import powertelFactory from "./powertel";
import routersFactory from "./routers";

/******************************************************************************/

export interface Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInfo_Nuance extends Document {
  userId: mongoose.Types.ObjectId;
  emailAddress: string;
  fullName: string;
}
export interface UserInfo extends UserInfo_Nuance, mongoose.Document { }

/******************************************************************************/

class MongodbStorage implements interfaces.utilities.StorageManager {

  readonly call263: storageManagerInterfaces.Call263;
  readonly core: storageManagerInterfaces.Core;
  readonly grocRound: storageManagerInterfaces.GrocRound;
  readonly powertel: storageManagerInterfaces.Powertel;
  readonly routers: storageManagerInterfaces.Routers;

  readonly middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: {
    linkToDB: string;
    call263: storageManagerInterfaces.Call263;
    core: storageManagerInterfaces.Core;
    grocRound: storageManagerInterfaces.GrocRound;
    powertel: storageManagerInterfaces.Powertel;
    routers: storageManagerInterfaces.Routers;
  } ) {

    this.connectToDatabase( params.linkToDB );

    this.call263 = params.call263;
    this.core = params.core;
    this.grocRound = params.grocRound;
    this.powertel = params.powertel;
    this.routers = params.routers;

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

    call263: call263Factory( commonParams ),
    core: coreFactory( commonParams ),
    grocRound: grocRoundFactory( commonParams ),
    powertel: powertelFactory( commonParams ),
    routers: routersFactory( commonParams ),

  } );

};

/******************************************************************************/
