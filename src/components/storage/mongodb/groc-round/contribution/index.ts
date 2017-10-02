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
import * as interfaces from "../../../interfaces/groc-round/contribution";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.contribution.Super>( emitEvent, "GrocRound|Contribution" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.contribution.Super, interfaces.Events>(

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

  "round.roundId"?: mongoose.Types.ObjectId;
  "round.roundName"?: string;

  "payment.identifier"?: string;
  "payment.amount"?: { $gte?: number; $lte?: number; };
  "payment.method"?: string;

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.contribution.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>( ( resolve, reject ) => {

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

    if ( filtrationCriteria.round ) {

      if ( filtrationCriteria.round.roundId ) {
        conditions[ "round.roundId" ] = mongoose.Types.ObjectId( filtrationCriteria.round.roundId );
      }

      if ( filtrationCriteria.round.roundName ) {
        conditions[ "round.roundName" ] = filtrationCriteria.round.roundName;
      }

    }

    if ( filtrationCriteria.payment ) {

      if ( filtrationCriteria.payment.identifier ) {
        conditions[ "payment.identifier" ] = filtrationCriteria.payment.identifier;
      }

      if ( filtrationCriteria.payment.amount ) {
        conditions[ "payment.amount" ] = {};
        if ( filtrationCriteria.payment.amount.min ) {
          conditions[ "payment.amount" ].$gte = filtrationCriteria.payment.amount.min;
        }
        if ( filtrationCriteria.payment.amount.max ) {
          conditions[ "payment.amount" ].$lte = filtrationCriteria.payment.amount.max;
        }
      }

      if ( filtrationCriteria.payment.method ) {
        conditions[ "payment.method" ] = filtrationCriteria.payment.method;
      }

    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.contribution.SortCriteria ): Promise<string> {

  return new Promise<string>( ( resolve, reject ) => {
    let sortString;
    sortString = sortCriteria.criteria;
    if ( sortCriteria.criteria == "amount" ) {
      sortString = "payment.amount";
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

  models.forEach( ( model ) => {

    let details: Partial<Model> = {
      user: {
        userId: mongoose.Types.ObjectId( model.user.userId ),
        emailAddress: model.user.emailAddress
      },
      round: {
        roundId: mongoose.Types.ObjectId( model.round.roundId ),
        roundName: model.round.roundName
      },
      payment: {
        identifier: model.payment.identifier,
        amount: model.payment.amount,
        method: model.payment.method
      }
    };

    if ( model.user.fullName ) {
      details.user.fullName = model.user.fullName;
    }

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.contribution.UpdateDetails ): Promise<Model> {

  return new Promise<Model>( ( resolve, reject ) => {

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

    if ( details.round ) {

      if ( details.round.roundId ) {
        document.round.roundId = mongoose.Types.ObjectId( details.round.roundId );
      }

      if ( details.round.roundName ) {
        document.round.roundName = details.round.roundName;
      }

    }

    if ( details.payment ) {

      if ( details.payment.identifier ) {
        document.payment.identifier = details.payment.identifier;
      }

      if ( details.payment.amount ) {
        document.payment.amount = details.payment.amount;
      }

      if ( details.payment.method ) {
        document.payment.method = details.payment.method;
      }

    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.contribution.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.contribution.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.contribution.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.contribution.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            user: {
              userId: model.user.userId.toHexString(),
              emailAddress: model.user.emailAddress
            },
            round: {
              roundId: model.round.roundId.toHexString(),
              roundName: model.round.roundName
            },
            payment: {
              identifier: model.payment.identifier,
              amount: model.payment.amount,
              method: model.payment.method
            },
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };

          if ( model.user.fullName ) {
            returnModel.user.fullName = model.user.fullName;
          }

          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/