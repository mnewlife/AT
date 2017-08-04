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

  ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.track.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( trackId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  roundId : string;
  trackName : string;
  contributionValue : number;
  adminFeePercentage : number;
  installmentValues? : interfaces.dataModel.InstallmentValue[];

}

export interface AddBatch {

  ( tracks : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( roundId : string , trackName : string , contributionValue : number , adminFeePercentage? : number , installmentValues? : interfaces.dataModel.InstallmentValue[] ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( trackId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( trackId : string ) : Promise<any>;

}

/******************************************************************************/
