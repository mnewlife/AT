/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";

import * as src from "../../../../../src/src/index";

import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

/******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

/******************************************************************************/

describe( "Find In Array" , function() : void {

  /************************************************************/

    beforeEach( () => {
      emitEventSpy = sandbox.spy();
    } );

    afterEach( () => {
      sandbox.restore();
    } );

  /************************************************************/

  it( "should find array elements matching string values based on valid criteria" , () => {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { id : "Johann" , content : "Bach" } ,
      { id : "Wolfgang" , content : "Mozart" } ,
      { id : "Ludwig" , content : "Beethoven" }
    ];

    return dataStructures.findInArray( arr , "Bach" , "content" )
      .then( function ( found : any[] ) {

        let expectedResults = [
          { id : "Johann" , content : "Bach" } ,
        ]

        expect( found ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should return no array elements if no match is found" , () => {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { id : "Johann" , content : "Bach" } ,
      { id : "Wolfgang" , content : "Mozart" } ,
      { id : "Ludwig" , content : "Beethoven" }
    ];

    return dataStructures.findInArray( arr , "Zimmer" , "content" )
      .then( function ( found : any[] ) {

        let expectedResults : any[] = [];

        expect( found ).to.eql( expectedResults );

      } );

  } );

  /************************************************************/

  it( "should emit an event in response to invalid criteria" , () => {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { id : "Johann" , content : "Bach" } ,
      { id : "Wolfgang" , content : "Mozart" } ,
      { id : "Ludwig" , content : "Beethoven" }
    ];

    return dataStructures.findInArray( arr , "Bach" , "definitelyInvalid" )
      .then( function ( found : any[] ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , () => {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { _id : "Johann" , content : "Bach" } ,
      { _id : "Wolfgang" , content : "Mozart" } ,
      { _id : "Ludwig" , content : "Beethoven" }
    ];

    let cull : any = { different : "Hans" , type : "Zimmer" };

    type FindInArrayFailed = src.events.components.sharedLogic.dataStructures.FindInArrayFailed;

    return dataStructures.findInArray( arr , "Bach" , "content" , true )
      .catch( function ( reason : any ) {

        sinon.assert.calledOnce( emitEventSpy );

      } );

  } );

  /************************************************************/

  it( "should structure rejections as planned" , () => {

    let dataStructures = dataStructuresFactory( emitEventSpy );

    let arr : any[] = [
      { _id : "Johann" , content : "Bach" } ,
      { _id : "Wolfgang" , content : "Mozart" } ,
      { _id : "Ludwig" , content : "Beethoven" }
    ];

    let cull : any = { different : "Hans" , type : "Zimmer" };

    return dataStructures.findInArray( arr , "Bach" , "content" , true )
      .catch( function ( reason : any ) {

        expect( reason.identifier ).to.satisfy( function ( identifier : string ) : boolean {

          let acceptableIdentifiers = [
            "FindInArrayFailed"
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
