/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageInterfaces from "../../../../interfaces/components/storage";

import eventFactory from "./event";
import userFactory from "./user";

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

class Core implements interfaces.components.storage.Core {

  readonly event: storageInterfaces.core.Event;
  readonly user: storageInterfaces.core.User;

  /*****************************************************************/

  constructor( params: {
    event: storageInterfaces.core.Event;
    user: storageInterfaces.core.User;
  } ) {

    this.event = params.event;
    this.user = params.user;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.storage.Core => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.components.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.components.sharedLogic.moders.checkThrow
  } );

  return new Core( {
    event: eventFactory( commonParams ),
    user: userFactory( commonParams )
  } );

};

/******************************************************************************/
