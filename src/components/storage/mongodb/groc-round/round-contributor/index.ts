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
import * as interfaces from "../../../interfaces/groc-round/round-contributor";

import { Model, MongooseModel, TrackInfo } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.grocRound.roundContributor.Super>( emitEvent, "GrocRound|RoundContributor" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.grocRound.roundContributor.Super, interfaces.Events>(

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

  "contributions.num"?: { $gte?: number; $lte?: number; };
  "contributions.value"?: { $gte?: number; $lte?: number; };
  "contributions.valueDue"?: { $gte?: number; $lte?: number; };

  "cart.num"?: { $gte?: number; $lte?: number; };
  "cart.value"?: { $gte?: number; $lte?: number; };

  "deliveryFees.valuePaid"?: { $gte?: number; $lte?: number; };
  "deliveryFees.valueDue"?: { $gte?: number; $lte?: number; };

  "complete"?: boolean;

  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.grocRound.roundContributor.FiltrationCriteria ): Promise<QueryConditions> {

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

    if ( filtrationCriteria.contributions ) {

      if ( filtrationCriteria.contributions.num ) {
        conditions[ "contributions.num" ] = {};
        if ( filtrationCriteria.contributions.num.min ) {
          conditions[ "contributions.num" ].$gte = filtrationCriteria.contributions.num.min;
        }
        if ( filtrationCriteria.contributions.num.max ) {
          conditions[ "contributions.num" ].$lte = filtrationCriteria.contributions.num.max;
        }
      }

      if ( filtrationCriteria.contributions.value ) {
        conditions[ "contributions.value" ] = {};
        if ( filtrationCriteria.contributions.value.min ) {
          conditions[ "contributions.value" ].$gte = filtrationCriteria.contributions.value.min;
        }
        if ( filtrationCriteria.contributions.value.max ) {
          conditions[ "contributions.value" ].$lte = filtrationCriteria.contributions.value.max;
        }
      }

      if ( filtrationCriteria.contributions.valueDue ) {
        conditions[ "contributions.valueDue" ] = {};
        if ( filtrationCriteria.contributions.valueDue.min ) {
          conditions[ "contributions.valueDue" ].$gte = filtrationCriteria.contributions.valueDue.min;
        }
        if ( filtrationCriteria.contributions.valueDue.max ) {
          conditions[ "contributions.valueDue" ].$lte = filtrationCriteria.contributions.valueDue.max;
        }
      }

    }

    if ( filtrationCriteria.cart ) {

      if ( filtrationCriteria.cart.num ) {
        conditions[ "cart.num" ] = {};
        if ( filtrationCriteria.cart.num.min ) {
          conditions[ "cart.num" ].$gte = filtrationCriteria.cart.num.min;
        }
        if ( filtrationCriteria.cart.num.max ) {
          conditions[ "cart.num" ].$lte = filtrationCriteria.cart.num.max;
        }
      }

      if ( filtrationCriteria.cart.value ) {
        conditions[ "cart.value" ] = {};
        if ( filtrationCriteria.cart.value.min ) {
          conditions[ "cart.value" ].$gte = filtrationCriteria.cart.value.min;
        }
        if ( filtrationCriteria.cart.value.max ) {
          conditions[ "cart.value" ].$lte = filtrationCriteria.cart.value.max;
        }
      }

    }

    if ( filtrationCriteria.deliveryFees ) {

      if ( filtrationCriteria.deliveryFees.valuePaid ) {
        conditions[ "deliveryFees.valuePaid" ] = {};
        if ( filtrationCriteria.deliveryFees.valuePaid.min ) {
          conditions[ "deliveryFees.valuePaid" ].$gte = filtrationCriteria.deliveryFees.valuePaid.min;
        }
        if ( filtrationCriteria.deliveryFees.valuePaid.max ) {
          conditions[ "deliveryFees.valuePaid" ].$lte = filtrationCriteria.deliveryFees.valuePaid.max;
        }
      }

      if ( filtrationCriteria.deliveryFees.valueDue ) {
        conditions[ "deliveryFees.valueDue" ] = {};
        if ( filtrationCriteria.deliveryFees.valueDue.min ) {
          conditions[ "deliveryFees.valueDue" ].$gte = filtrationCriteria.deliveryFees.valueDue.min;
        }
        if ( filtrationCriteria.deliveryFees.valueDue.max ) {
          conditions[ "deliveryFees.valueDue" ].$lte = filtrationCriteria.deliveryFees.valueDue.max;
        }
      }

    }

    if ( filtrationCriteria.complete ) {
      conditions[ "complete" ] = filtrationCriteria.complete;
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.grocRound.roundContributor.SortCriteria ): Promise<string> {

  return new Promise<string>( ( resolve, reject ) => {
    let sortString;
    sortString = sortCriteria.criteria;

    if ( sortCriteria.criteria == "numContributions" ) sortString = "contributions.num";
    if ( sortCriteria.criteria == "valueContributions" ) sortString = "contributions.value";
    if ( sortCriteria.criteria == "valueDueContributions" ) sortString = "contributions.valueDue";
    if ( sortCriteria.criteria == "cartNum" ) sortString = "cart.num";
    if ( sortCriteria.criteria == "cartValue" ) sortString = "cart.value";
    if ( sortCriteria.criteria == "deliveryFeesPaid" ) sortString = "deliveryFees.valuePaid";
    if ( sortCriteria.criteria == "deliveryFeesDue" ) sortString = "deliveryFees.valueDue";

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
      contributions: {
        num: model.contributions.num,
        value: model.contributions.value,
        valueDue: model.contributions.valueDue
      },
      tracks: [],
      cart: {
        num: model.cart.num,
        value: model.cart.value
      },
      deliveryFees: {
        valuePaid: model.deliveryFees.valuePaid,
        valueDue: model.deliveryFees.valueDue
      },
      complete: model.complete
    };

    if ( model.tracks ) {

      model.tracks.forEach( ( track ) => {

        let temp: TrackInfo = {
          track: {
            trackId: mongoose.Types.ObjectId( track.track.trackId ),
            trackName: track.track.trackName
          },
          deviations: {
            additions: [],
            subtractions: []
          }
        };

        if ( track.deviations.additions ) {
          track.deviations.additions.forEach( ( addition ) => {
            temp.deviations.additions.push( {
              product: {
                productId: mongoose.Types.ObjectId( addition.product.productId ),
                label: addition.product.label
              },
              quantity: addition.quantity,
              value: addition.value
            } );
          } );
        }

        if ( track.deviations.subtractions ) {
          track.deviations.subtractions.forEach( ( subtraction ) => {
            temp.deviations.subtractions.push( {
              product: {
                productId: mongoose.Types.ObjectId( subtraction.product.productId ),
                label: subtraction.product.label
              },
              quantity: subtraction.quantity,
              value: subtraction.value
            } );
          } );
        }

        details.tracks.push();

      } );

    }

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.grocRound.roundContributor.UpdateDetails ): Promise<Model> {

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

    if ( details.contributions ) {

      if ( details.contributions.num ) {
        document.contributions.num = details.contributions.num;
      }

      if ( details.contributions.value ) {
        document.contributions.value = details.contributions.value;
      }

      if ( details.contributions.valueDue ) {
        document.contributions.valueDue = details.contributions.valueDue;
      }

    }

    if ( details.tracks ) {

      document.tracks = [];
      details.tracks.forEach( ( track ) => {

        let temp: TrackInfo = {
          track: {
            trackId: mongoose.Types.ObjectId( track.track.trackId ),
            trackName: track.track.trackName
          },
          deviations: {
            additions: [],
            subtractions: []
          }
        };

        if ( track.deviations.additions ) {
          track.deviations.additions.forEach( ( addition ) => {
            temp.deviations.additions.push( {
              product: {
                productId: mongoose.Types.ObjectId( addition.product.productId ),
                label: addition.product.label
              },
              quantity: addition.quantity,
              value: addition.value
            } );
          } );
        }

        if ( track.deviations.subtractions ) {
          track.deviations.subtractions.forEach( ( subtraction ) => {
            temp.deviations.subtractions.push( {
              product: {
                productId: mongoose.Types.ObjectId( subtraction.product.productId ),
                label: subtraction.product.label
              },
              quantity: subtraction.quantity,
              value: subtraction.value
            } );
          } );
        }

        document.tracks.push( temp );

      } );

    }

    if ( details.cart ) {

      if ( details.cart.num ) {
        document.cart.num = details.cart.num;
      }

      if ( details.cart.value ) {
        document.cart.value = details.cart.value;
      }

    }

    if ( details.deliveryFees ) {

      if ( details.deliveryFees.valuePaid ) {
        document.deliveryFees.valuePaid = details.deliveryFees.valuePaid;
      }

      if ( details.deliveryFees.valueDue ) {
        document.deliveryFees.valueDue = details.deliveryFees.valueDue;
      }

    }

    if ( details.complete ) {
      document.complete = details.complete;
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.grocRound.roundContributor.Super[]> {

  return this.checkThrow( forceThrow )
    .then( ( response: any ) => {

      return new Promise<dataModel.grocRound.roundContributor.Super[]>( ( resolve, reject ) => {

        let returnModels: dataModel.grocRound.roundContributor.Super[] = [];

        models.forEach( ( model ) => {

          let returnModel: dataModel.grocRound.roundContributor.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            user: {
              userId: model.user.userId.toHexString(),
              emailAddress: model.user.emailAddress
            },
            round: {
              roundId: model.round.roundId.toHexString(),
              roundName: model.round.roundName
            },
            contributions: {
              num: model.contributions.num,
              value: model.contributions.value,
              valueDue: model.contributions.valueDue
            },
            tracks: [],
            cart: {
              num: model.cart.num,
              value: model.cart.value
            },
            deliveryFees: {
              valuePaid: model.deliveryFees.valuePaid,
              valueDue: model.deliveryFees.valueDue
            },
            complete: model.complete,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };

          if ( model.tracks ) {

            model.tracks.forEach( ( track ) => {

              let temp: dataModel.grocRound.roundContributor.TrackInfo = {
                track: {
                  trackId: track.track.trackId.toHexString(),
                  trackName: track.track.trackName
                },
                deviations: {
                  additions: [],
                  subtractions: []
                }
              };

              if ( track.deviations.additions ) {
                track.deviations.additions.forEach( ( addition ) => {
                  temp.deviations.additions.push( {
                    product: {
                      productId: addition.product.productId.toHexString(),
                      label: addition.product.label
                    },
                    quantity: addition.quantity,
                    value: addition.value
                  } );
                } );
              }

              if ( track.deviations.subtractions ) {
                track.deviations.subtractions.forEach( ( subtraction ) => {
                  temp.deviations.subtractions.push( {
                    product: {
                      productId: subtraction.product.productId.toHexString(),
                      label: subtraction.product.label
                    },
                    quantity: subtraction.quantity,
                    value: subtraction.value
                  } );
                } );
              }

              returnModel.tracks.push();

            } );

          }

          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/