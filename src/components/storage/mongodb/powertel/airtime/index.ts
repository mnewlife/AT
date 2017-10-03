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
import * as interfaces from "../../../interfaces/powertel/airtime";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.powertel.airtime.Super>( emitEvent, "Powertel|Airtime" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.powertel.airtime.Super, interfaces.Events>(

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
  "checkpoint"?: { $gte?: Date; $lte?: Date; };
  "newStockValue"?: { $gte?: number; $lte?: number; };
  "amountSold"?: { $gte?: number; $lte?: number; };
  "balance"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.powertel.airtime.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.checkpoint ) {
      conditions[ "checkpoint" ] = {};
      if ( filtrationCriteria.checkpoint.min ) {
        conditions[ "checkpoint" ].$gte = filtrationCriteria.checkpoint.min;
      }
      if ( filtrationCriteria.checkpoint.max ) {
        conditions[ "checkpoint" ].$lte = filtrationCriteria.checkpoint.max;
      }
    }
    
    if ( filtrationCriteria.newStockValue ) {
      conditions[ "newStockValue" ] = {};
      if ( filtrationCriteria.newStockValue.min ) {
        conditions[ "newStockValue" ].$gte = filtrationCriteria.newStockValue.min;
      }
      if ( filtrationCriteria.newStockValue.max ) {
        conditions[ "newStockValue" ].$lte = filtrationCriteria.newStockValue.max;
      }
    }
    
    if ( filtrationCriteria.amountSold ) {
      conditions[ "amountSold" ] = {};
      if ( filtrationCriteria.amountSold.min ) {
        conditions[ "amountSold" ].$gte = filtrationCriteria.amountSold.min;
      }
      if ( filtrationCriteria.amountSold.max ) {
        conditions[ "amountSold" ].$lte = filtrationCriteria.amountSold.max;
      }
    }
    
    if ( filtrationCriteria.balance ) {
      conditions[ "balance" ] = {};
      if ( filtrationCriteria.balance.min ) {
        conditions[ "balance" ].$gte = filtrationCriteria.balance.min;
      }
      if ( filtrationCriteria.balance.max ) {
        conditions[ "balance" ].$lte = filtrationCriteria.balance.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.powertel.airtime.SortCriteria ): Promise<string> {

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

function generateAddDetails ( models: interfaces.AddDetails[] ): Partial<Model>[] {

  let returnDetails: Partial<Model>[] = [];

  models.forEach(( model ) => {

    let details: Partial<Model> = {
      checkpoint: model.checkpoint,
      newStockValue: model.newStockValue,
      amountSold: model.amountSold,
      balance: model.balance
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.powertel.airtime.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.checkpoint ) {
      document.checkpoint = details.checkpoint;
    }
    
    if ( details.newStockValuePlus ) {
      document.newStockValue += details.newStockValuePlus;
    }
    if ( details.newStockValueMinus ) {
      document.newStockValue -= details.newStockValueMinus;
    }
    if ( details.newStockValue ) {
      document.newStockValue = details.newStockValue;
    }
    
    if ( details.amountSoldPlus ) {
      document.amountSold += details.amountSoldPlus;
    }
    if ( details.amountSoldMinus ) {
      document.amountSold -= details.amountSoldMinus;
    }
    if ( details.amountSold ) {
      document.amountSold = details.amountSold;
    }
    
    if ( details.balancePlus ) {
      document.balance += details.balancePlus;
    }
    if ( details.balanceMinus ) {
      document.balance -= details.balanceMinus;
    }
    if ( details.balance ) {
      document.balance = details.balance;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.powertel.airtime.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.powertel.airtime.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.powertel.airtime.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.powertel.airtime.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            checkpoint: model.checkpoint,
            newStockValue: model.newStockValue,
            amountSold: model.amountSold,
            balance: model.balance,
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