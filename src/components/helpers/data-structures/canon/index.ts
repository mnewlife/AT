/******************************************************************************/

import * as Promise from "bluebird";

import * as moders from "../../moders/interfaces";
import * as interfaces from "../interfaces";
import * as Events from "../events/interfaces";

/******************************************************************************/

export default class DataStructures implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor(
    private readonly events: Events.ClassInstance,
    private readonly checkThrow: moders.CheckThrow
  ) { }

  /*****************************************************************/

  readonly mapDetails = ( details: any, destination: any, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {

          for ( let detail in details ) {
            if ( details.hasOwnProperty( detail ) ) {
              if ( isObjLiteral( details[ detail ] ) ) {
                this.mapDetails( details[ detail ], destination[ detail ] );
              } else {
                destination[ detail ] = details[ detail ];
              }
            }
          }

          resolve();

        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.mapDetailsFailed( {
            details: details,
            destination: destination,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "mapDetailsFailed",
          data: {
            reason: reason
          }
        } );

      } );

    function isObjLiteral ( obj: any ) {
      var test = obj;
      return ( typeof obj !== "object" || obj === null ? false : ( function () {
        while ( !false ) {
          if ( Object.getPrototypeOf( test = Object.getPrototypeOf( test ) ) === null ) {
            break;
          }
        }
        return Object.getPrototypeOf( obj ) === test;
      } )() );
    }

  }

  /*****************************************************************/

  readonly sortObjectArray = ( array: any[], criteria: string, order: "Ascending" | "Descending", forceThrow = false ): Promise<any[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<any[]>(( resolve, reject ) => {

          let referenceArray: string[] = criteria.split( "." );

          array.sort(( alpha: any, beta: any ): number => {
            let alphaValue = this.getPropertyReference( alpha, referenceArray );
            let betaValue = this.getPropertyReference( beta, referenceArray );
            if ( alphaValue < betaValue ) return ( order === "Ascending" ) ? -1 : 1;
            if ( alphaValue > betaValue ) return ( order === "Ascending" ) ? 1 : -1;
            return 0;
          } );

          resolve( array );

        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.sortObjectArrayFailed( {
            array: array,
            criteria: criteria,
            order: order,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "sortObjectArrayFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly getPropertyReference = ( object: any, referenceArray: string[], forceThrow = false ): any => {
    for ( let i = 0; i < referenceArray.length; i++ ) {
      if ( !object ) return null;
      object = object[ referenceArray[ i ] ];
    }
    return object;
  }

  /*****************************************************************/

}

/******************************************************************************/
