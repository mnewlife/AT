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
import * as interfaces from "../../../interfaces/core/user";

import { Model, MongooseModel } from "./model";

/*******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  mapDetails: dataStructures.MapDetails,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  let models = new Events<interfaces.Context, interfaces.FiltrationCriteria,
    interfaces.SortCriteria, interfaces.AddDetails, interfaces.UpdateDetails,
    dataModel.core.user.Super>( emitEvent, "Core|User" );

  return new ModelController<interfaces.FiltrationCriteria, storage.BaseSortCriteria,
    interfaces.AddDetails, interfaces.UpdateDetails, QueryConditions, Model,
    dataModel.core.user.Super, interfaces.Events>(

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
  "emailAddress"?: string;
  "accessLevel"?: string;

  "verification.verified"?: boolean;
  "verification.numVerAttempts"?: { $gte?: number; $lte?: number; };

  "personalDetails.firstName"?: string;
  "personalDetails.lastName"?: string;
  "personalDetails.dateOfBirth"?: { $gte?: Date; $lte?: Date; };
  "personalDetails.gender"?: "Male" | "Female";

  "contactDetails.phoneNumbers"?: { $all: string[] };

  "residentialDetails.country"?: string;
  "residentialDetails.province"?: string;
  "residentialDetails.address"?: string;

  "activeApps"?: { $all: string[] };
  $text?: { $search: string };
}

/******************************************************************************/

