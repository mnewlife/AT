/******************************************************************************/

import { expect, assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
let logger = require( "tracer" ).colorConsole();
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageAirtimeTransfer from "../../../../../src/components/storage/mongodb/airtime-transfer/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { AirtimeTransferModel } from "../../../../../src/components/storage/mongodb/airtime-transfer/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "AirtimeTransfer GET-BY-ID", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: AirtimeTransferModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageAirtimeTransfer: src.components.storage.StorageAirtimeTransfer;

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

  it( "should get airtimeTransfer based on id", () => {

    let testInstance = testInstances[ 0 ];

    return storageAirtimeTransfer.getById( testInstance._id )
      .then(( airtimeTransfer: AirtimeTransferModel ) => {

        expect( airtimeTransfer ).to.satisfy(( airtimeTransfer: AirtimeTransferModel ) => {

          /**********************************************/

          if ( !airtimeTransfer ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( String( airtimeTransfer._id ) !== String( testInstance._id ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( String( airtimeTransfer.userId ) != String( testInstance.userId ) ) {
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

  it( "should emit event upon retrieving airtimeTransfer document", () => {

    let testInstance = testInstances[ 0 ];

    return storageAirtimeTransfer.getById( testInstance._id )
      .then(( airtimeTransfer: AirtimeTransferModel ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.airtimeTransfer.GotById;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.airtimeTransfer.GotById ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "GotById" ) {
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

    return storageAirtimeTransfer.getById( null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.airtimeTransfer.GetByIdFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.airtimeTransfer.GetByIdFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "GetByIdFailed" ) {
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

  it( "should correctly structure rejection when document is not found", () => {

    return storageAirtimeTransfer.getById( mongoose.Types.ObjectId() )
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

          if ( reason.identifier !== "DocumentNotFound" ) {
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

  it( "should correctly structure default rejection", () => {

    return storageAirtimeTransfer.getById( null, true )
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

          if ( reason.identifier !== "GetByIdFailed" ) {
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
