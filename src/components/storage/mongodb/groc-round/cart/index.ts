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
import * as interfaces from "../../../interfaces/groc-round/cart";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.cart.Super>( emitEvent, "GrocRound|Cart" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.cart.Super, interfaces.Events>(

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

  "adminFeePercentage"?: { $gte?: number; $lte?: number; };
  "numProducts"?: { $gte?: number; $lte?: number; };
  "valueProducts"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.cart.FiltrationCriteria ): Promise<QueryConditions> {

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

    if ( filtrationCriteria.adminFeePercentage ) {
      conditions[ "adminFeePercentage" ] = {};
      if ( filtrationCriteria.adminFeePercentage.min ) {
        conditions[ "adminFeePercentage" ].$gte = filtrationCriteria.adminFeePercentage.min;
      }
      if ( filtrationCriteria.adminFeePercentage.max ) {
        conditions[ "adminFeePercentage" ].$lte = filtrationCriteria.adminFeePercentage.max;
      }
    }

    if ( filtrationCriteria.numProducts ) {
      conditions[ "numProducts" ] = {};
      if ( filtrationCriteria.numProducts.min ) {
        conditions[ "numProducts" ].$gte = filtrationCriteria.numProducts.min;
      }
      if ( filtrationCriteria.numProducts.max ) {
        conditions[ "numProducts" ].$lte = filtrationCriteria.numProducts.max;
      }
    }

    if ( filtrationCriteria.valueProducts ) {
      conditions[ "valueProducts" ] = {};
      if ( filtrationCriteria.valueProducts.min ) {
        conditions[ "valueProducts" ].$gte = filtrationCriteria.valueProducts.min;
      }
      if ( filtrationCriteria.valueProducts.max ) {
        conditions[ "valueProducts" ].$lte = filtrationCriteria.valueProducts.max;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.cart.SortCriteria ): Promise<string> {

  return new Promise<string>( ( resolve, reject ) => {
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
      adminFeePercentage: model.adminFeePercentage,
      numProducts: model.numProducts,
      valueProducts: model.valueProducts
    };

    if ( model.user.fullName ) {
      details.user.fullName = model.user.fullName;
    }

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.cart.UpdateDetails ): Promise<Model> {

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

    if ( details.adminFeePercentage ) {
      document.adminFeePercentage = details.adminFeePercentage;
    }

    if ( details.numProducts ) {
      document.numProducts = details.numProducts;
    }

    if ( details.valueProducts ) {
      document.valueProducts = details.valueProducts;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.cart.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.cart.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.cart.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.cart.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            user: {
              userId: model.user.userId.toHexString(),
              emailAddress: model.user.emailAddress
            },
            round: {
              roundId: model.round.roundId.toHexString(),
              roundName: model.round.roundName
            },
            adminFeePercentage: model.adminFeePercentage,
            numProducts: model.numProducts,
            valueProducts: model.valueProducts,
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