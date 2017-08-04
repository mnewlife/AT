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

  ( filtrationCriteria : interfaces.dataModel.getParams.subscription.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.subscription.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( subscriptionId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  userId : string;
  subscription : string;

}

export interface AddBatch {

  ( subscriptions : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( userId : string , subscription : string ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : interfaces.dataModel.getParams.subscription.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( subscriptionId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : interfaces.dataModel.getParams.subscription.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( subscriptionId : string ) : Promise<any>;

}

/******************************************************************************/
