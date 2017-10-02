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
import * as interfaces from "../../../interfaces/groc-round/cart-product";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.cartProduct.Super>( emitEvent, "GrocRound|CartProduct" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.cartProduct.Super, interfaces.Events>(

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

  "cartId"?: mongoose.Types.ObjectId;

  "product.productId"?: mongoose.Types.ObjectId;
  "product.label"?: string;
  "product.quantity"?: { $gte?: number; $lte?: number; };
  "product.value"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.cartProduct.FiltrationCriteria ): Promise<QueryConditions> {

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

    if ( filtrationCriteria.cartId ) {
      conditions[ "cartId" ] = mongoose.Types.ObjectId( filtrationCriteria.cartId );
    }

    if ( filtrationCriteria.product ) {

      if ( filtrationCriteria.product.productId ) {
        conditions[ "product.productId" ] = mongoose.Types.ObjectId( filtrationCriteria.product.productId );
      }

      if ( filtrationCriteria.product.label ) {
        conditions[ "product.label" ] = filtrationCriteria.product.label;
      }

      if ( filtrationCriteria.product.quantity ) {
        conditions[ "product.quantity" ] = {};
        if ( filtrationCriteria.product.quantity.min ) {
          conditions[ "product.quantity" ].$gte = filtrationCriteria.product.quantity.min;
        }
        if ( filtrationCriteria.product.quantity.max ) {
          conditions[ "product.quantity" ].$lte = filtrationCriteria.product.quantity.max;
        }
      }

      if ( filtrationCriteria.product.value ) {
        conditions[ "product.value" ] = {};
        if ( filtrationCriteria.product.value.min ) {
          conditions[ "product.value" ].$gte = filtrationCriteria.product.value.min;
        }
        if ( filtrationCriteria.product.value.max ) {
          conditions[ "product.value" ].$lte = filtrationCriteria.product.value.max;
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

function makeSortCriteria ( sortCriteria: storage.grocRound.cartProduct.SortCriteria ): Promise<string> {

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
      cartId: mongoose.Types.ObjectId( model.cartId ),
      product: {
        productId: mongoose.Types.ObjectId( model.product.productId ),
        label: model.product.label,
        quantity: model.product.quantity,
        value: model.product.value
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

function generateUpdateDetails ( document: Model, details: storage.grocRound.cartProduct.UpdateDetails ): Promise<Model> {

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

    if ( details.cartId ) {
      document.cartId = mongoose.Types.ObjectId( details.cartId );
    }

    if ( details.product ) {

      if ( details.product.productId ) {
        document.product.productId = mongoose.Types.ObjectId( details.product.productId );
      }

      if ( details.product.label ) {
        document.product.label = details.product.label;
      }

      if ( details.product.quantity ) {
        document.product.quantity = details.product.quantity;
      }

      if ( details.product.value ) {
        document.product.value = details.product.value;
      }

    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.cartProduct.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.cartProduct.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.cartProduct.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.cartProduct.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            user: {
              userId: model.user.userId.toHexString(),
              emailAddress: model.user.emailAddress
            },
            round: {
              roundId: model.round.roundId.toHexString(),
              roundName: model.round.roundName
            },
            cartId: model.cartId.toHexString(),
            product: {
              productId: model.product.productId.toHexString(),
              label: model.product.label,
              quantity: model.product.quantity,
              value: model.product.value
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