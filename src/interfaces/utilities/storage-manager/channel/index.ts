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
  ( filtrationCriteria: interfaces.dataModel.getParams.channel.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.ChannelModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( channelId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.ChannelModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  channelDetails: interfaces.dataModel.ChannelDetails;
}

export interface AddBatch {
  ( channels: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.ChannelModel[]>;
}

export interface Add {
  ( channelDetails: interfaces.dataModel.ChannelDetails, forceThrow?: boolean ): Promise<dataImplementations.ChannelModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  allocated?: boolean;
  allocatedTo?: mongoose.Types.ObjectId;
  channelDetails?: {
    code?: string;
    phoneNumber?: string;
    password?: string
  };
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.channel.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ChannelModel[]>;
}

export interface UpdateById {
  ( channelId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ChannelModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.channel.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( channelId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
