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

  ( filtrationCriteria : dataModel.getParams.notification.FiltrationCriteria , sortCriteria : dataModel.getParams.notification.SortCriteria , limit : number ) : Promise<any>;

}

/******************************************************************************/

export interface GetById {

  ( notificationId : string ) : Promise<any>;

}

/******************************************************************************/

export interface AddBatchParams {

  userId : string;
  app : src.AppName;
  type : dataModel.NotificationType;
  label : string;

}

export interface AddBatch {

  ( notifications : AddBatchParams[] ) : Promise<any>;

}

export interface Add {

  ( userId : string , app : src.AppName , type : dataModel.NotificationType , label : string ) : Promise<any>;

}

/******************************************************************************/

export interface Update {

  ( filtrationCriteria : dataModel.getParams.notification.FiltrationCriteria , details : any ) : Promise<any>;

}

export interface UpdateById {

  ( notificationId : string , details : any ) : Promise<any>;

}

/******************************************************************************/

export interface Remove {

  ( filtrationCriteria : dataModel.getParams.notification.FiltrationCriteria ) : Promise<any>;

}

export interface RemoveById {

  ( notificationId : string ) : Promise<any>;

}

/******************************************************************************/
