/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as mongoose from "mongoose";

import * as interfaces from "../../../interfaces";
import * as storageInterfaces from "../../../interfaces/components/storage";

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

class MongodbStorage implements interfaces.components.Storage {

  readonly call263: storageInterfaces.Call263;
  readonly core: storageInterfaces.Core;
  readonly grocRound: storageInterfaces.GrocRound;
  readonly powertel: storageInterfaces.Powertel;
  readonly routers: storageInterfaces.Routers;

  readonly middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  constructor( params: {
    linkToDB: string;
    call263: storageInterfaces.Call263;
    core: storageInterfaces.Core;
    grocRound: storageInterfaces.GrocRound;
    powertel: storageInterfaces.Powertel;
    routers: storageInterfaces.Routers;
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

export default ( config: interfaces.Config ): interfaces.components.Storage => {

  let productionLink = "mongodb://AllanSimoyi:tatenda#1@ds157499.mlab.com:57499/ximex";
  let developmentLink = "mongodb://127.0.0.1:27017/Ximex";

  return new MongodbStorage( {
    linkToDB: ( config.environment.production ? productionLink : developmentLink ),

    call263: call263Factory( config ),
    core: coreFactory( config ),
    grocRound: grocRoundFactory( config ),
    powertel: powertelFactory( config ),
    routers: routersFactory( config )

  } );

};

/******************************************************************************/