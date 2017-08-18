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

  ( filtrationCriteria : dataModel.getParams.payment.FiltrationCriteria , sortCriteria : dataModel.getParams.payment.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( paymentId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  userId : string;
  channelId : string;
  transactionDetails : dataModel.TransactionDetails;
  transferDone : boolean;

}

export interface AddBatch {

  ( payments : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( userId : string , channelId : string , transactionDetails : dataModel.TransactionDetails , transferDone : boolean ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : dataModel.getParams.payment.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( paymentId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : dataModel.getParams.payment.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( paymentId : string ) : Promise<any>;

}

/******************************************************************************/
