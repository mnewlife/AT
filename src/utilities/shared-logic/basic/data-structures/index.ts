/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic/index";


import emitterFactory from "./event-emitter";

/******************************************************************************/

class DataStructures implements sharedLogicInterfaces.DataStructures {

  private readonly emitter: sharedLogicInterfaces.dataStructures.Emitter;

  /*****************************************************************/

  constructor( emitter: sharedLogicInterfaces.dataStructures.Emitter ) {
    this.emitter = emitter;
  }

  /*****************************************************************/

  private readonly checkThrow = ( forceThrow?: boolean ) => {
    return new Promise<any>(( resolve, reject ) => {
      if ( forceThrow ) {
        throw new Error( "Forced Throw!" );
      }
      resolve();
    } );
  }

  /*****************************************************************/

  readonly findInArray = ( arr: any[], id: string, criteria: string, forceThrow = false ): Promise<any[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<any[]>(( resolve, reject ) => {

          let missedCriteria: number = 0;

          let matches = arr.filter( function ( subject: any ) {
            if ( subject[ criteria ] ) {
              return ( subject[ criteria ] === id );
            } else {
              missedCriteria += 1;
            }
          } );

          if ( arr.length !== 0 && missedCriteria === arr.length ) {
            new Promise<void>(( resolve, reject ) => {
              this.emitter.findInArrayInvalidCriteria( {
                arr: arr,
                id: id,
                criteria: criteria
              } );
            } );
            resolve();
          }

          resolve( matches );

        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.findInArrayFailed( {
            arr: arr,
            id: id,
            criteria: criteria,
            reason: reason
          } );
        } );

        return Promise.reject( {
          identifier: "FindInArrayFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly removeFromArray = ( arr: any[], identifier: string | any, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<any>(( resolve, reject ) => {

          if ( typeof identifier === "string" ) {
            removeById( identifier );
          } else {
            removeByElement( identifier );
          }

          function removeById ( id: string ) {
            this.findInArray( arr, id, "_id" )
              .then( function ( matches: any[] ) {
                if ( matches.length ) {
                  matches.forEach( function ( match: any ) {
                    arr.splice( arr.indexOf( match ), 1 );
                  } );
                }
                resolve();
              } );
          }

          function removeByElement ( element: any ) {
            let index = arr.indexOf( element );
            if ( index !== -1 ) {
              arr.splice( index, 1 );
            }
            resolve();
          }

        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.removeFromArrayFailed( {
            arr: arr,
            identifier: identifier,
            reason: reason
          } );
        } );

        return Promise.reject( {
          identifier: "RemoveFromArrayFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly pushToArray = ( items: any[], destination: any[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {
          items.forEach( function ( item: any ) {
            destination.push( item );
          } );
          resolve();
        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.pushToArrayFailed( {
            items: items,
            destination: destination,
            reason: reason
          } );
        } );

        return Promise.reject( {
          identifier: "PushToArrayFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly mapDetails = ( details: any, destination: any, forceThrow = false ): Promise<any> => {

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
          this.emitter.mapDetailsFailed( {
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

  readonly sortObjectArray = ( array: any[], criteria: string, order: "Ascending" | "Descending", forceThrow?: boolean ): Promise<any[]> => {

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
          this.emitter.sortObjectArrayFailed( {
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

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit ): sharedLogicInterfaces.DataStructures => {

  return new DataStructures( emitterFactory( emitEvent ) );

}

/******************************************************************************/
