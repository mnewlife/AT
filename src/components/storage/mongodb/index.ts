/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as mongoose from "mongoose";

import * as EventListener from "../../../event-listener/interfaces";
import * as DataStructures from "../../helpers/data-structures/interfaces";
import * as Moders from "../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";

import call263 from "./call-263";
import core from "./core";
import grocRound from "./groc-round";
import powertel from "./powertel";
import routers from "./routers";

/******************************************************************************/

export interface Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInfo extends UserInfo_Nuance, Document, mongoose.Document { }
export interface UserInfo_Nuance {
  userId: mongoose.Types.ObjectId;
  emailAddress: string;
  fullName: string;
}
export type UserInfo_Partial = Partial<UserInfo_Nuance>;

/******************************************************************************/

export default class MongoDB implements interfaces.ClassInstance {

  readonly core: interfaces.core.ClassInstance;
  readonly call263: interfaces.call263.ClassInstance;
  readonly grocRound: interfaces.grocRound.ClassInstance;
  readonly powertel: interfaces.powertel.ClassInstance;
  readonly routers: interfaces.routers.ClassInstance;

  readonly middleware: express.RequestHandler[] = [];
  private linkToDB = "";

  /*****************************************************************/

  constructor(
    emitEvent: EventListener.Emit,
    mapDetails: DataStructures.MapDetails,
    checkThrow: Moders.CheckThrow
  ) {

    this.connectToDatabase( this.linkToDB );

    this.core = core( emitEvent, mapDetails, checkThrow );
    this.call263 = call263( emitEvent, mapDetails, checkThrow );
    this.grocRound = grocRound( emitEvent, mapDetails, checkThrow );
    this.powertel = powertel( emitEvent, mapDetails, checkThrow );
    this.routers = routers( emitEvent, mapDetails, checkThrow );

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
