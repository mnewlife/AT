/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as authenticationManagerInterfaces from "../../../../../interfaces/utilities/authentication-manager";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

/******************************************************************************/

export interface Emitter {

}

/*
get, getOne,
add, addOne,
update, delete */

export interface Get {
  ( filtrationCriteria: , forceThrow?: boolean ): Promise<interfaces.dataModel.user.Admin>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
