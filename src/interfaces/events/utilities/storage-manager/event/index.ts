/******************************************************************************/

import * as express from "express";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../../interfaces/index";
import * as dataImplementations from "../../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

type context = "StorageEvent";

/******************************************************************************/

export interface Got extends interfaces.dataModel.Happening {
  context : context;
  identifier : "Got";
  data : {
    filtrationCriteria : any;
    sortCriteria : any;
    limit : number;
    numDocuments : number;
  };
}

export interface GetFailed extends interfaces.dataModel.Happening {
  context : context;
  identifier : "GetFailed";
  data : {
    filtrationCriteria : any;
    sortCriteria : any;
    limit : number;
    reason : any
  };
}

/******************************************************************************/

export interface GotById extends interfaces.dataModel.Happening {
  context : context;
  identifier : "GotById";
  data : {
    id : mongoose.Types.ObjectId;
  };
}

export interface GetByIdFailed extends interfaces.dataModel.Happening {
  context : context;
  identifier : "GetByIdFailed";
  data : {
    id : mongoose.Types.ObjectId;
    reason : any
  };
}

/******************************************************************************/

export interface Added extends interfaces.dataModel.Happening {
  context : context;
  identifier : "Added";
  data : {
    document : dataImplementations.EventModel;
  };
}

export interface AddFailed extends interfaces.dataModel.Happening {
  context : context;
  identifier : "AddFailed";
  data : {
    details : any;
    reason : any
  };
}

/******************************************************************************/

export interface Updated extends interfaces.dataModel.Happening {
  context : context;
  identifier : "Updated";
  data : {
    id? : mongoose.Types.ObjectId;
    conditions? : any;
    document : dataImplementations.EventModel;
  };
}

export interface UpdateFailed extends interfaces.dataModel.Happening {
  context : context;
  identifier : "UpdateFailed";
  data : {
    id? : mongoose.Types.ObjectId;
    conditions? : any;
    details : any;
    reason : any
  };
}

/******************************************************************************/

export interface Removed extends interfaces.dataModel.Happening {
  context : context;
  identifier : "Removed";
  data : {
    id? : mongoose.Types.ObjectId;
    conditions? : any;
  };
}

export interface RemoveFailed extends interfaces.dataModel.Happening {
  context : context;
  identifier : "RemoveFailed";
  data : {
    id? : mongoose.Types.ObjectId;
    conditions? : any;
    reason : any
  };
}

/******************************************************************************/
