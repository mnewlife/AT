/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Numbers implements sharedLogicInterfaces.Numbers {

  private readonly emitter: sharedLogicInterfaces.numbers.Emitter;

  /*****************************************************************/

  constructor( emitter: sharedLogicInterfaces.numbers.Emitter ) {
    this.emitter = emitter;
  }

  /*****************************************************************/

  private readonly checkThrow = ( forceThrow: boolean ) => {
    return new Promise<any>(( resolve, reject ) => {
      if ( forceThrow ) {
        throw new Error( "Forced Throw!" );
      }
      resolve();
    } );
  }

  /*****************************************************************/

  readonly generateRandomNumber = ( min: number, max: number, forceThrow = false ): Promise<number> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<number>(( resolve, reject ) => {
          if ( min > max ) {
            return Promise.reject( new Error( "Minimun is greater than maximum" ) );
          }
          min = ( min ) ? min : 1235;
          max = ( max ) ? max : 9875;
          resolve( Math.floor( Math.random() * ( max - min + 1 ) ) + min );
        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.generateRandomNumberFailed( {
            min: min,
            max: max,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "GenerateRandomNumberFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit ): sharedLogicInterfaces.Numbers => {
  return new Numbers( emitterFactory( emitEvent ) );
}

/******************************************************************************/