function makeConditions ( filtrationCriteria: storage.core.user.FiltrationCriteria ): Promise<QueryConditions> {

  return new Promise<QueryConditions>(( resolve, reject ) => {

    let conditions: QueryConditions = {};

    if ( filtrationCriteria.emailAddress ) {
      conditions[ "emailAddress" ] = filtrationCriteria.emailAddress;
    }

    if ( filtrationCriteria.accessLevel ) {
      conditions[ "accessLevel" ] = filtrationCriteria.accessLevel;
    }

    if ( filtrationCriteria.verification ) {

      if ( filtrationCriteria.verification.verified ) {
        conditions[ "verification.verified" ] = filtrationCriteria.verification.verified;
      }

      if ( filtrationCriteria.verification.numVerAttempts ) {
        conditions[ "verification.numVerAttempts" ] = {};
        if ( filtrationCriteria.verification.numVerAttempts.min ) {
          conditions[ "verification.numVerAttempts" ].$gte = filtrationCriteria.verification.numVerAttempts.min;
        }
        if ( filtrationCriteria.verification.numVerAttempts.max ) {
          conditions[ "verification.numVerAttempts" ].$lte = filtrationCriteria.verification.numVerAttempts.max;
        }
      }

    }

    if ( filtrationCriteria.personalDetails ) {
      if ( filtrationCriteria.personalDetails.firstName ) {
        conditions[ "personalDetails.firstName" ] = filtrationCriteria.personalDetails.firstName;
      }
      if ( filtrationCriteria.personalDetails.lastName ) {
        conditions[ "personalDetails.lastName" ] = filtrationCriteria.personalDetails.lastName;
      }
      if ( filtrationCriteria.personalDetails.dateOfBirth ) {
        conditions[ "personalDetails.dateOfBirth" ] = {};
        if ( filtrationCriteria.personalDetails.dateOfBirth.min ) {
          conditions[ "personalDetails.dateOfBirth" ].$gte = filtrationCriteria.personalDetails.dateOfBirth.min;
        }
        if ( filtrationCriteria.personalDetails.dateOfBirth.max ) {
          conditions[ "personalDetails.dateOfBirth" ].$lte = filtrationCriteria.personalDetails.dateOfBirth.max;
        }
      }
      if ( filtrationCriteria.personalDetails.gender ) {
        conditions[ "personalDetails.gender" ] = filtrationCriteria.personalDetails.gender;
      }
    }

    if ( filtrationCriteria.contactDetails ) {
      if ( filtrationCriteria.contactDetails.phoneNumbers ) {
        conditions[ "contactDetails.phoneNumbers" ] = { $all: filtrationCriteria.contactDetails.phoneNumbers };
      }
    }

    if ( filtrationCriteria.activeApps ) {
      conditions[ "activeApps" ] = { $all: filtrationCriteria.activeApps };
    }

    if ( filtrationCriteria.residentialDetails ) {
      if ( filtrationCriteria.residentialDetails.country ) {
        conditions[ "residentialDetails.country" ] = filtrationCriteria.residentialDetails.country;
      }
      if ( filtrationCriteria.residentialDetails.province ) {
        conditions[ "residentialDetails.province" ] = filtrationCriteria.residentialDetails.province;
      }
      if ( filtrationCriteria.residentialDetails.address ) {
        conditions[ "residentialDetails.address" ] = filtrationCriteria.residentialDetails.address;
      }
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    if ( filtrationCriteria.textSearch ) {
      conditions.$text = { $search: filtrationCriteria.textSearch };
    }

    resolve( conditions );

  } );

}

/******************************************************************************/

function makeSortCriteria ( sortCriteria: storage.core.user.SortCriteria ): Promise<string> {

  return new Promise<string>(( resolve, reject ) => {
    let sortString;
    if ( sortCriteria.criteria === "numVerAttempts" ) {
      sortString = "verification.numVerAttempts";
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
      emailAddress: model.emailAddress,
      password: model.password,
      accessLevel: model.accessLevel,
      verification: {
        verified: model.verification.verified
      },
      activeApps: []
    };
    if ( model.resetCode ) {
      details.resetCode = model.resetCode;
    }
    if ( model.verification.numVerAttempts ) {
      details.verification.numVerAttempts = model.verification.numVerAttempts;
    }
    if ( model.verification.verificationCode ) {
      details.verification.verificationCode = model.verification.verificationCode;
    }
    if ( model.personalDetails ) {
      details.personalDetails = {
        firstName: model.personalDetails.firstName,
        lastName: model.personalDetails.lastName
      };
    }
    if ( model.contactDetails ) {
      details.contactDetails = {
        phoneNumbers: model.contactDetails.phoneNumbers
      };
    }
    if ( model.residentialDetails ) {
      details.residentialDetails = {
        country: model.residentialDetails.country,
        province: model.residentialDetails.province,
        address: model.residentialDetails.address
      };
    }

    returnDetails.push( details );

  } );

  return returnDetails;

}

/******************************************************************************/

function generateUpdateDetails ( document: Model, details: storage.core.user.UpdateDetails ): Promise<Model> {

  return new Promise<Model>(( resolve, reject ) => {

    if ( details.emailAddress ) {
      document.emailAddress = details.emailAddress;
    }

    if ( details.accessLevel ) {
      document.accessLevel = details.accessLevel;
    }

    if ( details.password ) {
      document.password = details.password;
    }

    if ( details.resetCode ) {
      document.resetCode = details.resetCode;
    }

    if ( details.verification ) {
      if ( details.verification.verified ) {
        document.verification.verified = details.verification.verified;
      }
      if ( details.verification.verificationCode ) {
        document.verification.verificationCode = details.verification.verificationCode;
      }
      if ( details.verification.numVerAttemptsMinus ) {
        document.verification.numVerAttempts -= details.verification.numVerAttemptsMinus;
      }
      if ( details.verification.numVerAttemptsPlus ) {
        document.verification.numVerAttempts += details.verification.numVerAttemptsPlus;
      }
      if ( details.verification.numVerAttempts ) {
        document.verification.numVerAttempts = details.verification.numVerAttempts;
      }
    }

    if ( details.personalDetails ) {
      if ( !document.personalDetails ) {
        document.personalDetails = {
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          gender: "Male"
        };
      }
      if ( details.personalDetails.firstName ) {
        document.personalDetails.firstName = details.personalDetails.firstName;
      }
      if ( details.personalDetails.lastName ) {
        document.personalDetails.lastName = details.personalDetails.lastName;
      }
      if ( details.personalDetails.dateOfBirth ) {
        document.personalDetails.dateOfBirth = details.personalDetails.dateOfBirth;
      }
      if ( details.personalDetails.gender ) {
        document.personalDetails.gender = details.personalDetails.gender;
      }
    }

    if ( details.contactDetails ) {
      if ( !document.contactDetails ) {
        document.contactDetails = {
          phoneNumbers: []
        };
      }
      if ( details.contactDetails.phoneNumbersToRemove ) {
        details.contactDetails.phoneNumbersToRemove.forEach(( phoneNumber ) => {
          let matches = document.contactDetails.phoneNumbers.filter(( subject ) => {
            return ( subject === phoneNumber );
          } );
          if ( matches.length ) {
            document.contactDetails.phoneNumbers.splice( document.contactDetails.phoneNumbers.indexOf( matches[ 0 ], 1 ) );
          }
        } );
      }
      if ( details.contactDetails.phoneNumbersToAdd ) {
        details.contactDetails.phoneNumbersToAdd.forEach(( phoneNumber ) => {
          document.contactDetails.phoneNumbers.push( phoneNumber );
        } );
      }
      if ( details.contactDetails.phoneNumbers ) {
        document.contactDetails.phoneNumbers = [];
        details.contactDetails.phoneNumbers.forEach(( number ) => {
          document.contactDetails.phoneNumbers.push( number );
        } );
      }
    }

    if ( details.residentialDetails ) {
      if ( !document.residentialDetails ) {
        document.residentialDetails = {
          country: "",
          province: "",
          address: ""
        };
      }
      if ( details.residentialDetails.country ) {
        document.residentialDetails.country = details.residentialDetails.country;
      }
      if ( details.residentialDetails.province ) {
        document.residentialDetails.province = details.residentialDetails.province;
      }
      if ( details.residentialDetails.address ) {
        document.residentialDetails.address = details.residentialDetails.address;
      }
    }

    if ( details.activeAppsToAdd ) {
      if ( !document.activeApps ) {
        document.activeApps = [];
      }
      details.activeAppsToAdd.forEach(( app ) => {
        document.activeApps.push( app );
      } );
    }

    if ( details.activeAppsToRemove ) {
      if ( !document.activeApps ) {
        document.activeApps = [];
      }
      details.activeAppsToRemove.forEach(( app ) => {
        let matches = document.activeApps.filter(( subject ) => {
          return ( subject == app );
        } );
        if ( matches.length ) {
          document.activeApps.splice( document.activeApps.indexOf( matches[ 0 ] ), 1 );
        }
      } );
    }

    resolve( document );

  } );

}

/******************************************************************************/

function convertToAbstract ( models: Model[], forceThrow = false ): Promise<dataModel.core.user.Super[]> {

  return this.checkThrow( forceThrow )
    .then(( response: any ) => {

      return new Promise<dataModel.core.user.Super[]>(( resolve, reject ) => {

        let returnModels: dataModel.core.user.Super[] = [];

        models.forEach(( model ) => {

          let returnModel: dataModel.core.user.Super = {
            id: ( <mongoose.Types.ObjectId>model._id ).toHexString(),
            emailAddress: model.emailAddress,
            accessLevel: model.accessLevel,
            password: model.password,
            verification: {
              verified: model.verification.verified,
              numVerAttempts: model.verification.numVerAttempts
            },
            activeApps: model.activeApps,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          };

          if ( model.resetCode ) {
            returnModel.resetCode = model.resetCode;
          }

          if ( model.verification.verificationCode ) {
            returnModel.verification.verificationCode = model.verification.verificationCode;
          }

          if ( model.personalDetails ) {
            returnModel.personalDetails = {
              firstName: model.personalDetails.firstName,
              lastName: model.personalDetails.lastName,
              dateOfBirth: model.personalDetails.dateOfBirth,
              gender: model.personalDetails.gender
            };
          }

          if ( model.contactDetails ) {
            returnModel.contactDetails = {
              phoneNumbers: model.contactDetails.phoneNumbers
            };
          }

          if ( model.residentialDetails ) {
            returnModel.residentialDetails = {
              country: model.residentialDetails.country,
              province: model.residentialDetails.province,
              address: model.residentialDetails.address
            }
          }

          returnModels.push( returnModel );

        } );

        resolve( returnModels );

      } );

    } );

}

/******************************************************************************/