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
import * as interfaces from "../../../interfaces/call-263/airtime-payment";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.call263.airtimePayment.Super>( emitEvent, "Call263|AirtimePayment" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.call263.airtimePayment.Super, interfaces.Events>(

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
  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;

  "channelId"?: mongoose.Types.ObjectId;

  "transaction.identifier"?: string;
  "transaction.method"?: string;
  "transaction.amount"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.call263.airtimePayment.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.user ) {
      if ( filtrationCriteria.user.userId ) {
        conditions[ "user.userId" ] = mongoose.Types.ObjectId( filtrationCriteria.user.userId );
      }
      if ( filtrationCriteria.user.emailAddress ) {
        conditions[ "user.emailAddress" ] = filtrationCriteria.user.emailAddress;
      }
      if ( filtrationCriteria.user.fullName ) {
        conditions[ "user.fullName" ] = filtrationCriteria.user.fullName;
      }
    }
    
    if ( filtrationCriteria.channelId ) {
      conditions[ "channelId" ] = mongoose.Types.ObjectId( filtrationCriteria.channelId );
    }
    
    if ( filtrationCriteria.transaction ) {
      if ( filtrationCriteria.transaction.identifier ) {
        conditions[ "transaction.identifier" ] = filtrationCriteria.transaction.identifier;
      }
      if ( filtrationCriteria.transaction.amount ) {
        conditions[ "transaction.amount" ] = {};
        if ( filtrationCriteria.transaction.amount.min ) {
          conditions[ "transaction.amount" ].$gte = filtrationCriteria.transaction.amount.min;
        }
        if ( filtrationCriteria.transaction.amount.max ) {
          conditions[ "transaction.amount" ].$lte = filtrationCriteria.transaction.amount.max;
        }
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.call263.airtimePayment.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    if ( sortCriteria.criteria === "amount" ) {
      sortString = "transaction.amount";
    } else {
      sortString = sortCriteria.criteria;
    }
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
      user: {
        userId: mongoose.Types.ObjectId( model.user.userId ),
        emailAddress: model.user.emailAddress,
        fullName: model.user.fullName
      },
      channelId: mongoose.Types.ObjectId( model.channelId ),
      transaction: {
        identifier: model.transaction.identifier,
        amount: model.transaction.amount,
        method: model.transaction.method,
      }
    };
    

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.call263.airtimePayment.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.user ) {
      if ( details.user.userId ) {
        document.user.userId = mongoose.Types.ObjectId( details.user.userId );
      }
      if ( details.user.emailAddress ) {
        document.user.emailAddress = details.user.emailAddress;
      }
      if ( details.user.fullName ) {
        document.user.fullName = details.user.fullName;
      }
    }
    
    if ( details.channelId ) {
      document.channelId = mongoose.Types.ObjectId( details.channelId );
    }
    
    if ( details.transaction ) {
      if ( details.transaction.identifier ) {
        document.transaction.identifier = details.transaction.identifier;
      }
      if ( details.transaction.amount ) {
        document.transaction.amount = details.transaction.amount;
      }
      if ( details.transaction.method ) {
        document.transaction.method = details.transaction.method;
      }
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.call263.airtimePayment.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.call263.airtimePayment.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.call263.airtimePayment.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.call263.airtimePayment.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            user: {
              userId: ( model.user.userId as mongoose.Types.ObjectId ).toHexString(),
              emailAddress: model.user.emailAddress,
              fullName: model.user.fullName
            },
            channelId: ( model.channelId as mongoose.Types.ObjectId ).toHexString(),
            transaction: {
              identifier: model.transaction.identifier,
              amount: model.transaction.amount,
              method: model.transaction.method
            },
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