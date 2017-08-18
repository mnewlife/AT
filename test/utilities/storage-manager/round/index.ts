/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../src/index";

/******************************************************************************/

export interface Events {

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

  ( filtrationCriteria : dataModel.getParams.round.FiltrationCriteria , sortCriteria : dataModel.getParams.round.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( roundId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  roundName : string;
  duration : dataModel.RoundDuration;
  deliveryFee? : number;

}

export interface AddBatch {

  ( rounds : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( roundName : string , duration : dataModel.RoundDuration , deliveryFee? : number ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : dataModel.getParams.round.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( roundId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : dataModel.getParams.round.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( roundId : string ) : Promise<any>;

}

/******************************************************************************/
