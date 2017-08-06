/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, UserMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoUser extends MongoController implements storageManagerInterfaces.core.User {

  /*****************************************************************/

  protected readonly emitter: storageManagerInterfaces.core.user.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageManagerInterfaces.core.user.Emitter;
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

  readonly get = ( filtrationCriteria: storageManagerInterfaces.core.user.FiltrationCriteria, sortCriteria: storageManagerInterfaces.core.user.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super[]> => {

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
      .then(( foundUsers: Model[] ) => {

        return this.convertToAbstract( foundUsers );

      } )
      .then(( convertedUsers: interfaces.dataModel.core.user.Super[] ) => {

        new Promise<interfaces.dataModel.core.user.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedUsers.map(( user ) => {
              return user.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedUsers );

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

  readonly getById = ( userId: string, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( userId ) );

      } )
      .then(( foundUser: Model ) => {

        return this.convertToAbstract( [ foundUser ] );

      } )
      .then(( convertedUsers: interfaces.dataModel.core.user.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: userId
          } );
        } );

        return Promise.resolve( convertedUsers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: userId,
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

  readonly addBatch = ( users: storageManagerInterfaces.core.user.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.core.user.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( users.map(( user ) => {
          let userDetails: Model_Partial = {
            emailAddress: user.emailAddress,
            password: user.password,
            accessLevel: user.accessLevel,
            verification: {
              verified: user.verification.verified,
              numVerAttempts: user.verification.numVerAttempts,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            activeApps: []
          };
          if ( user.resetCode ) {
            userDetails.resetCode = user.resetCode;
          }
          if ( user.verification.verificationCode ) {
            userDetails.verification.verificationCode = user.verification.verificationCode;
          }
          if ( user.personalDetails ) {
            userDetails.personalDetails = <any>{
              firstName: user.personalDetails.firstName,
              lastName: user.personalDetails.lastName,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          if ( user.contactDetails ) {
            userDetails.contactDetails = <any>{
              phoneNumbers: user.contactDetails.phoneNumbers,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          if ( user.residentialDetails ) {
            userDetails.residentialDetails = <any>{
              country: user.residentialDetails.country,
              province: user.residentialDetails.province,
              address: user.residentialDetails.address,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }
          return userDetails;
        } ) );

      } )
      .then(( addedUsers: Model[] ) => {

        return this.convertToAbstract( addedUsers );

      } )
      .then(( convertedUsers: interfaces.dataModel.core.user.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedUsers
          } );
          resolve();
        } );

        return Promise.resolve( convertedUsers );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: users,
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

  readonly add = ( details: storageManagerInterfaces.core.user.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let userDetails: Model_Partial = {
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
          userDetails.resetCode = details.resetCode;
        }
        if ( details.verification.verificationCode ) {
          userDetails.verification.verificationCode = details.verification.verificationCode;
        }
        if ( details.personalDetails ) {
          userDetails.personalDetails = <any>{
            firstName: details.personalDetails.firstName,
            lastName: details.personalDetails.lastName,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
        if ( details.contactDetails ) {
          userDetails.contactDetails = <any>{
            phoneNumbers: details.contactDetails.phoneNumbers,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
        if ( details.residentialDetails ) {
          userDetails.residentialDetails = <any>{
            country: details.residentialDetails.country,
            province: details.residentialDetails.province,
            address: details.residentialDetails.address,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }

        return this.saveDocument( userDetails );

      } )
      .then(( addedUser: Model ) => {

        return this.convertToAbstract( [ addedUser ] );

      } )
      .then(( convertedUsers: interfaces.dataModel.core.user.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedUsers
          } );
          resolve();
        } );

        return Promise.resolve( convertedUsers[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageManagerInterfaces.core.user.FiltrationCriteria, details: storageManagerInterfaces.core.user.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundUsers: Model[] ) => {

        return Promise.all( foundUsers.map(( user ) => {

          return this.generateUpdateDetails( user, details )
            .then(( fedUser: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedUser.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedUser );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedUsers: Model[] ) => {

        return this.convertToAbstract( updatedUsers );

      } )
      .then(( updatedUsers: interfaces.dataModel.core.user.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedUsers
          } );
          resolve();
        } );

        return Promise.resolve( updatedUsers );

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

  readonly updateById = ( userId: string, details: storageManagerInterfaces.core.user.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    let userObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( userId ) );

      } )
      .then(( user: Model ) => {

        return this.generateUpdateDetails( user, details )
          .then(( fedUser: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedUser.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedUser );
                }
              } );
            } );

          } );

      } )
      .then(( updatedUser: Model ) => {

        return this.convertToAbstract( [ updatedUser ] );

      } )
      .then(( convertedUsers: interfaces.dataModel.core.user.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: userId,
            documents: convertedUsers
          } );
          resolve();
        } );

        return Promise.resolve( convertedUsers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: userId,
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

  readonly remove = ( filtrationCriteria: storageManagerInterfaces.core.user.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( userId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( userId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: userId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: userId,
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

  private readonly makeConditions = ( filtrationCriteria: storageManagerInterfaces.core.user.FiltrationCriteria ): Promise<QueryConditions> => {

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

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageManagerInterfaces.core.user.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageManagerInterfaces.core.user.UpdateDetails ): Promise<Model> => {

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

      if ( details.residentialDetails ) {
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

  /*****************************************************************/

  private readonly convertToAbstract = ( users: Model[], forceThrow = false ): Promise<interfaces.dataModel.core.user.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.core.user.Super[]>(( resolve, reject ) => {

          let returnUsers: interfaces.dataModel.core.user.Super[] = [];

          users.forEach(( user ) => {

            let returnUser: interfaces.dataModel.core.user.Super = {
              id: ( <mongoose.Types.ObjectId>user._id ).toHexString(),
              emailAddress: user.emailAddress,
              accessLevel: user.accessLevel,
              password: user.password,
              verification: {
                id: user.verification._id,
                verified: user.verification.verified,
                numVerAttempts: user.verification.numVerAttempts,
                createdAt: user.verification.createdAt,
                updatedAt: user.verification.updatedAt
              },
              activeApps: user.activeApps,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            };

            if ( user.resetCode ) {
              returnUser.resetCode = user.resetCode;
            }

            if ( user.verification.verificationCode ) {
              returnUser.verification.verificationCode = user.verification.verificationCode;
            }

            if ( user.personalDetails ) {
              returnUser.personalDetails = {
                id: user.personalDetails._id,
                firstName: user.personalDetails.firstName,
                lastName: user.personalDetails.lastName,
                createdAt: user.personalDetails.createdAt,
                updatedAt: user.personalDetails.updatedAt
              };
            }

            if ( user.contactDetails ) {
              returnUser.contactDetails = {
                id: user.contactDetails._id,
                phoneNumbers: user.contactDetails.phoneNumbers,
                createdAt: user.contactDetails.createdAt,
                updatedAt: user.contactDetails.updatedAt
              };
            }

            returnUsers.push( returnUser );

          } );

          resolve( returnUsers );

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

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageManagerInterfaces.core.User => {
  return new MongoUser( {
    emitter: emitterFactory( params.emitEvent ),
    Model: UserMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
