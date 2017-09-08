/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as eventListener from "../../../../../event-listener/interfaces";
import * as dataModel from "../../../../../data-model";
import * as dataStructures from "../../../../helpers/data-structures/interfaces";
import * as moders from "../../../../helpers/moders/interfaces";

import ModelController from "../../generic-model-class";
import Events from "../../generic-event-class";

import * as storage from "../../../interfaces";
import * as interfaces from "../../../interfaces/routers/amounts";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.routers.amounts.Super>( emitEvent, "Routers|Amounts" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.routers.amounts.Super, interfaces.Events>(

    models,
    MongooseModel,
    mapDetails,
    checkThrow,
    makeConditions,
    makeSortCriteria,
    generateAddDetails,
    generateUpdateDetails,
    convertToAbstract

    );

}

/******************************************************************************/

interface QueryConditions {
  "type"?: string;
  "count"?: { $gte?: number; $lte?: number; };
  "newStock"?: { $gte?: number; $lte?: number; };
  "sold"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.routers.amounts.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.type ) {
      conditions[ "type" ] = filtrationCriteria.type;
    }
    
    if ( filtrationCriteria.count ) {
      conditions[ "count" ] = {};
      if ( filtrationCriteria.count.min ) {
        conditions[ "count" ].$gte = filtrationCriteria.count.min;
      }
      if ( filtrationCriteria.count.max ) {
        conditions[ "count" ].$lte = filtrationCriteria.count.max;
      }
    }
    
    if ( filtrationCriteria.newStock ) {
      conditions[ "newStock" ] = {};
      if ( filtrationCriteria.newStock.min ) {
        conditions[ "newStock" ].$gte = filtrationCriteria.newStock.min;
      }
      if ( filtrationCriteria.newStock.max ) {
        conditions[ "newStock" ].$lte = filtrationCriteria.newStock.max;
      }
    }
    
    if ( filtrationCriteria.sold ) {
      conditions[ "sold" ] = {};
      if ( filtrationCriteria.sold.min ) {
        conditions[ "sold" ].$gte = filtrationCriteria.sold.min;
      }
      if ( filtrationCriteria.sold.max ) {
        conditions[ "sold" ].$lte = filtrationCriteria.sold.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.routers.amounts.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    sortString = sortCriteria.criteria;
    if ( sortCriteria.order === "Descending" ) {
      sortString = "-" + sortString;
    }
    resolve( sortString );
  } );

}

/******************************************************************************/

function generateAddDetails ( models: interfaces.AddDetails[] ): PartialModel[] {

  let returnDetails: PartialModel[] = [];

  models.forEach(( model ) => {

    let details: PartialModel = {
      type: model.type,
      count: model.count,
      newStock: model.newStock,
      sold: model.sold
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.routers.amounts.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.type ) {
      document.type = details.type;
    }
    
    if ( details.countPlus ) {
      document.count += details.countPlus;
    }
    if ( details.countMinus ) {
      document.count -= details.countMinus;
    }
    if ( details.count ) {
      document.count = details.count;
    }
    
    if ( details.newStockPlus ) {
      document.newStock += details.newStockPlus;
    }
    if ( details.newStockMinus ) {
      document.newStock -= details.newStockMinus;
    }
    if ( details.newStock ) {
      document.newStock = details.newStock;
    }
    
    if ( details.soldPlus ) {
      document.sold += details.soldPlus;
    }
    if ( details.soldMinus ) {
      document.sold -= details.soldMinus;
    }
    if ( details.sold ) {
      document.sold = details.sold;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.routers.amounts.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.routers.amounts.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.routers.amounts.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.routers.amounts.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            type: model.type,
            count: model.count,
            newStock: model.newStock,
            sold: model.sold,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };

          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/