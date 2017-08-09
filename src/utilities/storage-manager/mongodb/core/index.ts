/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";

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

class Core implements interfaces.utilities.storageManager.Core {

  readonly event: storageManagerInterfaces.core.Event;
  readonly user: storageManagerInterfaces.core.User;

  /*****************************************************************/

  constructor( params: {
    event: storageManagerInterfaces.core.Event;
    user: storageManagerInterfaces.core.User;
  } ) {

    this.event = params.event;
    this.user = params.user;

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.storageManager.Core => {

  let commonParams = ( {
    emitEvent: config.eventManager.emit,
    mapDetails: config.utilities.sharedLogic.dataStructures.mapDetails,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
  } );

  return new Core( {
    event: eventFactory( commonParams ),
    user: userFactory( commonParams )
  } );

};

/******************************************************************************/
