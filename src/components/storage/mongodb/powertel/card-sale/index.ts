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
import * as interfaces from "../../../interfaces/powertel/card-sale";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.powertel.cardSale.Super>( emitEvent, "Powertel|CardSale" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.powertel.cardSale.Super, interfaces.Events>(

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
  "cardId"?: mongoose.Types.ObjectId;
  "mdn"?: number;
  "cost"?: number;
  "conditions.withRouter"?: boolean;
  "conditions.routerType"?: string;
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.powertel.cardSale.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.cardId ) {
      conditions[ "cardId" ] = mongoose.Types.ObjectId( filtrationCriteria.cardId );
    }
    
    if ( filtrationCriteria.mdn ) {
      conditions[ "mdn" ] = filtrationCriteria.mdn;
    }
    
    if ( filtrationCriteria.cost ) {
      conditions[ "cost" ] = filtrationCriteria.cost;
    }
    
    if ( filtrationCriteria.conditions ) {
      if ( filtrationCriteria.conditions.withRouter ) {
        conditions[ "conditions.withRouter" ] = filtrationCriteria.conditions.withRouter;
      }
      if ( filtrationCriteria.conditions.routerType ) {
        conditions[ "conditions.routerType" ] = filtrationCriteria.conditions.routerType;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.powertel.cardSale.SortCriteria ): Promise<string> {

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
      cardId: mongoose.Types.ObjectId( model.cardId ),
      mdn: model.mdn,
      cost: model.cost
    };
    if ( model.conditions ) {
      details.conditions = {};
      if ( model.conditions.withRouter ) {
        details.conditions.withRouter = model.conditions.withRouter;
      }
      if ( model.conditions.routerType ) {
        details.conditions.routerType = model.conditions.routerType;
      }
    }
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.powertel.cardSale.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.cardId ) {
      document.cardId = mongoose.Types.ObjectId( details.cardId );
    }
    
    if ( details.mdn ) {
      document.mdn = details.mdn;
    }
    
    if ( details.cost ) {
      document.cost = details.cost;
    }
    
    if ( details.conditions ) {
      if ( details.conditions.withRouter ) {
        document.conditions.withRouter = details.conditions.withRouter;
      }
      if ( details.conditions.routerType ) {
        document.conditions.routerType = details.conditions.routerType;
      }
    }
    
    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.powertel.cardSale.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.powertel.cardSale.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.powertel.cardSale.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.powertel.cardSale.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            cardId: ( model.cardId as mongoose.Types.ObjectId ).toHexString(),
            mdn: model.mdn,
            cost: model.cost,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };
          if ( model.conditions ) {
            returnModel.conditions = {};
            if ( model.conditions.withRouter ) {
              returnModel.conditions.withRouter = model.conditions.withRouter;
            }
            if ( model.conditions.routerType ) {
              returnModel.conditions.routerType = model.conditions.routerType;
            }
          }
          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/
