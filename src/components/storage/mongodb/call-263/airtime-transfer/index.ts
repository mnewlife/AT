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
import * as interfaces from "../../../interfaces/call-263/airtime-transfer";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.call263.airtimeTransfer.Super>( emitEvent, "Call263|AirtimeTransfer" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.call263.airtimeTransfer.Super, interfaces.Events>(

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
  "userId"?: mongoose.Types.ObjectId;
  "channelId"?: mongoose.Types.ObjectId;
  "paymentId"?: mongoose.Types.ObjectId;

  "transfer.identifier"?: string;
  "transfer.amount"?: { $gte?: number; $lte?: number; };
  "transfer.paymentRecorded"?: boolean;

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.call263.airtimeTransfer.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.userId ) {
      conditions[ "userId" ] = mongoose.Types.ObjectId( filtrationCriteria.userId );
    }
    if ( filtrationCriteria.channelId ) {
      conditions[ "channelId" ] = mongoose.Types.ObjectId( filtrationCriteria.channelId );
    }
    if ( filtrationCriteria.paymentId ) {
      conditions[ "paymentId" ] = mongoose.Types.ObjectId( filtrationCriteria.paymentId );
    }
    
    if ( filtrationCriteria.transfer ) {
      if ( filtrationCriteria.transfer.identifier ) {
        conditions[ "transfer.identifier" ] = filtrationCriteria.transfer.identifier;
      }
      if ( filtrationCriteria.transfer.amount ) {
        conditions[ "transfer.amount" ] = {};
        if ( filtrationCriteria.transfer.amount.min ) {
          conditions[ "transfer.amount" ].$gte = filtrationCriteria.transfer.amount.min;
        }
        if ( filtrationCriteria.transfer.amount.max ) {
          conditions[ "transfer.amount" ].$lte = filtrationCriteria.transfer.amount.max;
        }
      }
      if ( filtrationCriteria.transfer.paymentRecorded ) {
        conditions[ "transfer.paymentRecorded" ] = filtrationCriteria.transfer.paymentRecorded;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.call263.airtimeTransfer.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    if ( sortCriteria.criteria === "amount" ) {
      sortString = "transfer.amount";
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

function generateAddDetails ( models: interfaces.AddDetails[] ): Partial<Model>[] {

  let returnDetails: Partial<Model>[] = [];

  models.forEach(( model ) => {

    let details: Partial<Model> = {
      userId: mongoose.Types.ObjectId( model.userId ),
      channelId: mongoose.Types.ObjectId( model.userId ),
      paymentId: mongoose.Types.ObjectId( model.userId ),
      transfer: {
        identifier: model.transfer.identifier,
        amount: model.transfer.amount,
        paymentRecorded: model.transfer.paymentRecorded
      }
    };
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.call263.airtimeTransfer.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.userId ) {
      document.userId = mongoose.Types.ObjectId( details.userId );
    }
    
    if ( details.channelId ) {
      document.channelId = mongoose.Types.ObjectId( details.channelId );
    }
    
    if ( details.paymentId ) {
      document.paymentId = mongoose.Types.ObjectId( details.paymentId );
    }
    
    if ( details.transfer ) {
      if ( details.transfer.identifier ) {
        document.transfer.identifier = details.transfer.identifier;
      }
      if ( details.transfer.amount ) {
        document.transfer.amount = details.transfer.amount;
      }
      if ( details.transfer.paymentRecorded ) {
        document.transfer.paymentRecorded = details.transfer.paymentRecorded;
      }
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.call263.airtimeTransfer.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.call263.airtimeTransfer.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.call263.airtimeTransfer.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.call263.airtimeTransfer.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            userId: ( <mongoose.Types.ObjectId>model.userId ).toHexString(),
            channelId: ( <mongoose.Types.ObjectId>model.channelId ).toHexString(),
            paymentId: ( <mongoose.Types.ObjectId>model.paymentId ).toHexString(),
            transfer: {
              identifier: model.transfer.identifier,
              amount: model.transfer.amount,
              paymentRecorded: model.transfer.paymentRecorded
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