/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";

import * as src from "../../../../../src/src/index";

import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

/******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

/******************************************************************************/

describe( "Push To Array" , function() : void {

  /************************************************************/

    beforeEach( function () {
      emitEventSpy = sandbox.spy();
    } );

    afterEach( function () {
      sandbox.restore();
    } );

  /************************************************************/

  it( "should push elements onto an array" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let items : any[] = [
      { id : "Johann" , content : "Bach" } ,
      { id : "Wolfgang" , content : "Mozart" }
    ];

    let destination : any[] = [
      { id : "Ludwig" , content : "Beethoven" }
    ];

    return dataStructures.pushToArray( items , destination )
      .then( function ( response : any ) {

        let expectedResults = [
          { id : "Ludwig" , content : "Beethoven" } ,
          { id : "Johann" , content : "Bach" } ,
          { id : "Wolfgang" , content : "Mozart" }
        ];

        expect( destination ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should not change destination if no items are provided" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let destination : any[] = [
      { id : "Johann" , content : "Bach" }
    ];

    return dataStructures.pushToArray( [] , destination )
      .then( function ( response : any ) {

        let expectedResults : any[] = [
          { id : "Johann" , content : "Bach" }
        ];

        expect( destination ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.pushToArray( [] , [ { one : "emit" } ] , true )
      .catch( function ( reason : any ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should structure rejections as planned" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.pushToArray( [] , [ { one : "reject" } ] , true )
      .catch( function ( reason : any ) {

        expect( reason.identifier ).to.satisfy( function ( identifier : string ) : boolean {

          let acceptableIdentifiers = [
            "PushToArrayFailed"
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
