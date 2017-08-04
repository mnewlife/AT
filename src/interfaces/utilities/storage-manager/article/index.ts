/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as getParams from "../../../../interfaces/data-model/get-params/article/index";

import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

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
  ( filtrationCriteria : getParams.FiltrationCriteria , sortCriteria : getParams.SortCriteria , limit : number , forceThrow? : boolean ) : Promise<dataImplementations.ArticleModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( articleId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<dataImplementations.ArticleModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId : mongoose.Types.ObjectId;
  title : string;
  images : string[];
  tags : string[];
  content : string;
}

export interface AddBatch {
  ( articles : AddBatchParams[] , forceThrow? : boolean ) : Promise<dataImplementations.ArticleModel[]>;
}

export interface Add {
  ( userId : mongoose.Types.ObjectId , title : string , images : string[] , tags : string[] , content : string , forceThrow? : boolean ) : Promise<dataImplementations.ArticleModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId? : mongoose.Types.ObjectId;
  title? : string;
  images? : string[];
  tags? : string[];
  content? : string;
}

export interface Update {
  ( filtrationCriteria : getParams.FiltrationCriteria , details : UpdateDetails , forceThrow? : boolean ) : Promise<dataImplementations.ArticleModel[]>;
}

export interface UpdateById {
  ( articleId : mongoose.Types.ObjectId , details : UpdateDetails , forceThrow? : boolean ) : Promise<dataImplementations.ArticleModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria : getParams.FiltrationCriteria , forceThrow? : boolean ) : Promise<void>;
}

export interface RemoveById {
  ( articleId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<void>;
}

/******************************************************************************/
