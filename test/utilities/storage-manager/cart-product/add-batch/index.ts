/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageCartProductFactory from "../../../../../src/components/storage/mongodb/cart-product/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { CartProductModel } from "../../../../../src/components/storage/mongodb/cart-product/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "CartProduct ADD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

  let dataStructures : interfaces.components.sharedLogic.DataStructures;
  let storageCartProduct : interfaces.components.storage.StorageCartProduct;

  /************************************************************/

  before( ( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageCartProduct = storageCartProductFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new cart records" , () => {

    let newCartProductBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        cartId : mongoose.Types.ObjectId() ,
        product : {
          productId : mongoose.Types.ObjectId() ,
          quantity : 20 ,
          price : 200
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        cartId : mongoose.Types.ObjectId() ,
        product : {
          productId : mongoose.Types.ObjectId() ,
          quantity : 20 ,
          price : 200
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        cartId : mongoose.Types.ObjectId() ,
        product : {
          productId : mongoose.Types.ObjectId() ,
          quantity : 20 ,
          price : 200
        }
      }
    ];

    return storageCartProduct.addBatch( newCartProductBatch )
      .then( ( carts : CartProductModel[] ) => {

        expect( carts ).to.satisfy( ( carts : CartProductModel[] ) => {

           if ( !carts || !carts.length ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( carts.length != 3 ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new cart documents" , () => {

    let newCartProductBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        cartId : mongoose.Types.ObjectId() ,
        product : {
          productId : mongoose.Types.ObjectId() ,
          quantity : 20 ,
          price : 200
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        cartId : mongoose.Types.ObjectId() ,
        product : {
          productId : mongoose.Types.ObjectId() ,
          quantity : 20 ,
          price : 200
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        cartId : mongoose.Types.ObjectId() ,
        product : {
          productId : mongoose.Types.ObjectId() ,
          quantity : 20 ,
          price : 200
        }
      }
    ];

    return storageCartProduct.addBatch( newCartProductBatch )
      .then( ( cart : CartProductModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : interfaces.events.components.storage.cartProduct.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageCartProduct" ) {
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

    return storageCartProduct.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : interfaces.events.components.storage.cartProduct.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : interfaces.events.components.storage.cartProduct.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCartProduct" ) {
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

    return storageCartProduct.addBatch( [] , true )
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
