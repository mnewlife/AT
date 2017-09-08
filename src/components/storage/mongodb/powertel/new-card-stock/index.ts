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
import * as interfaces from "../../../interfaces/powertel/new-card-stock";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.powertel.newCardStock.Super>( emitEvent, "Powertel|NewCardStock" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.powertel.newCardStock.Super, interfaces.Events>(

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
  "mdnRange.min"?: { $gte?: number; $lte?: number; };
  "mdnRange.max"?: { $gte?: number; $lte?: number; };

  "initialCount"?: { $gte?: number; $lte?: number; };
  "newCount"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.powertel.newCardStock.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.mdnRange ) {
      if ( filtrationCriteria.mdnRange.min ) {
        conditions[ "mdnRange.min" ] = {};
        if ( filtrationCriteria.mdnRange.min.min ) {
          conditions[ "mdnRange.min" ].$gte = filtrationCriteria.mdnRange.min.min;
        }
        if ( filtrationCriteria.mdnRange.min.max ) {
          conditions[ "mdnRange.min" ].$lte = filtrationCriteria.mdnRange.min.max;
        }
      }
      if ( filtrationCriteria.mdnRange.min ) {
        conditions[ "mdnRange.min" ] = {};
        if ( filtrationCriteria.mdnRange.max.min ) {
          conditions[ "mdnRange.max" ].$gte = filtrationCriteria.mdnRange.max.min;
        }
        if ( filtrationCriteria.mdnRange.max.max ) {
          conditions[ "mdnRange.max" ].$lte = filtrationCriteria.mdnRange.max.max;
        }
      }
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

function makeSortCriteria ( sortCriteria: storage.powertel.newCardStock.SortCriteria ): Promise<string> {

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
      initialCount: model.initialCount,
      newCount: model.newCount,
      amount: model.amount
    };

    if ( model.mdnRange ) {
      details.mdnRange = {
        min: model.mdnRange.min,
        max: model.mdnRange.max
      };
    }
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.powertel.newCardStock.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.mdnRange ) {
      if ( details.mdnRange.min ) {
        document.mdnRange.min = details.mdnRange.min;
      }
      if ( details.mdnRange.max ) {
        document.mdnRange.max = details.mdnRange.max;
      }
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

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.powertel.newCardStock.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.powertel.newCardStock.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.powertel.newCardStock.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.powertel.newCardStock.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            initialCount: model.initialCount,
            newCount: model.newCount,
            amount: model.amount,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };
        
          if ( model.mdnRange ) {
            returnModel.mdnRange = {
              min: model.mdnRange.min,
              max: model.mdnRange.max
            }
          }
          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/