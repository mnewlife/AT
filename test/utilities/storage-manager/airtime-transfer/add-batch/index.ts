/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageAirtimeTransferFactory from "../../../../../src/utilities/storage-manager/mongodb/airtime-transfer/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { AirtimeTransferModel } from "../../../../../src/utilities/storage-manager/mongodb/airtime-transfer/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "AirtimeTransfer ADD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

  let dataStructures : interfaces.utilities.sharedLogic.DataStructures;
  let storageAirtimeTransfer : interfaces.utilities.storageManager.StorageAirtimeTransfer;

  /************************************************************/

  before( ( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageAirtimeTransfer = storageAirtimeTransferFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new airtimeTransfer records" , () => {

    let newAirtimeTransferBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        paymentId : mongoose.Types.ObjectId() ,
        transferDetails : {
          identifier : "4567gh5" ,
          amount : 13
        } ,
        paymentRecorded : false
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        paymentId : mongoose.Types.ObjectId() ,
        transferDetails : {
          identifier : "4567gh5" ,
          amount : 13
        } ,
        paymentRecorded : true
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        paymentId : mongoose.Types.ObjectId() ,
        transferDetails : {
          identifier : "4567gh5" ,
          amount : 13
        } ,
        paymentRecorded : false
      }
    ];

    return storageAirtimeTransfer.addBatch( newAirtimeTransferBatch )
      .then( ( airtimeTransfers : AirtimeTransferModel[] ) => {

        expect( airtimeTransfers ).to.satisfy( ( airtimeTransfers : AirtimeTransferModel[] ) => {

           if ( !airtimeTransfers || !airtimeTransfers.length ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( airtimeTransfers.length != 3 ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new airtimeTransfer documents" , () => {

    let newAirtimeTransferBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        paymentId : mongoose.Types.ObjectId() ,
        transferDetails : {
          identifier : "4567gh5" ,
          amount : 13
        } ,
        paymentRecorded : false
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        paymentId : mongoose.Types.ObjectId() ,
        transferDetails : {
          identifier : "4567gh5" ,
          amount : 13
        } ,
        paymentRecorded : true
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        channelId : mongoose.Types.ObjectId() ,
        paymentId : mongoose.Types.ObjectId() ,
        transferDetails : {
          identifier : "4567gh5" ,
          amount : 13
        } ,
        paymentRecorded : false
      }
    ];

    return storageAirtimeTransfer.addBatch( newAirtimeTransferBatch )
      .then( ( airtimeTransfer : AirtimeTransferModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : interfaces.events.utilities.storageManager.airtimeTransfer.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageAirtimeTransfer" ) {
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

    return storageAirtimeTransfer.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : interfaces.events.utilities.storageManager.airtimeTransfer.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : interfaces.events.utilities.storageManager.airtimeTransfer.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
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

    return storageAirtimeTransfer.addBatch( [] , true )
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
