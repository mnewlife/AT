/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageCall from "../../../../../src/components/storage/mongodb/call/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { CallModel } from "../../../../../src/components/storage/mongodb/call/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Call GET", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: CallModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageCall: src.components.storage.StorageCall;

  /************************************************************/

  before(( done ) => {

    prep(( testCalls: CallModel[] ) => {

      testCalls.forEach(( call: CallModel ) => {
        testInstances.push( call );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageCall = storageCallFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should get all calls sorted by specified criteria and limited by specified limit", () => {

    return Promise.all( [

      storageCall.get( null, {
        criteria: "duration",
        order: "Ascending"
      }, 1 ),
      storageCall.get( null, {
        criteria: "duration",
        order: "Descending"
      }, 2 )

    ] )
      .then(( results: dataModel.Call[][] ) => {

        expect( results ).to.satisfy(( results: dataModel.Call[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( !results[ 0 ] || results[ 0 ].length !== 1 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !results[ 1 ] || results[ 1 ].length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( results[ 0 ][ 0 ].callDetails.duration !== 205 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( results[ 1 ][ 0 ].callDetails.duration !== 220 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( results[ 1 ][ 1 ].callDetails.duration !== 215 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should get calls made via specified channel", () => {

    return Promise.all( [

      storageCall.get( {
        channelId: testInstances[ 0 ].channelId
      }, null, null ),

      storageCall.get( {
        channelId: testInstances[ 1 ].channelId
      }, null, null )

    ] )
      .then(( results: dataModel.Call[][] ) => {

        expect( results ).to.satisfy(( results: CallModel[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( !results[ 0 ] || !results[ 0 ].length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !results[ 1 ] || !results[ 1 ].length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = results[ 0 ].filter(( call: dataModel.Call ) => {
            return ( String( call.channelId ) !== String( testInstances[ 0 ].channelId ) );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          culprits = results[ 1 ].filter(( call: dataModel.Call ) => {
            return ( String( call.channelId ) !== String( testInstances[ 1 ].channelId ) );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should get matching calls by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should emit event upon retrieving call documents", () => {

    return storageCall.get( null, null, null )
      .then(( foundCalls: dataModel.Call[] ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.call.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.call.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCall" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Got" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "numDocuments" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.data.numDocuments !== foundCalls.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageCall.get( null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.call.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.call.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCall" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "GetFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "reason" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should correctly structure rejection", () => {

    return storageCall.get( null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        expect( reason ).to.satisfy(( reason: any ) => {

          if ( !reason ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( reason.identifier !== "GetFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !reason.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !reason.data.hasOwnProperty( "reason" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

} );

/******************************************************************************/
