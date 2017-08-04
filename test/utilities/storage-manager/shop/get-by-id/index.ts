/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageShopFactory from "../../../../../src/utilities/storage-manager/mongodb/shop/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { ShopModel } from "../../../../../src/utilities/storage-manager/mongodb/shop/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Shop GET-BY-ID", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ShopModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storageShop: interfaces.utilities.storageManager.StorageShop;

  /************************************************************/

  before(( done ) => {

    prep(( testShops: ShopModel[] ) => {

      testShops.forEach(( Shop: ShopModel ) => {
        testInstances.push( Shop );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );
      
      done();

    } );

  } );

/************************************************************/

beforeEach(() => {
  emitEventSpy = sandbox.spy();
  storageShop = storageShopFactory( emitEventSpy, dataStructures.mapDetails );
} );

afterEach(() => {
  sandbox.restore();
} );

/************************************************************/

it( "should get Shop based on id", () => {

  let testInstance = testInstances[ 0 ];

  return storageShop.getById( testInstance._id )
    .then(( Shop: ShopModel ) => {

      expect( Shop ).to.satisfy(( Shop: ShopModel ) => {

        /**********************************************/

        if ( !Shop ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        /**********************************************/

        if ( String( Shop._id ) !== String( testInstance._id ) ) {
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

it( "should emit event upon retrieving Shop document", () => {

  let testInstance = testInstances[ 0 ];

  return storageShop.getById( testInstance._id )
    .then(( Shop: ShopModel ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent: interfaces.events.utilities.storageManager.shop.GotById;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.shop.GotById ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        if ( happening.context !== "StorageShop" ) {
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

  return storageShop.getById( null, true )
    .then(( response: any ) => {

      expect( "2" ).to.eql( 3 );

    } )
    .catch(( reason: any ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent: interfaces.events.utilities.storageManager.shop.GetByIdFailed;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.shop.GetByIdFailed ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        if ( happening.context !== "StorageShop" ) {
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

  return storageShop.getById( mongoose.Types.ObjectId() )
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

  return storageShop.getById( null, true )
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
