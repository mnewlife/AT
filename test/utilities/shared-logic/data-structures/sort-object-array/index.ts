/******************************************************************************/

import { expect } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import * as interfaces from "../../../../../src/interfaces/index";

import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

/******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

/******************************************************************************/

describe( "Sort Object Array" , function() : void {

  /************************************************************/

    beforeEach( function () {
      emitEventSpy = sandbox.spy();
    } );

    afterEach( function () {
      sandbox.restore();
    } );

  /************************************************************/

  it( "should sort array according to specified criteria" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let array : any[] = [
      { field : { a : 10 } } ,
      { field : { a : 20 } } ,
      { field : { a : 30 } } ,
      { field : { a : 40 } } ,
    ];

    let array2 : any[] = [
      { field : { a : 10 } } ,
      { field : { a : 20 } } ,
      { field : { a : 30 } } ,
      { field : { a : 40 } } ,
    ];

    return Promise.all( [

      dataStructures.sortObjectArray( array , "field.a" , "Ascending" ) ,
      dataStructures.sortObjectArray( array2 , "field.a" , "Descending" )

    ] )
    .then( ( response : any ) => {

      expect( response ).to.satisfy( ( arrays : any[][] ) => {

        if ( !arrays ) {
          console.log( "a" );
          return false;
        }

        if ( arrays.length !== 2 ) {
          console.log( "b" );
          return false;
        }

        if ( arrays[ 0 ][ 0 ].field.a !== 10 ) {
          console.log( "c" + arrays[ 0 ][ 0 ].field.a );
          return false
        }
        if ( arrays[ 0 ][ 1 ].field.a !== 20 ) {
          console.log( "d" );
          return false
        }

        if ( arrays[ 1 ][ 0 ].field.a !== 40 ) {
          console.log( "e" );
          return false
        }
        if ( arrays[ 1 ][ 1 ].field.a !== 30 ) {
          console.log( "f" );
          return false
        }

        return true;

      } );

    } )

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.sortObjectArray( null , null , null , true )
      .catch( function ( reason : any ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should structure rejections as planned" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.sortObjectArray( null , null , null , true )
      .catch( function ( reason : any ) {

        expect( reason.identifier ).to.satisfy( function ( identifier : string ) : boolean {

          let acceptableIdentifiers = [
            "sortObjectArrayFailed"
          ];

          let matches = acceptableIdentifiers.filter( function ( subject : string ) {
            return ( subject === identifier );
          } );

          return ( matches.length > 0 );

        } );

      } );

  } );

  /************************************************************/

} );

/******************************************************************************/
