/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AirtimePaymentMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoAirtimePayment extends MongoController implements storageManagerInterfaces.call263.airtimePayment {

  /*****************************************************************/

  protected readonly emitter: storageManagerInterfaces.call263.airtimePayment.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageManagerInterfaces.call263.airtimePayment.Emitter;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      emitter: params.emitter,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {
            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );
          } );

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundAirtimePayments: Model[] ) => {

        return this.convertToAbstract( foundAirtimePayments );

      } )
      .then(( convertedAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<interfaces.dataModel.call263.airtimePayment.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAirtimePayments.map(( airtimePayment ) => {
              return airtimePayment.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( airtimePaymentId: string, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimePaymentId ) );

      } )
      .then(( foundAirtimePayment: Model ) => {

        return this.convertToAbstract( [ foundAirtimePayment ] );

      } )
      .then(( convertedAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: airtimePaymentId
          } );
        } );

        return Promise.resolve( convertedAirtimePayments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: airtimePaymentId,
            reason: reason
          } );
          resolve();
        } );

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( {
            identifier: "DocumentNotFound",
            data: {
              reason: reason
            }
          } );
        } else {
          return Promise.reject( {
            identifier: "GetByIdFailed",
            data: {
              reason: reason
            }
          } );
        }

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( airtimePayments: storageManagerInterfaces.call263.airtimePayment.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( airtimePayments.map(( airtimePayment ) => {
          let airtimePaymentDetails: Model_Partial = {
            user: {
              userId: mongoose.Types.ObjectId( airtimePayment.user.userId )
            }
          };
          if ( airtimePayment.resetCode ) {
            airtimePaymentDetails.resetCode = airtimePayment.resetCode;
          }
          if ( airtimePayment.verification.verificationCode ) {
            airtimePaymentDetails.verification.verificationCode = airtimePayment.verification.verificationCode;
          }
          if ( airtimePayment.personalDetails ) {
            airtimePaymentDetails.personalDetails = <any>{
              firstName: airtimePayment.personalDetails.firstName,
              lastName: airtimePayment.personalDetails.lastName,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          if ( airtimePayment.contactDetails ) {
            airtimePaymentDetails.contactDetails = <any>{
              phoneNumbers: airtimePayment.contactDetails.phoneNumbers,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          return airtimePaymentDetails;
        } ) );

      } )
      .then(( addedAirtimePayments: Model[] ) => {

        return this.convertToAbstract( addedAirtimePayments );

      } )
      .then(( convertedAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: airtimePayments,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddBatchFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly add = ( details: storageManagerInterfaces.call263.airtimePayment.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let airtimePaymentDetails: Model_Partial = {
          emailAddress: details.emailAddress,
          password: details.password,
          accessLevel: details.accessLevel,
          verification: {
            verified: details.verification.verified,
            numVerAttempts: details.verification.numVerAttempts,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          activeApps: details.activeApps
        };
        if ( details.resetCode ) {
          airtimePaymentDetails.resetCode = details.resetCode;
        }
        if ( details.verification.verificationCode ) {
          airtimePaymentDetails.verification.verificationCode = details.verification.verificationCode;
        }
        if ( details.personalDetails ) {
          airtimePaymentDetails.personalDetails = <any>{
            firstName: details.personalDetails.firstName,
            lastName: details.personalDetails.lastName,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
        if ( details.contactDetails ) {
          airtimePaymentDetails.contactDetails = <any>{
            phoneNumbers: details.contactDetails.phoneNumbers,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }

        return this.saveDocument( airtimePaymentDetails );

      } )
      .then(( addedAirtimePayment: Model ) => {

        return this.convertToAbstract( [ addedAirtimePayment ] );

      } )
      .then(( convertedAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: [ details ],
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly update = ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria, details: storageManagerInterfaces.call263.airtimePayment.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAirtimePayments: Model[] ) => {

        return Promise.all( foundAirtimePayments.map(( airtimePayment ) => {

          return this.generateUpdateDetails( airtimePayment, details )
            .then(( fedAirtimePayment: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAirtimePayment.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAirtimePayment );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAirtimePayments: Model[] ) => {

        return this.convertToAbstract( updatedAirtimePayments );

      } )
      .then(( updatedAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( updatedAirtimePayments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly updateById = ( airtimePaymentId: string, details: storageManagerInterfaces.call263.airtimePayment.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

    let airtimePaymentObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimePaymentId ) );

      } )
      .then(( airtimePayment: Model ) => {

        return this.generateUpdateDetails( airtimePayment, details )
          .then(( fedAirtimePayment: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAirtimePayment.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAirtimePayment );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAirtimePayment: Model ) => {

        return this.convertToAbstract( [ updatedAirtimePayment ] );

      } )
      .then(( convertedAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: airtimePaymentId,
            documents: convertedAirtimePayments
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimePayments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: airtimePaymentId,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            conditions: filtrationCriteria,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly removeById = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( airtimePaymentId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: airtimePaymentId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: airtimePaymentId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly makeConditions = ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria ): Promise<QueryConditions> => {

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

      if ( filtrationCriteria.contactDetails ) {
        if ( filtrationCriteria.contactDetails.phoneNumbers ) {
          conditions[ "contactDetails.phoneNumbers" ] = { $all: filtrationCriteria.contactDetails.phoneNumbers };
        }
      }

      if ( filtrationCriteria.activeApps ) {
        conditions[ "activeApps" ] = { $all: filtrationCriteria.activeApps };
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageManagerInterfaces.call263.airtimePayment.SortCriteria ): Promise<string> => {

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

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageManagerInterfaces.call263.airtimePayment.UpdateDetails ): Promise<Model> => {

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
        if ( details.personalDetails.firstName || details.personalDetails.lastName ) {
          if ( !document.personalDetails ) {
            document.personalDetails = <any>{
              firstName: "",
              lastName: "",
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          if ( details.personalDetails.firstName ) {
            document.personalDetails.firstName = details.personalDetails.firstName;
          }
          if ( details.personalDetails.lastName ) {
            document.personalDetails.lastName = details.personalDetails.lastName;
          }
        }
      }

      if ( details.contactDetails ) {
        if ( details.contactDetails.phoneNumbersToAdd || details.contactDetails.phoneNumbersToRemove ) {
          if ( !document.contactDetails ) {
            document.contactDetails = <any>{
              phoneNumbers: [],
              createdAt: new Date(),
              updatedAt: new Date()
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

  /*****************************************************************/

  private readonly convertToAbstract = ( airtimePayments: Model[], forceThrow = false ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.call263.airtimePayment.Super[]>(( resolve, reject ) => {

          let returnAirtimePayments: interfaces.dataModel.call263.airtimePayment.Super[] = [];

          airtimePayments.forEach(( airtimePayment ) => {

            let returnAirtimePayment: interfaces.dataModel.call263.airtimePayment.Super = {
              id: ( <mongoose.Types.ObjectId>airtimePayment._id ).toHexString(),
              emailAddress: airtimePayment.emailAddress,
              accessLevel: airtimePayment.accessLevel,
              password: airtimePayment.password,
              verification: {
                id: airtimePayment.verification._id,
                verified: airtimePayment.verification.verified,
                numVerAttempts: airtimePayment.verification.numVerAttempts,
                createdAt: airtimePayment.verification.createdAt,
                updatedAt: airtimePayment.verification.updatedAt
              },
              activeApps: airtimePayment.activeApps,
              createdAt: airtimePayment.createdAt,
              updatedAt: airtimePayment.updatedAt
            };

            if ( airtimePayment.resetCode ) {
              returnAirtimePayment.resetCode = airtimePayment.resetCode;
            }

            if ( airtimePayment.verification.verificationCode ) {
              returnAirtimePayment.verification.verificationCode = airtimePayment.verification.verificationCode;
            }

            if ( airtimePayment.personalDetails ) {
              returnAirtimePayment.personalDetails = {
                id: airtimePayment.personalDetails._id,
                firstName: airtimePayment.personalDetails.firstName,
                lastName: airtimePayment.personalDetails.lastName,
                createdAt: airtimePayment.personalDetails.createdAt,
                updatedAt: airtimePayment.personalDetails.updatedAt
              };
            }

            if ( airtimePayment.contactDetails ) {
              returnAirtimePayment.contactDetails = {
                id: airtimePayment.contactDetails._id,
                phoneNumbers: airtimePayment.contactDetails.phoneNumbers,
                createdAt: airtimePayment.contactDetails.createdAt,
                updatedAt: airtimePayment.contactDetails.updatedAt
              };
            }

            returnAirtimePayments.push( returnAirtimePayment );

          } );

          resolve( returnAirtimePayments );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "emailAddress"?: string;
  "accessLevel"?: string;
  "verification.verified"?: boolean;
  "verification.numVerAttempts"?: { $gte?: number; $lte?: number; };
  "contactDetails.phoneNumbers"?: { $all: string[] };
  "activeApps"?: { $all: string[] };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageManagerInterfaces.call263.airtimePayment => {
  return new MongoAirtimePayment( {
    emitter: emitterFactory( params.emitEvent ),
    Model: AirtimePaymentMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
