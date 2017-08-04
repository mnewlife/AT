/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as coreInterfaces from "../../../../interfaces/components/core/index";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";
import * as sessionManagerInterfaces from "../../../../interfaces/utilities/session-manager/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

import { defaultPassword } from "../../../../components/core/config";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Registration implements coreInterfaces.admin.Registration {

  private readonly emitter: coreInterfaces.admin.registration.Emitter;
  private readonly storeNewUser: storageManagerInterfaces.user.Add;
  private readonly generateVerificationCode: coreInterfaces.sharedCode.verification.GenerateCode;
  private readonly verifyAccountLogic: coreInterfaces.sharedCode.verification.VerifyAccount;
  private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  private readonly getCurrentUserFromSession: sessionManagerInterfaces.GetCurrentUser;

  constructor( params: coreInterfaces.admin.registration.Params ) {
    this.emitter = params.emitter;
    this.storeNewUser = params.storeNewUser;
    this.generateVerificationCode = params.generateVerificationCode;
    this.verifyAccountLogic = params.verifyAccountLogic;
    this.checkThrow = params.checkThrow;
  }

  addAdmin = ( emailAddress: string, req: express.Request, forceThrow = false ): Promise<dataImplementations.UserModel> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getCurrentUserFromSession( req );
      } )
      .then(( currentUser: dataImplementations.UserModel ) => {
        return new Promise<void>(( resolve, reject ) => {
          if ( currentUser.accessLevel !== "developer" ) {
            return reject( {
              identifier: "UnauthorizedUser",
              data: {
                user: currentUser
              }
            } );
          }
          resolve();
        } );
      } )
      .then(( response: any ) => {
        return this.generateVerificationCode();
      } )
      .then(( generatedCode: string ) => {
        return this.storeNewUser( emailAddress, defaultPassword, "admin", generatedCode );
      } )
      .then(( addedUser: dataImplementations.UserModel ) => {
        new Promise<void>(( resolve, reject ) => {
          this.emitter.addedAdmin( {
            user: addedUser
          } );
          resolve();
        } );
        return Promise.resolve( addedUser );
      } )
      .catch(( reason: any ) => {
        new Promise<void>(( resolve, reject ) => {
          this.emitter.addAdminFailed( {
            emailAddress: emailAddress,
            reason: reason
          } );
          resolve();
        } );
        return Promise.reject( {
          identifier: "AddAdminFailed",
          data: {
            reason: reason
          }
        } );
      } );

  }

  verifyAccount = ( userId: string, code: string, forceThrow = false ): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  storeNewUser: storageManagerInterfaces.user.Add,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  getCurrentUserFromSession: sessionManagerInterfaces.GetCurrentUser;
  sharedCode: coreInterfaces.SharedCode
} ): coreInterfaces.admin.Registration => {
  return new Registration( {
    emitter: emitterFactory( params.emitEvent ),
    storeNewUser: params.storeNewUser,
    generateVerificationCode: params.sharedCode.verification.generateCode,
    verifyAccountLogic: params.sharedCode.verification.verifyAccount,
    checkThrow: params.checkThrow,
    getCurrentUserFromSession: params.getCurrentUserFromSession
  } )
}

/******************************************************************************/

