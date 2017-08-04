/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageCallFactory from "../../../../../src/utilities/storage-manager/mongodb/call/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { CallModel } from "../../../../../src/utilities/storage-manager/mongodb/call/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "Call ADD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;
  let testInstances : CallModel[] = [];

  let dataStructures : interfaces.utilities.sharedLogic.DataStructures;
  let storageCall : interfaces.utilities.storageManager.StorageCall;

  /************************************************************/

  before( ( done ) => {

    prep( done );

    dataStructures = dataStructuresFactory( sandbox.spy() );

  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageCall = storageCallFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new call records" , () => {

    let newCallBatch = [
      {
        callerId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        calleeId : mongoose.Types.ObjectId() ,
        callDetails : {
          duration : 304
        }
      } ,
      {
        callerId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        calleeId : mongoose.Types.ObjectId() ,
        callDetails : {
          duration : 303
        }
      } ,
      {
        callerId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        calleeId : mongoose.Types.ObjectId() ,
        callDetails : {
          duration : 302
        }
      }
    ];

    return storageCall.addBatch( newCallBatch )
      .then( ( calls : CallModel[] ) => {

        expect( calls ).to.satisfy( ( calls : CallModel[] ) => {

           if ( !calls ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( calls.length != 3 ) {
                          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new call documents" , () => {

    let newCallBatch = [
      {
        callerId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        calleeId : mongoose.Types.ObjectId() ,
        callDetails : {
          duration : 304
        }
      } ,
      {
        callerId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        calleeId : mongoose.Types.ObjectId() ,
        callDetails : {
          duration : 303
        }
      } ,
      {
        callerId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        calleeId : mongoose.Types.ObjectId() ,
        callDetails : {
          duration : 302
        }
      }
    ];

    return storageCall.addBatch( newCallBatch )
      .then( ( call : CallModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : interfaces.events.utilities.storageManager.call.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageCall" ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.identifier !== "Added" ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( !emittedEvent.data ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( !emittedEvent.data.hasOwnProperty( "document" ) ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , () => {

    return storageCall.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : interfaces.events.utilities.storageManager.call.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : interfaces.events.utilities.storageManager.call.AddFailed ) => {

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

  it( "should correctly structure rejection" , () => {

    return storageCall.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        expect( reason ).to.satisfy( ( reason : any ) => {

          if ( !reason ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( reason.identifier !== "AddBatchFailed" ) {
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
