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
import * as interfaces from "../../../interfaces/powertel/card";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.powertel.card.Super>( emitEvent, "Powertel|Card" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.powertel.card.Super, interfaces.Events>(

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
  "pin"?: number;
  "puk"?: number;
  "mdn"?: number;

  "buyer.cardSaleId"?: mongoose.Types.ObjectId;
  "buyer.fullName"?: string;

  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.powertel.card.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.pin ) {
      conditions[ "pin" ] = filtrationCriteria.pin;
    }

    if ( filtrationCriteria.puk ) {
      conditions[ "puk" ] = filtrationCriteria.puk;
    }

    if ( filtrationCriteria.mdn ) {
      conditions[ "mdn" ] = filtrationCriteria.mdn;
    }

    if ( filtrationCriteria.buyer ) {
      if ( filtrationCriteria.buyer.cardSaleId ) {
        conditions[ "buyer.cardSaleId" ] = mongoose.Types.ObjectId( filtrationCriteria.buyer.cardSaleId );
      }
      if ( filtrationCriteria.buyer.fullName ) {
        conditions[ "buyer.fullName" ] = filtrationCriteria.buyer.fullName;
      }
    }

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

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.powertel.card.SortCriteria ): Promise<string> {

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
      pin: model.pin,
      puk: model.puk,
      mdn: model.mdn
    };
    if ( model.buyer ) {
      details.buyer = {
        cardSaleId: mongoose.Types.ObjectId( model.buyer.cardSaleId ),
        fullName: model.buyer.fullName
      };
    }
    if ( model.user ) {
      details.user = {
        userId: mongoose.Types.ObjectId( model.user.userId ),
        emailAddress: model.user.emailAddress,
        fullName: model.user.fullName
      };
    }
    
    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.powertel.card.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.pin ) {
      document.pin = details.pin;
    }

    if ( details.puk ) {
      document.puk = details.puk;
    }

    if ( details.mdn ) {
      document.mdn = details.mdn;
    }

    if ( details.buyer ) {
      if ( details.buyer.cardSaleId ) {
        document.buyer.cardSaleId = mongoose.Types.ObjectId( details.buyer.cardSaleId );
      }
      if ( details.buyer.fullName ) {
        document.buyer.fullName = details.buyer.fullName;
      }
    }

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

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.powertel.card.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.powertel.card.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.powertel.card.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.powertel.card.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            pin: model.pin,
            puk: model.puk,
            mdn: model.mdn,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };
          if ( model.buyer ) {
            returnModel.buyer = {
              cardSaleId: ( model.buyer.cardSaleId as mongoose.Types.ObjectId ).toHexString(),
              fullName: model.buyer.fullName
            };
          }
          if ( model.user ) {
            returnModel.user = {
              userId: ( model.user.userId as mongoose.Types.ObjectId ).toHexString(),
              emailAddress: model.user.emailAddress,
              fullName: model.user.fullName
            };
          }
          
          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/