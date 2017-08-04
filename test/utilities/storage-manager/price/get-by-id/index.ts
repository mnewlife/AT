/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storagePriceFactory from "../../../../../src/utilities/storage-manager/mongodb/price/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { PriceModel } from "../../../../../src/utilities/storage-manager/mongodb/price/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Price GET-BY-ID", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: PriceModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storagePrice: interfaces.utilities.storageManager.StoragePrice;

  /************************************************************/

  before(( done ) => {

    prep(( testPrices: PriceModel[] ) => {

      testPrices.forEach(( Price: PriceModel ) => {
        testInstances.push( Price );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );
      
      done();

    } );

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

it( "should get Price based on id", () => {

  let testInstance = testInstances[ 0 ];

  return storagePrice.getById( testInstance._id )
    .then(( Price: PriceModel ) => {

      expect( Price ).to.satisfy(( Price: PriceModel ) => {

        /**********************************************/

        if ( !Price ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        /**********************************************/

        if ( String( Price._id ) !== String( testInstance._id ) ) {
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

it( "should emit event upon retrieving Price document", () => {

  let testInstance = testInstances[ 0 ];

  return storagePrice.getById( testInstance._id )
    .then(( Price: PriceModel ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent: interfaces.events.utilities.storageManager.price.GotById;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.price.GotById ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        if ( happening.context !== "StoragePrice" ) {
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

  return storagePrice.getById( null, true )
    .then(( response: any ) => {

      expect( "2" ).to.eql( 3 );

    } )
    .catch(( reason: any ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent: interfaces.events.utilities.storageManager.price.GetByIdFailed;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.price.GetByIdFailed ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        if ( happening.context !== "StoragePrice" ) {
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

  return storagePrice.getById( mongoose.Types.ObjectId() )
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

  return storagePrice.getById( null, true )
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
