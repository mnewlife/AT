/******************************************************************************/

import * as Promise from "bluebird";

import * as moders from "../../moders/interfaces";
import * as interfaces from "../interfaces";
import * as Events from "../events/interfaces";

/******************************************************************************/

export default class Canon implements interfaces.Instance {

  /*****************************************************************/

  constructor(
    private readonly events: Events.Instance,
    private readonly checkThrow: moders.CheckThrow
  ) { }

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
          this.events.generateRandomNumberFailed( {
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
