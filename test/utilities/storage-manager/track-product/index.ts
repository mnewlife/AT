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

  ( filtrationCriteria : dataModel.getParams.trackProduct.FiltrationCriteria , sortCriteria : dataModel.getParams.trackProduct.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( productId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  trackId : string;
  productId : string;
  quantity : number;
  price : number;

}

export interface AddBatch {

  ( products : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( trackId : string , productId : string , quantity : number , price : number ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : dataModel.getParams.trackProduct.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( productId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : dataModel.getParams.trackProduct.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( productId : string ) : Promise<any>;

}

/******************************************************************************/
