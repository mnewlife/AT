/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AirtimeTransferMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoAirtimeTransfer extends MongoController implements storageManagerInterfaces.core.airtimeTransfer {

  /*****************************************************************/

  protected readonly emitter: storageManagerInterfaces.core.airtimeTransfer.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageManagerInterfaces.core.airtimeTransfer.Emitter;
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

  readonly get = ( filtrationCriteria: storageManagerInterfaces.core.airtimeTransfer.FiltrationCriteria, sortCriteria: storageManagerInterfaces.core.airtimeTransfer.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super[]> => {

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
      .then(( foundAirtimeTransfers: Model[] ) => {

        return this.convertToAbstract( foundAirtimeTransfers );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] ) => {

        new Promise<interfaces.dataModel.core.airtimeTransfer.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAirtimeTransfers.map(( airtimeTransfer ) => {
              return airtimeTransfer.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers );

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

  readonly getById = ( airtimeTransferId: string, forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeTransferId ) );

      } )
      .then(( foundAirtimeTransfer: Model ) => {

        return this.convertToAbstract( [ foundAirtimeTransfer ] );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: airtimeTransferId
          } );
        } );

        return Promise.resolve( convertedAirtimeTransfers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: airtimeTransferId,
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

  readonly addBatch = ( airtimeTransfers: storageManagerInterfaces.core.airtimeTransfer.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( airtimeTransfers.map(( airtimeTransfer ) => {
          let airtimeTransferDetails: Model_Partial = {
            emailAddress: airtimeTransfer.emailAddress,
            password: airtimeTransfer.password,
            accessLevel: airtimeTransfer.accessLevel,
            verification: {
              verified: airtimeTransfer.verification.verified,
              numVerAttempts: airtimeTransfer.verification.numVerAttempts,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            activeApps: []
          };
          if ( airtimeTransfer.resetCode ) {
            airtimeTransferDetails.resetCode = airtimeTransfer.resetCode;
          }
          if ( airtimeTransfer.verification.verificationCode ) {
            airtimeTransferDetails.verification.verificationCode = airtimeTransfer.verification.verificationCode;
          }
          if ( airtimeTransfer.personalDetails ) {
            airtimeTransferDetails.personalDetails = <any>{
              firstName: airtimeTransfer.personalDetails.firstName,
              lastName: airtimeTransfer.personalDetails.lastName,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          if ( airtimeTransfer.contactDetails ) {
            airtimeTransferDetails.contactDetails = <any>{
              phoneNumbers: airtimeTransfer.contactDetails.phoneNumbers,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          return airtimeTransferDetails;
        } ) );

      } )
      .then(( addedAirtimeTransfers: Model[] ) => {

        return this.convertToAbstract( addedAirtimeTransfers );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: airtimeTransfers,
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

  readonly add = ( details: storageManagerInterfaces.core.airtimeTransfer.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let airtimeTransferDetails: Model_Partial = {
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
          airtimeTransferDetails.resetCode = details.resetCode;
        }
        if ( details.verification.verificationCode ) {
          airtimeTransferDetails.verification.verificationCode = details.verification.verificationCode;
        }
        if ( details.personalDetails ) {
          airtimeTransferDetails.personalDetails = <any>{
            firstName: details.personalDetails.firstName,
            lastName: details.personalDetails.lastName,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
        if ( details.contactDetails ) {
          airtimeTransferDetails.contactDetails = <any>{
            phoneNumbers: details.contactDetails.phoneNumbers,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }

        return this.saveDocument( airtimeTransferDetails );

      } )
      .then(( addedAirtimeTransfer: Model ) => {

        return this.convertToAbstract( [ addedAirtimeTransfer ] );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageManagerInterfaces.core.airtimeTransfer.FiltrationCriteria, details: storageManagerInterfaces.core.airtimeTransfer.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAirtimeTransfers: Model[] ) => {

        return Promise.all( foundAirtimeTransfers.map(( airtimeTransfer ) => {

          return this.generateUpdateDetails( airtimeTransfer, details )
            .then(( fedAirtimeTransfer: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAirtimeTransfer.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAirtimeTransfer );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAirtimeTransfers: Model[] ) => {

        return this.convertToAbstract( updatedAirtimeTransfers );

      } )
      .then(( updatedAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( updatedAirtimeTransfers );

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

  readonly updateById = ( airtimeTransferId: string, details: storageManagerInterfaces.core.airtimeTransfer.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super> => {

    let airtimeTransferObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeTransferId ) );

      } )
      .then(( airtimeTransfer: Model ) => {

        return this.generateUpdateDetails( airtimeTransfer, details )
          .then(( fedAirtimeTransfer: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAirtimeTransfer.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAirtimeTransfer );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAirtimeTransfer: Model ) => {

        return this.convertToAbstract( [ updatedAirtimeTransfer ] );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: airtimeTransferId,
            documents: convertedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: airtimeTransferId,
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

  readonly remove = ( filtrationCriteria: storageManagerInterfaces.core.airtimeTransfer.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( airtimeTransferId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: airtimeTransferId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: airtimeTransferId,
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

  private readonly makeConditions = ( filtrationCriteria: storageManagerInterfaces.core.airtimeTransfer.FiltrationCriteria ): Promise<QueryConditions> => {

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

  private readonly makeSortCriteria = ( sortCriteria: storageManagerInterfaces.core.airtimeTransfer.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageManagerInterfaces.core.airtimeTransfer.UpdateDetails ): Promise<Model> => {

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

  private readonly convertToAbstract = ( airtimeTransfers: Model[], forceThrow = false ): Promise<interfaces.dataModel.core.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.core.airtimeTransfer.Super[]>(( resolve, reject ) => {

          let returnAirtimeTransfers: interfaces.dataModel.core.airtimeTransfer.Super[] = [];

          airtimeTransfers.forEach(( airtimeTransfer ) => {

            let returnAirtimeTransfer: interfaces.dataModel.core.airtimeTransfer.Super = {
              id: ( <mongoose.Types.ObjectId>airtimeTransfer._id ).toHexString(),
              emailAddress: airtimeTransfer.emailAddress,
              accessLevel: airtimeTransfer.accessLevel,
              password: airtimeTransfer.password,
              verification: {
                id: airtimeTransfer.verification._id,
                verified: airtimeTransfer.verification.verified,
                numVerAttempts: airtimeTransfer.verification.numVerAttempts,
                createdAt: airtimeTransfer.verification.createdAt,
                updatedAt: airtimeTransfer.verification.updatedAt
              },
              activeApps: airtimeTransfer.activeApps,
              createdAt: airtimeTransfer.createdAt,
              updatedAt: airtimeTransfer.updatedAt
            };

            if ( airtimeTransfer.resetCode ) {
              returnAirtimeTransfer.resetCode = airtimeTransfer.resetCode;
            }

            if ( airtimeTransfer.verification.verificationCode ) {
              returnAirtimeTransfer.verification.verificationCode = airtimeTransfer.verification.verificationCode;
            }

            if ( airtimeTransfer.personalDetails ) {
              returnAirtimeTransfer.personalDetails = {
                id: airtimeTransfer.personalDetails._id,
                firstName: airtimeTransfer.personalDetails.firstName,
                lastName: airtimeTransfer.personalDetails.lastName,
                createdAt: airtimeTransfer.personalDetails.createdAt,
                updatedAt: airtimeTransfer.personalDetails.updatedAt
              };
            }

            if ( airtimeTransfer.contactDetails ) {
              returnAirtimeTransfer.contactDetails = {
                id: airtimeTransfer.contactDetails._id,
                phoneNumbers: airtimeTransfer.contactDetails.phoneNumbers,
                createdAt: airtimeTransfer.contactDetails.createdAt,
                updatedAt: airtimeTransfer.contactDetails.updatedAt
              };
            }

            returnAirtimeTransfers.push( returnAirtimeTransfer );

          } );

          resolve( returnAirtimeTransfers );

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
} ): storageManagerInterfaces.core.airtimeTransfer => {
  return new MongoAirtimeTransfer( {
    emitter: emitterFactory( params.emitEvent ),
    Model: AirtimeTransferMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
