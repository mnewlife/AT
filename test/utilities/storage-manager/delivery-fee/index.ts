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

  ( filtrationCriteria : interfaces.dataModel.getParams.deliveryFee.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.deliveryFee.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( deliveryFeeId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  userId : string;
  roundId : string;
  payment : interfaces.dataModel.DeliveryFeePaymentDetails;

}

export interface AddBatch {

  ( deliveryFees : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( userId : string , roundId : string , payment : interfaces.dataModel.DeliveryFeePaymentDetails ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : interfaces.dataModel.getParams.deliveryFee.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( deliveryFeeId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : interfaces.dataModel.getParams.deliveryFee.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( deliveryFeeId : string ) : Promise<any>;

}

/******************************************************************************/
