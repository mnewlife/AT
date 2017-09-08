/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";

let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageCartProduct from "../../../../../src/components/storage/mongodb/cart-product/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { CartProductModel } from "../../../../../src/components/storage/mongodb/cart-product/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "CartProduct UPDATE", function (): void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: CartProductModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageCartProduct: src.components.storage.StorageCartProduct;

  /************************************************************/

  before(( done ) => {

    prep(( testCartProducts: CartProductModel[] ) => {

      testCartProducts.forEach(( cart: CartProductModel ) => {
        testInstances.push( cart );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

      done();

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageCartProduct = storageCartProductFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should update documents based on set conditions", () => {

    return storageCartProduct.update( {
      quantityMin: 0
    }, {
        product: {
          quantity: 35
        }
      } )
      .then(( updateDocuments: CartProductModel[] ) => {

        expect( updateDocuments ).to.satisfy(( carts: CartProductModel[] ) => {

          if ( !carts || !carts.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = carts.filter(( cartProduct: CartProductModel ) => {
            return ( cartProduct.product.quantity !== 35 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon updating matching documents", () => {

    return storageCartProduct.update( {
      userId: testInstances[ 0 ].userId
    }, {
        cartId: mongoose.Types.ObjectId()
      } )
      .then(( updatedDocuments: CartProductModel[] ) => {

        sinon.assert.callCount( emitEventSpy, 1 );

        expect( emitEventSpy ).to.satisfy(( emitEventSpy: sinon.SinonSpy ) => {

          let emittedEvent: src.events.components.storage.cartProduct.Updated;

          emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

          if ( !emittedEvent ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( emittedEvent.context !== "StorageCartProduct" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( emittedEvent.identifier !== "Updated" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !emittedEvent.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !emittedEvent.data.hasOwnProperty( "conditions" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !emittedEvent.data.hasOwnProperty( "document" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageCartProduct.update( null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.cartProduct.UpdateFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.cartProduct.UpdateFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCartProduct" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "UpdateFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "conditions" ) ) {
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

    return storageCartProduct.update( null, null, true )
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

          if ( reason.identifier !== "UpdateFailed" ) {
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
