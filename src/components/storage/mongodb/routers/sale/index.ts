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
import * as interfaces from "../../../interfaces/routers/sale";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.routers.sale.Super>( emitEvent, "Routers|Sale" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.routers.sale.Super, interfaces.Events>(

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
  "buyer.fullName"?: string;
  "buyer.emailAddress"?: string;
  "buyer.phoneNumber"?: string;

  "simCard.cardId"?: mongoose.Types.ObjectId;
  "simCard.mdn"?: number;

  "type"?: string;
  "paymentMethod"?: string;
  "unitCost"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };
  "totalCost"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.routers.sale.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.buyer ) {
      if ( filtrationCriteria.buyer.fullName ) {
        conditions[ "buyer.fullName" ] = filtrationCriteria.buyer.fullName;
      }
      if ( filtrationCriteria.buyer.emailAddress ) {
        conditions[ "buyer.emailAddress" ] = filtrationCriteria.buyer.emailAddress;
      }
      if ( filtrationCriteria.buyer.phoneNumber ) {
        conditions[ "buyer.phoneNumber" ] = filtrationCriteria.buyer.phoneNumber;
      }
    }
    
    if ( filtrationCriteria.simCard ) {
      if ( filtrationCriteria.simCard.cardId ) {
        conditions[ "simCard.cardId" ] = mongoose.Types.ObjectId( filtrationCriteria.simCard.cardId );
      }
      if ( filtrationCriteria.simCard.mdn ) {
        conditions[ "simCard.mdn" ] = filtrationCriteria.simCard.mdn;
      }
    }
    
    if ( filtrationCriteria.type ) {
      conditions[ "type" ] = filtrationCriteria.type;
    }
    
    if ( filtrationCriteria.paymentMethod ) {
      conditions[ "paymentMethod" ] = filtrationCriteria.paymentMethod;
    }
    
    if ( filtrationCriteria.unitCost ) {
      conditions[ "unitCost" ] = {};
      if ( filtrationCriteria.unitCost.min ) {
        conditions[ "unitCost" ].$gte = filtrationCriteria.unitCost.min;
      }
      if ( filtrationCriteria.unitCost.max ) {
        conditions[ "unitCost" ].$lte = filtrationCriteria.unitCost.max;
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
    
    if ( filtrationCriteria.totalCost ) {
      conditions[ "totalCost" ] = {};
      if ( filtrationCriteria.totalCost.min ) {
        conditions[ "totalCost" ].$gte = filtrationCriteria.totalCost.min;
      }
      if ( filtrationCriteria.totalCost.max ) {
        conditions[ "totalCost" ].$lte = filtrationCriteria.totalCost.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.routers.sale.SortCriteria ): Promise<string> {

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
      buyer: {
        fullName: model.buyer.fullName,
        emailAddress: model.buyer.emailAddress,
        phoneNumber: model.buyer.phoneNumber
      },
      type: model.type,
      paymentMethod: model.paymentMethod,
      unitCost: model.unitCost,
      amount: model.amount,
      totalCost: model.totalCost  
    };
    
    if ( model.simCard ) {
      details.simCard = {
        cardId: mongoose.Types.ObjectId( model.simCard.cardId ),
        mdn: model.simCard.mdn
      };
    }
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.routers.sale.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.buyer ) {
      if ( details.buyer.fullName ) {
        document.buyer.fullName = details.buyer.fullName;
      }
      if ( details.buyer.emailAddress ) {
        document.buyer.emailAddress = details.buyer.emailAddress;
      }
      if ( details.buyer.phoneNumber ) {
        document.buyer.phoneNumber = details.buyer.phoneNumber;
      }
    }
    
    if ( details.simCard ) {
      if ( details.simCard.cardId ) {
        document.simCard.cardId = mongoose.Types.ObjectId( details.simCard.cardId );
      }
      if ( details.simCard.mdn ) {
        document.simCard.mdn = details.simCard.mdn;
      }
    }
    
    if ( details.type ) {
      document.type = details.type;
    }
    
    if ( details.paymentMethod ) {
      document.paymentMethod = details.paymentMethod;
    }
    
    if ( details.unitCost ) {
      document.unitCost = details.unitCost;
    }
    
    if ( details.amount ) {
      document.amount = details.amount;
    }
    
    if ( details.totalCost ) {
      document.totalCost = details.totalCost;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.routers.sale.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.routers.sale.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.routers.sale.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.routers.sale.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            buyer: {
              fullName: model.buyer.fullName,
              emailAddress: model.buyer.emailAddress,
              phoneNumber: model.buyer.phoneNumber
            },
            type: model.type,
            paymentMethod: model.paymentMethod,
            unitCost: model.unitCost,
            amount: model.amount,
            totalCost: model.totalCost,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };
          
          if ( model.simCard ) {
            returnModel.simCard = {
              cardId : ( model.simCard.cardId as mongoose.Types.ObjectId ).toHexString(),
              mdn: model.simCard.mdn
            };
          }
          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/
