/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as authentication from "../../../../components/authentication/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Helpers implements interfaces.Instance {

  /****************************************************************/

  constructor( private readonly checkThrow: moders.CheckThrow ) { }

  /****************************************************************/

  cleanUsers = ( users: dataModel.core.user.Super[], forceThrow = false ): Promise<dataModel.core.user.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return Promise.all( users.map(( user ) => {
          return new Promise<dataModel.core.user.Super>(( resolve, reject ) => {
            user.password = "";
            if ( user.resetCode ) {
              user.resetCode = "";
            }
            if ( user.verification.verificationCode ) {
              user.verification.verificationCode = "";
            }
            resolve( user );
          } );
        } ) );

      } );

  }

  /****************************************************************/

}

/******************************************************************************/