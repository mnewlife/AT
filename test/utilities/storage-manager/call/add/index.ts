/******************************************************************************/

import { expect, assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageCallFactory from "../../../../../src/components/storage/mongodb/call/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { CallModel } from "../../../../../src/components/storage/mongodb/call/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "Call AddDetailsD", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: CallModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageCall: src.components.storage.StorageCall;

  /************************************************************/

  before(( done ) => {

    prep( done );

    dataStructures = dataStructuresFactory( sandbox.spy() );

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

  it( "should add a new call record", () => {

    let callerId = mongoose.Types.ObjectId();
    let channelId = mongoose.Types.ObjectId();
    let calleeId = mongoose.Types.ObjectId();
    let callDetails = {
      duration: 300
    };

    return storageCall.add( callerId, channelId, calleeId, callDetails )
      .then(( call: CallModel ) => {

        expect( call ).to.satisfy(( call: CallModel ) => {

          if ( !call || !call._id ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( String( call.callerId ) !== String( callerId ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( call.callDetails.duration !== 300 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding new call document", () => {

    let callerId = mongoose.Types.ObjectId();
    let channelId = mongoose.Types.ObjectId();
    let calleeId = mongoose.Types.ObjectId();
    let callDetails = {
      duration: 300
    };

    return storageCall.add( callerId, channelId, calleeId, callDetails )
      .then(( call: dataModel.Call ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.call.Added;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.call.Added ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCall" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Added" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "document" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {
    
    return storageCall.add( null, null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.call.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.call.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCall" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "AddFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "details" ) ) {
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

    return storageCall.add( null, null, null, null, true )
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

          if ( reason.identifier !== "AddFailed" ) {
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
