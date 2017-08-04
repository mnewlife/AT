/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface Emitter {

  got : ( params : any ) => any;
  getFailed : ( params : any ) => any;

  gotById : ( params : any ) => any;
  getByIdFailed : ( params : any ) => any;

  added : ( params : any ) => any;
  addFailed : ( params : any ) => any;

  updated : ( params : any ) => any;
  updateFailed : ( params : any ) => any;

  removed : ( params : any ) => any;
  removeFailed : ( params : any ) => any;

}

/******************************************************************************/

export interface Get {

  ( filtrationCriteria : interfaces.dataModel.getParams.invitation.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.invitation.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( invitationId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  inviterId : string;
  app : interfaces.AppName;
  invitees : interfaces.dataModel.Invitee[];

}

export interface AddBatch {

  ( invitations : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( inviterId : string , app : interfaces.AppName , invitees : interfaces.dataModel.Invitee[] ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : interfaces.dataModel.getParams.invitation.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( invitationId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : interfaces.dataModel.getParams.invitation.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( invitationId : string ) : Promise<any>;

}

/******************************************************************************/
