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
import * as interfaces from "../../../interfaces/powertel/new-airtime-stock";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.powertel.newAirtimeStock.Super>( emitEvent, "Powertel|NewAirtimeStock" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.powertel.newAirtimeStock.Super, interfaces.Events>(

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
  "initialBalance"?: { $gte?: number; $lte?: number; };
  "newBalance"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.powertel.newAirtimeStock.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.initialBalance ) {
      conditions[ "initialBalance" ] = {};
      if ( filtrationCriteria.initialBalance.min ) {
        conditions[ "initialBalance" ].$gte = filtrationCriteria.initialBalance.min;
      }
      if ( filtrationCriteria.initialBalance.max ) {
        conditions[ "initialBalance" ].$lte = filtrationCriteria.initialBalance.max;
      }
    }
    
    if ( filtrationCriteria.newBalance ) {
      conditions[ "newBalance" ] = {};
      if ( filtrationCriteria.newBalance.min ) {
        conditions[ "newBalance" ].$gte = filtrationCriteria.newBalance.min;
      }
      if ( filtrationCriteria.newBalance.max ) {
        conditions[ "newBalance" ].$lte = filtrationCriteria.newBalance.max;
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

function makeSortCriteria ( sortCriteria: storage.powertel.newAirtimeStock.SortCriteria ): Promise<string> {

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
      initialBalance: model.initialBalance,
      newBalance: model.newBalance,
      amount: model.amount
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.powertel.newAirtimeStock.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.initialBalance ) {
      document.initialBalance = details.initialBalance;
    }
    
    if ( details.newBalance ) {
      document.newBalance = details.newBalance;
    }
    
    if ( details.amount ) {
      document.amount = details.amount;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.powertel.newAirtimeStock.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.powertel.newAirtimeStock.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.powertel.newAirtimeStock.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            initialBalance: model.initialBalance,
            newBalance: model.newBalance,
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
