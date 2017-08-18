/******************************************************************************/

import { expect } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";

import * as src from "../../../../../src/src/index";

import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

/******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

/******************************************************************************/

describe( "Remove From Array" , function() : void {

  /************************************************************/

    beforeEach( function () {
      emitEventSpy = sandbox.spy();
    } );

    afterEach( function () {
      sandbox.restore();
    } );

  /************************************************************/

  it( "should remove array elements based on given _id" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { _id : "Johann" , content : "Bach" } ,
      { _id : "Wolfgang" , content : "Mozart" } ,
      { _id : "Ludwig" , content : "Beethoven" }
    ];

    return dataStructures.removeFromArray( arr , "Ludwig" )
      .then( function () {

        let expectedResults = [
          { _id : "Johann" , content : "Bach" } ,
          { _id : "Wolfgang" , content : "Mozart" }
        ];

        expect( arr ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should remove array elements provided as arguments" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { id : "Johann" , content : "Bach" } ,
      { id : "Wolfgang" , content : "Mozart" } ,
      { id : "Ludwig" , content : "Beethoven" }
    ];

    let cull : any = arr[ 0 ];

    return dataStructures.removeFromArray( arr , cull )
      .then( function () {

        let expectedResults = [
          { id : "Wolfgang" , content : "Mozart" } ,
          { id : "Ludwig" , content : "Beethoven" }
        ];

        expect( arr ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should leave array intact if no matching _id is found" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { _id : "Johann" , content : "Bach" } ,
      { _id : "Wolfgang" , content : "Mozart" } ,
      { _id : "Ludwig" , content : "Beethoven" }
    ];

    return dataStructures.removeFromArray( arr , "Zimmer" )
      .then( function () {

        expect( arr ).to.eql( arr );

      } );

  } );

  /************************************************************/

  it( "should leave array intact if no matching elements are found" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { _id : "Johann" , content : "Bach" } ,
      { _id : "Wolfgang" , content : "Mozart" } ,
      { _id : "Ludwig" , content : "Beethoven" }
    ];

    let cull : any = { _id : "Hans" , content : "Zimmer" };

    return dataStructures.removeFromArray( arr , cull )
      .then( function () {

        expect( arr ).to.eql( arr );

      } );

  } );

  /************************************************************/

  it( "should leave array intact if provided elements are not of the same type" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { _id : "Johann" , content : "Bach" } ,
      { _id : "Wolfgang" , content : "Mozart" } ,
      { _id : "Ludwig" , content : "Beethoven" }
    ];

    let cull : any = { different : "Hans" , type : "Zimmer" };

    return dataStructures.removeFromArray( arr , cull )
      .then( function () {

        expect( arr ).to.eql( arr );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [];

    return dataStructures.removeFromArray( arr , "Johann" , true )
      .catch( function ( reason : any ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should structure rejections as planned" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.removeFromArray( [] , "Johann" , true )
      .catch( function ( reason : any ) {

        expect( reason.identifier ).to.satisfy( function ( identifier : string ) : boolean {

          let acceptableIdentifiers = [
            "RemoveFromArrayFailed"
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
