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
import * as interfaces from "../../../interfaces/routers/new-router-stock";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.ClassInstance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.routers.newRouterStock.Super>( emitEvent, "Routers|NewRouterStock" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.routers.newRouterStock.Super, interfaces.Events>(

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
  "initialCount"?: { $gte?: number; $lte?: number; };
  "newCount"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.routers.newRouterStock.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.type ) {
      conditions[ "type" ] = filtrationCriteria.type;
    }
    
    if ( filtrationCriteria.initialCount ) {
      conditions[ "initialCount" ] = {};
      if ( filtrationCriteria.initialCount.min ) {
        conditions[ "initialCount" ].$gte = filtrationCriteria.initialCount.min;
      }
      if ( filtrationCriteria.initialCount.max ) {
        conditions[ "initialCount" ].$lte = filtrationCriteria.initialCount.max;
      }
    }
    
    if ( filtrationCriteria.newCount ) {
      conditions[ "newCount" ] = {};
      if ( filtrationCriteria.newCount.min ) {
        conditions[ "newCount" ].$gte = filtrationCriteria.newCount.min;
      }
      if ( filtrationCriteria.newCount.max ) {
        conditions[ "newCount" ].$lte = filtrationCriteria.newCount.max;
      }
    }
    
    if ( filtrationCriteria.amount ) {
      conditions[ "amount" ] = {};
      if ( filtrationCriteria.amount.min ) {
        conditions[ "amount" ].$gte = filtrationCriteria.amount.min;
      }
      if ( filtrationCriteria.amount.max ) {
        conditions[ "amount" ].$lte = filtrationCriteria.amount.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.routers.newRouterStock.SortCriteria ): Promise<string> {

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
      initialCount: model.initialCount,
      newCount: model.newCount,
      amount: model.amount
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.routers.newRouterStock.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.type ) {
      document.type = details.type;
    }
    
    if ( details.initialCount ) {
      document.initialCount = details.initialCount;
    }
    
    if ( details.newCount ) {
      document.newCount = details.newCount;
    }
    
    if ( details.amount ) {
      document.amount = details.amount;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.routers.newRouterStock.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.routers.newRouterStock.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.routers.newRouterStock.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            type: model.type,
            initialCount: model.initialCount,
            newCount: model.newCount,
            amount: model.amount,
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