/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";

import * as src from "../../../../../src/src/index";

import numbersFactory from "../../../../../src/components/shared-logic/basic/numbers/index";

/******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

/******************************************************************************/

describe( "Generate Random Number" , function() : void {

  /************************************************************/

    beforeEach( function () {
      emitEventSpy = sandbox.spy();
    } );

    afterEach( function () {
      sandbox.restore();
    } );

  /************************************************************/

  it( "should generate a random number within the given range" , function () {

    let numbers = numbersFactory( emitEventSpy );

    let min : number = 300;
    let max : number = 600;

    return numbers.generateRandomNumber( min , max )
      .then( function ( generatedNumber : number ) {

        expect( generatedNumber ).to.be.within( min , max );

      } );

  } );

  /************************************************************/

  it( "should reject if min is greater than max" , function () {

    let numbers = numbersFactory( emitEventSpy );

    let min : number = 700;
    let max : number = 200;

    return numbers.generateRandomNumber( min , max )
    .catch( function ( reason : any ) {

      sinon.assert.calledOnce( emitEventSpy );

    } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , function () {

    let numbers = numbersFactory( emitEventSpy );

    let min : number = 200;
    let max : number = 700;

    return numbers.generateRandomNumber( min , max , true )
      .catch( function ( reason : any ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should structure rejections as planned" , function () {

    let numbers = numbersFactory( emitEventSpy );

    let min : number = 200;
    let max : number = 700;

    return numbers.generateRandomNumber( min , max , true )
      .catch( function ( reason : any ) {

        expect( reason.identifier ).to.satisfy( function ( identifier : string ) : boolean {

          let acceptableIdentifiers = [
            "GenerateRandomNumberFailed"
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
