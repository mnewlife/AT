/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storagePriceFactory from "../../../../../src/components/storage/mongodb/price/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { PriceModel } from "../../../../../src/components/storage/mongodb/price/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Price AddDetailsD-BATCH", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storagePrice: src.components.storage.StoragePrice;

  /************************************************************/

  before(( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storagePrice = storagePriceFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new Price records", () => {

    let newPriceBatch = [
      {
        productId : mongoose.Types.ObjectId() ,
        shopId : mongoose.Types.ObjectId() ,
        quantity : 1 ,
        price : 10
      } ,
      {
        productId : mongoose.Types.ObjectId() ,
        shopId : mongoose.Types.ObjectId() ,
        quantity : 1 ,
        price : 10
      }
    ];

    return storagePrice.addBatch( newPriceBatch )
      .then(( Prices: PriceModel[] ) => {

        expect( Prices ).to.satisfy(( Prices: PriceModel[] ) => {

          if ( !Prices || !Prices.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( Prices.length != 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new Price documents", () => {

    let newPriceBatch = [
      {
        productId : mongoose.Types.ObjectId() ,
        shopId : mongoose.Types.ObjectId() ,
        quantity : 1 ,
        price : 10
      } ,
      {
        productId : mongoose.Types.ObjectId() ,
        shopId : mongoose.Types.ObjectId() ,
        quantity : 1 ,
        price : 10
      }
    ];

    return storagePrice.addBatch( newPriceBatch )
      .then(( Price: PriceModel[] ) => {

        sinon.assert.callCount( emitEventSpy, 2 );

        expect( emitEventSpy ).to.satisfy(( emitEventSpy: sinon.SinonSpy ) => {

          let emittedEvent: src.events.components.storage.price.Added;

          for ( let i = 0; i < 2; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }

            if ( emittedEvent.context !== "StoragePrice" ) {
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

  it( "should emit failed event upon erring", () => {

    return storagePrice.addBatch( [], true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.price.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.price.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StoragePrice" ) {
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

    return storagePrice.addBatch( [], true )
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
