/******************************************************************************/

import { expect } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";

import * as interfaces from "../../../../../src/interfaces/index";

import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

/******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

/******************************************************************************/

describe( "Map Details" , function() : void {

  /************************************************************/

    beforeEach( function () {
      emitEventSpy = sandbox.spy();
    } );

    afterEach( function () {
      sandbox.restore();
    } );

  /************************************************************/

  it( "should map details from one object to another" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let details : any = {
      one : "one" ,
      three  : "three"
    };

    let destination = {
      two : "two"
    };

    return dataStructures.mapDetails( details , destination )
      .then( function () {

        let expectedResults : any = {
          one : "one" ,
          two : "two" ,
          three  : "three"
        };

        expect( destination ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should leave destination object intact if no details are provided" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let destination : any = {
      one : "one"
    };

    return dataStructures.mapDetails( {} , destination )
      .then( function () {

        let expectedResults : any = {
          one : "one"
        };

        expect( destination ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.mapDetails( {} , {} , true )
      .catch( function ( reason : any ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should structure rejections as planned" , function () {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    return dataStructures.mapDetails( {} , {} , true )
      .catch( function ( reason : any ) {

        expect( reason.identifier ).to.satisfy( function ( identifier : string ) : boolean {

          let acceptableIdentifiers = [
            "MapDetailsFailed"
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
