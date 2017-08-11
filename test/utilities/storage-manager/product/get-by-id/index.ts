/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageProductFactory from "../../../../../src/components/storage/mongodb/product/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { ProductModel } from "../../../../../src/components/storage/mongodb/product/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Product GET-BY-ID", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ProductModel[] = [];

  let dataStructures: interfaces.components.sharedLogic.DataStructures;
  let storageProduct: interfaces.components.storage.StorageProduct;

  /************************************************************/

  before(( done ) => {

    prep(( testProducts: ProductModel[] ) => {

      testProducts.forEach(( Product: ProductModel ) => {
        testInstances.push( Product );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );
      
      done();

    } );

  } );

/************************************************************/

beforeEach(() => {
  emitEventSpy = sandbox.spy();
  storageProduct = storageProductFactory( emitEventSpy, dataStructures.mapDetails );
} );

afterEach(() => {
  sandbox.restore();
} );

/************************************************************/

it( "should get Product based on id", () => {

  let testInstance = testInstances[ 0 ];

  return storageProduct.getById( testInstance._id )
    .then(( Product: ProductModel ) => {

      expect( Product ).to.satisfy(( Product: ProductModel ) => {

        /**********************************************/

        if ( !Product ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        /**********************************************/

        if ( String( Product._id ) !== String( testInstance._id ) ) {
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

it( "should emit event upon retrieving Product document", () => {

  let testInstance = testInstances[ 0 ];

  return storageProduct.getById( testInstance._id )
    .then(( Product: ProductModel ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent: interfaces.events.components.storage.product.GotById;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy(( happening: interfaces.events.components.storage.product.GotById ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        if ( happening.context !== "StorageProduct" ) {
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

  return storageProduct.getById( null, true )
    .then(( response: any ) => {

      expect( "2" ).to.eql( 3 );

    } )
    .catch(( reason: any ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent: interfaces.events.components.storage.product.GetByIdFailed;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy(( happening: interfaces.events.components.storage.product.GetByIdFailed ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
          return false;
        }

        if ( happening.context !== "StorageProduct" ) {
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

  return storageProduct.getById( mongoose.Types.ObjectId() )
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

  return storageProduct.getById( null, true )
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
