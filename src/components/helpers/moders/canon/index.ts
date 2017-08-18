/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../interfaces";

/******************************************************************************/

export default class Moders implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor() { }

  /*****************************************************************/

  readonly checkThrow = ( forceThrow: boolean ) => {
    return new Promise<void>(( resolve, reject ) => {
      if ( forceThrow ) {
        throw new Error( "Forced Throw!" );
      }
      resolve();
    } );
  }

  /*****************************************************************/

}

/******************************************************************************/
