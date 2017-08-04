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

  ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.roundContributor.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( contributorId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  roundName : string;
  userId : string;

}

export interface AddBatch {

  ( contributors : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( roundId : string , userId : string ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( contributorId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( contributorId : string ) : Promise<any>;

}

/******************************************************************************/
