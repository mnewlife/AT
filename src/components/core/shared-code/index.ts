/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic/index";
import * as storageManagerInterfaces from "../../../interfaces/utilities/storage-manager/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as componentsInterfaces from "../../../interfaces/components/index";

import * as dataImplementations from "../../../interfaces/data-model/implementations/index";

/******************************************************************************/

class SharedCode implements componentsInterfaces.core.SharedCode {

  private readonly generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber;
  private readonly getUserById: storageManagerInterfaces.user.GetById;
  private readonly updateUserById: storageManagerInterfaces.user.UpdateById;

  constructor( params: componentsInterfaces.core.sharedCode.Params ) {
    this.generateRandomNumber = params.generateRandomNumber;
    this.getUserById = params.getUserById;
    this.updateUserById = params.updateUserById;
  }

  readonly verification = {
    generateCode: (): Promise<string> => {
      return Promise.all( [
        this.generateRandomNumber( 70000, 90000 ),
        this.generateRandomNumber( 10000, 60000 )
      ] )
        .then(( numbers: number[] ) => {
          return new Promise<string>(( resolve, reject ) => {
            resolve( String( numbers[ 0 ] ) + String( numbers[ 1 ] ) );
          } );
        } );
    },
    verifyAccount: ( userId: string, code: string ): Promise<void> => {

      return this.getUserById( userId )
        .then(( foundUser: dataImplementations.UserModel ) => {
          return new Promise<dataImplementations.UserModel>(( resolve, reject ) => {
            if ( foundUser.verification.verified ) {
              return reject( {
                identifier: "AlreadyVerified",
                data: {}
              } );
            }
            if ( !foundUser.verification.verificationCode ) {
              return reject( {
                identifier: "UserWithoutVerificationCode",
                data: {}
              } );
            }
            if ( foundUser.verification.verificationCode !== code ) {
              return reject( {
                identifier: "InvalidVerificationCode",
                data: {
                  correctCode: foundUser.verification.verificationCode
                }
              } );
            }
            return Promise.resolve( foundUser );
          } );
        } )
        .then(( user: dataImplementations.UserModel ) => {
          return this.updateUserById( userId, {
            verified: true,
            verificationCode: null
          } );
        } )
        .then(( updatedUser: dataImplementations.UserModel ) => {
          return Promise.resolve();
        } );
        
    }
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: componentsInterfaces.SharedCode ): componentsInterfaces.core.SharedCode => {
  return new SharedCode( {
    generateRandomNumber: config.utilities.sharedLogic.numbers.generateRandomNumber,
    getUserById: config.utilities.storageManager.user.getById,
    updateUserById: config.utilities.storageManager.user.updateById
  } )
}

/******************************************************************************/

