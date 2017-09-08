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
import * as interfaces from "../../../interfaces/powertel/airtime-sale";

import { Model, PartialModel, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.powertel.airtimeSale.Super>( emitEvent, "Powertel|AirtimeSale" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.powertel.airtimeSale.Super, interfaces.Events>(

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
  "buyerName"?: string;
  "card.cardId"?: mongoose.Types.ObjectId;
  "card.mdn"?: { $gte?: number; $lte?: number; };

  "user.userId"?: mongoose.Types.ObjectId;
  "user.emailAddress"?: string;
  "user.fullName"?: string;

  "amount"?: { $gte?: number; $lte?: number; };

  "bundles.gb"?: { $gte?: number; $lte?: number; };
  "bundles.days"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.powertel.airtimeSale.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.buyerName ) {
      conditions[ "buyerName" ] = filtrationCriteria.buyerName;
    }

    if ( filtrationCriteria.card ) {
      if ( filtrationCriteria.card.cardId ) {
        conditions[ "card.cardId" ] = mongoose.Types.ObjectId( filtrationCriteria.card.cardId );
      }
      if ( filtrationCriteria.card.mdn ) {
        conditions[ "card.mdn" ] = {};
        if ( filtrationCriteria.card.mdn.min ) {
          conditions[ "card.mdn" ].$gte = filtrationCriteria.card.mdn.min;
        }
        if ( filtrationCriteria.card.mdn.max ) {
          conditions[ "card.mdn" ].$lte = filtrationCriteria.card.mdn.max;
        }
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

    if ( filtrationCriteria.bundles ) {
      if ( filtrationCriteria.bundles.gb ) {
        conditions[ "bundles.gb" ] = {};
        if ( filtrationCriteria.bundles.gb.min ) {
          conditions[ "bundles.gb" ].$gte = filtrationCriteria.bundles.gb.min;
        }
        if ( filtrationCriteria.bundles.gb.max ) {
          conditions[ "bundles.gb" ].$lte = filtrationCriteria.bundles.gb.max;
        }
      }
      if ( filtrationCriteria.bundles.days ) {
        conditions[ "bundles.days" ] = {};
        if ( filtrationCriteria.bundles.days.min ) {
          conditions[ "bundles.days" ].$gte = filtrationCriteria.bundles.days.min;
        }
        if ( filtrationCriteria.bundles.days.max ) {
          conditions[ "bundles.days" ].$lte = filtrationCriteria.bundles.days.max;
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

function makeSortCriteria ( sortCriteria: storage.powertel.airtimeSale.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    if ( sortCriteria.criteria === "mdn" ) {
      sortString = "card.mdn";
    } else if ( sortCriteria.criteria === "gb" ) {
      sortString = "bundles.gb";
    } else if ( sortCriteria.criteria === "days" ) {
      sortString = "bundles.days";
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
      buyerName: model.buyerName,
      amount: model.amount
    };
    if ( model.card ) {
      details.card = {
        cardId: mongoose.Types.ObjectId( model.card.cardId ),
        mdn: model.card.mdn
      };
    }
    if ( model.user ) {
      details.user = {
        userId: mongoose.Types.ObjectId( model.user.userId ),
        emailAddress: model.user.emailAddress,
        fullName: model.user.fullName
      };
    }
    if ( model.bundles ) {
      details.bundles = {
        gb: model.bundles.gb,
        days: model.bundles.days
      };
    }

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.powertel.airtimeSale.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.buyerName ) {
      document.buyerName = details.buyerName;
    }

    if ( details.card ) {
      if ( details.card.cardId ) {
        document.card.cardId = mongoose.Types.ObjectId( details.card.cardId );
      }
      if ( details.card.mdn ) {
        document.card.mdn = details.card.mdn;
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

    if ( details.bundles ) {
      if ( details.bundles.gb ) {
        document.bundles.gb = details.bundles.gb;
      }
      if ( details.bundles.days ) {
        document.bundles.days = details.bundles.days;
      }
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.powertel.airtimeSale.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.powertel.airtimeSale.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.powertel.airtimeSale.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.powertel.airtimeSale.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            buyerName: model.buyerName,
            amount: model.amount,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };
          if ( model.card ) {
            returnModel.card = {
              id: ( <mongoose.Types.ObjectId>model.card._id ).toHexString(),
              cardId: ( <mongoose.Types.ObjectId>model.card.cardId ).toHexString(),
              mdn: model.card.mdn,
              createdAt: model.card.createdAt,
              updatedAt: model.card.updatedAt
            };
          }
          if ( model.user ) {
            returnModel.user = {
              id: ( <mongoose.Types.ObjectId>model.user._id ).toHexString(),
              userId: ( <mongoose.Types.ObjectId>model.user.userId ).toHexString(),
              emailAddress: model.user.emailAddress,
              fullName: model.user.fullName,
              createdAt: model.user.createdAt,
              updatedAt: model.user.updatedAt
            };
          }
          if ( model.bundles ) {
            returnModel.bundles = {
              gb: model.bundles.gb,
              days: model.bundles.days
            };
          }


          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/