/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  got: ( params: any ) => any;
  getFailed: ( params: any ) => any;

  gotById: ( params: any ) => any;
  getByIdFailed: ( params: any ) => any;

  added: ( params: any ) => any;
  addFailed: ( params: any ) => any;

  updated: ( params: any ) => any;
  updateFailed: ( params: any ) => any;

  removed: ( params: any ) => any;
  removeFailed: ( params: any ) => any;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: interfaces.dataModel.getParams.invitation.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.invitation.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.InvitationModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( invitationId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.InvitationModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  inviterId: mongoose.Types.ObjectId;
  app: interfaces.AppName;
  invitees: interfaces.dataModel.Invitee[];
}

export interface AddBatch {
  ( invitations: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.InvitationModel[]>;
}

export interface Add {
  ( inviterId: mongoose.Types.ObjectId, app: interfaces.AppName, invitees: interfaces.dataModel.Invitee[], forceThrow?: boolean ): Promise<dataImplementations.InvitationModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  inviterId?: mongoose.Types.ObjectId;
  app?: interfaces.AppName;
  invitees?: interfaces.dataModel.Invitee[];
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.invitation.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.InvitationModel[]>;
}

export interface UpdateById {
  ( invitationId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.InvitationModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.invitation.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( invitationId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
