/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/storage-manager/user/index";
import * as getParams from "../../../../interfaces/data-model/get-params/user/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";
import * as userInterfaces from "../../../../interfaces/utilities/storage-manager/user/index";

import * as dataStructuresInterfaces from "../../../../interfaces/utilities/shared-logic/data-structures/index";

import MongoController from "../mongo-controller/index";
import { UserModel, UserMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageUser extends MongoController implements storageManagerInterfaces.StorageUser {

  /*****************************************************************/

  constructor( protected readonly emitter: userInterfaces.Emitter, protected readonly Model: mongoose.Model<mongoose.Document>, mapDetails: dataStructuresInterfaces.MapDetails ) {
    super( emitter, Model, mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow = false ): Promise<UserModel[]> => {

    let params: any = {
      conditions: "",
      sortCriteria: "",
      limit: 0
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.makeSortCriteria( sortCriteria );

      } )
      .then(( retrievedSortCriteria: string ) => {

        if ( retrievedSortCriteria ) {
          params.sortCriteria = retrievedSortCriteria;
        }

        if ( limit ) {
          params.limit = limit;
        }

        return Promise.resolve();

      } )
      .then(( response: any ) => {

        return this.find( params.conditions, params.sortCriteria, params.limit );

      } )
      .then(( foundUsers: UserModel[] ) => {

        return Promise.resolve( foundUsers );

      } )
      .then(( foundUsers: UserModel[] ) => {

        new Promise<UserModel[]>(( resolve, reject ) => {

          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            numDocuments: foundUsers.length
          } );

          resolve();

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

          } );

        return Promise.resolve( foundUsers );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );

          resolve();

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly getById = ( userIdString: string, forceThrow = false ): Promise<any> => {

    let userId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        userId = mongoose.Types.ObjectId( userIdString );

        return this.findById( userId );

      } )
      .then(( foundUser: UserModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.gotById( {
            id: userId
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

          } );

        return Promise.resolve( foundUser );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getByIdFailed( {
            id: userId,
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly addBatch = ( users: userInterfaces.AddBatchParams[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMulitpleDocuments( users.map(( user ) => {

          return {
            emailAddress: user.emailAddress,
            password: user.password,
            accessLevel: user.accessLevel,
            resetCode: "",
            verification: {
              verified: false,
              verificationCode: "",
              numVerAttempts: 0
            },
            personalDetails: {
              firstName: "",
              lastName: "",
              dateOfBirth: new Date(),
              age: 0,
              gender: ""
            },
            contactDetails: {
              phoneNumbers: []
            },
            residentialDetails: {
              country: "",
              province: "",
              address: ""
            },
            activeApps: []
          };

        } ) );

      } )
      .then(( users: UserModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          users.forEach(( user: UserModel ) => {

            this.emitter.added( {
              document: user
            } );

          } );

          resolve();

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

          } );

        return Promise.resolve( users );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: users,
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly add = ( emailAddress: string, password: string, accessLevel: interfaces.dataModel.AccessLevel, verificationCode: string, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( {
          emailAddress: emailAddress,
          password: password,
          accessLevel: accessLevel,
          resetCode: "",
          verification: {
            verified: false,
            verificationCode: "",
            numVerAttempts: 0
          },
          personalDetails: {
            firstName: "",
            lastName: "",
            dateOfBirth: new Date(),
            age: 0,
            gender: ""
          },
          contactDetails: {
            phoneNumbers: []
          },
          residentialDetails: {
            country: "",
            province: "",
            address: ""
          },
          activeApps: []
        } );

      } )
      .then(( user: UserModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.added( {
            document: user
          } );

        } );

        return Promise.resolve( user );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: {
              emailAddress: emailAddress,
              password: password
            },
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly update = ( filtrationCriteria: getParams.FiltrationCriteria, details: userInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: "",
      details: ""
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        if ( details ) {
          params.details = details;
        }

        return this.updateDocuments( params.conditions, params.details );

      } )
      .then(( updatedDocuments: UserModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: UserModel ) => {

            this.emitter.updated( {
              conditions: filtrationCriteria,
              document: document
            } );

          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

          } );

        return Promise.resolve( updatedDocuments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            details: details,
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly updateById = ( userIdString: string, details: userInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: ""
    };

    let userId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        userId = mongoose.Types.ObjectId( userIdString );

        params.conditions = {
          "_id": userId
        };

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        return this.updateDocuments( params.conditions, details );

      } )
      .then(( updatedDocuments: UserModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: UserModel ) => {

            this.emitter.updated( {
              id: userId,
              document: document
            } );

          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

          } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            id: userId,
            details: details,
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly remove = ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            conditions: filtrationCriteria
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  readonly removeById = ( userIdString: string, forceThrow?: boolean ): Promise<any> => {

    let userId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        userId = mongoose.Types.ObjectId( userIdString );

        return this.removeDocuments( {
          "_id": userId
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            id: userId
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

          } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removeFailed( {
            id: userId,
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Emit Event Failed: " + reason );

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

  private readonly makeConditions = ( filtrationCriteria: getParams.FiltrationCriteria ): Promise<any> => {

    let conditions: any = {};

    return new Promise<any>(( resolve, reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "emailAddress" ) ) {
        conditions[ "emailAddress" ] = filtrationCriteria.emailAddress;
      }

      if ( filtrationCriteria.hasOwnProperty( "verified" ) ) {
        conditions[ "verification.verified" ] = ( filtrationCriteria.verified ) ? true : false;
      }

      if ( filtrationCriteria.hasOwnProperty( "numVerAttemptsMin" ) || filtrationCriteria.hasOwnProperty( "numVerAttemptsMax" ) ) {
        conditions[ "verification.numVerAttempts" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "numVerAttemptsMin" ) ) {
        conditions[ "verification.numVerAttempts" ].$gte = filtrationCriteria.numVerAttemptsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numVerAttemptsMax" ) ) {
        conditions[ "verification.numVerAttempts" ].$lte = filtrationCriteria.numVerAttemptsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "accessLevel" ) ) {
        conditions[ "accessLevel" ] = filtrationCriteria.accessLevel;
      }

      if ( filtrationCriteria.hasOwnProperty( "ageMin" ) || filtrationCriteria.hasOwnProperty( "ageMax" ) ) {
        conditions[ "personalDetails.age" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "ageMin" ) ) {
        conditions[ "personalDetails.age" ].$gte = filtrationCriteria.ageMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "ageMax" ) ) {
        conditions[ "personalDetails.age" ].$lte = filtrationCriteria.ageMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "gender" ) ) {
        conditions[ "personalDetails.gender" ] = filtrationCriteria.gender;
      }

      if ( filtrationCriteria.hasOwnProperty( "country" ) ) {
        conditions[ "residentialDetails.country" ] = filtrationCriteria.country;
      }

      if ( filtrationCriteria.hasOwnProperty( "province" ) ) {
        conditions[ "residentialDetails.province" ] = filtrationCriteria.province;
      }

      if ( filtrationCriteria.hasOwnProperty( "activeApps" ) ) {
        conditions[ "activeApps" ] = {};
        conditions[ "activeApps" ].$all = filtrationCriteria.activeApps;
      }

      if ( filtrationCriteria.hasOwnProperty( "textSearch" ) ) {
        conditions.$text = {
          $search: filtrationCriteria.textSearch
        };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: getParams.SortCriteria ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      let sortString: string;
      let criteria: string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      if ( sortCriteria.criteria == "numVerAttempts" ) {
        criteria = "verification.numVerAttempts";
      } else if ( sortCriteria.criteria == "age" ) {
        criteria = "personalDetails.age";
      } else {
        criteria = sortCriteria.criteria;
      }

      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + criteria;
      } else {
        sortString = criteria;
      }

      resolve( sortString );

    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( details: userInterfaces.UpdateDetails ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails: any = {};

      if ( details.emailAddress ) {
        updateDetails.emailAddress = details.emailAddress;
      }

      if ( details.password ) {
        updateDetails.password = details.password;
      }

      if ( details.verified ) {
        updateDetails.verification = {
          verified: details.verified
        };
      }

      if ( details.verificationCode ) {
        if ( updateDetails.verification ) {
          updateDetails.verification.verificationCode = details.verificationCode;
        } else {
          updateDetails.verification = {
            verificationCode: details.verificationCode
          }
        }
      }

      if ( details.numVerAttempts ) {
        if ( updateDetails.verification ) {
          updateDetails.verification.numVerAttempts = details.numVerAttempts;
        } else {
          updateDetails.verification = {
            numVerAttempts: details.numVerAttempts
          }
        }
      }

      if ( details.firstName ) {
        if ( updateDetails.personalDetails ) {
          updateDetails.personalDetails.firstName = details.firstName;
        } else {
          updateDetails.personalDetails = {
            firstName: details.firstName
          }
        }
      }

      if ( details.lastName ) {
        if ( updateDetails.personalDetails ) {
          updateDetails.personalDetails.lastName = details.lastName;
        } else {
          updateDetails.personalDetails = {
            lastName: details.lastName
          }
        }
      }

      if ( details.dateOfBirth ) {
        if ( updateDetails.personalDetails ) {
          updateDetails.personalDetails.dateOfBirth = details.dateOfBirth;
        } else {
          updateDetails.personalDetails = {
            dateOfBirth: details.dateOfBirth
          }
        }
      }

      if ( details.age ) {
        if ( updateDetails.personalDetails ) {
          updateDetails.personalDetails.age = details.age;
        } else {
          updateDetails.personalDetails = {
            age: details.age
          }
        }
      }

      if ( details.gender ) {
        if ( updateDetails.personalDetails ) {
          updateDetails.personalDetails.gender = details.gender;
        } else {
          updateDetails.personalDetails = {
            gender: details.gender
          }
        }
      }

      if ( details.phoneNumbers ) {
        if ( updateDetails.contactDetails ) {
          updateDetails.contactDetails.phoneNumbers = details.phoneNumbers;
        } else {
          updateDetails.contactDetails = {
            phoneNumbers: details.phoneNumbers
          }
        }
      }

      if ( details.country ) {
        if ( updateDetails.residentialDetails ) {
          updateDetails.residentialDetails.country = details.country;
        } else {
          updateDetails.residentialDetails = {
            country: details.country
          }
        }
      }

      if ( details.province ) {
        if ( updateDetails.residentialDetails ) {
          updateDetails.residentialDetails.province = details.province;
        } else {
          updateDetails.residentialDetails = {
            province: details.province
          }
        }
      }

      if ( details.address ) {
        if ( updateDetails.residentialDetails ) {
          updateDetails.residentialDetails.address = details.address;
        } else {
          updateDetails.residentialDetails = {
            address: details.address
          }
        }
      }

      if ( details.activeApps ) {
        updateDetails.activeApps = details.activeApps
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , num : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageUser => {
=======
export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageUser => {
>>>>>>> workarea
=======
export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: interfaces.utilities.sharedLogic.dataStructures.MapDetails ): interfaces.utilities.storageManager.StorageUser => {
>>>>>>> workarea
=======
export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: dataStructuresInterfaces.MapDetails ): storageManagerInterfaces.StorageUser => {
>>>>>>> workarea

  return new MongoStorageUser( emitterFactory( emitEvent ), UserMongooseModel, mapDetails );

}

/******************************************************************************/
