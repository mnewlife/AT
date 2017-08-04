/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageAirtimeTransferFactory from "../../../../../src/utilities/storage-manager/mongodb/airtime-transfer/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { AirtimeTransferModel, AirtimeTransferMongooseModel } from "../../../../../src/utilities/storage-manager/mongodb/airtime-transfer/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "AirtimeTransfer REMOVE-BY-ID", function (): void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: AirtimeTransferModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storageAirtimeTransfer: interfaces.utilities.storageManager.StorageAirtimeTransfer;

  /************************************************************/

  before(( done ) => {

    prep(( testAirtimeTransfers: AirtimeTransferModel[] ) => {

      testAirtimeTransfers.forEach(( airtimeTransfer: AirtimeTransferModel ) => {
        testInstances.push( airtimeTransfer );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

      done();

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageAirtimeTransfer = storageAirtimeTransferFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should remove documents based on id", () => {

    return storageAirtimeTransfer.removeById( testInstances[ 0 ]._id )
      .then(( response: any ) => {

        AirtimeTransferMongooseModel.find().exec(( err, foundDocuments ) => {

          expect( foundDocuments ).to.satisfy(( airtimeTransfers: AirtimeTransferModel[] ) => {

            if ( !airtimeTransfers || airtimeTransfers.length !== 3 ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }

            let culprits = airtimeTransfers.filter(( airtimeTransfer: AirtimeTransferModel ) => {
              return ( String( airtimeTransfer._id ) === String( testInstances[ 0 ]._id ) );
            } );

            if ( culprits && culprits.length ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }

            return true;

          } );

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon removing airtimeTransfer document", () => {

    return storageAirtimeTransfer.removeById( testInstances[ 1 ]._id )
      .then(( response: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.airtimeTransfer.Removed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.airtimeTransfer.Removed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Removed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "id" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageAirtimeTransfer.removeById( null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.airtimeTransfer.RemoveFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.airtimeTransfer.RemoveFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "RemoveFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "id" ) ) {
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

    return storageAirtimeTransfer.removeById( null, true )
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

          if ( reason.identifier !== "RemoveFailed" ) {
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
