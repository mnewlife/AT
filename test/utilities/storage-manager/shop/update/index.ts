/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";

let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageShopFactory from "../../../../../src/components/storage/mongodb/shop/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { ShopModel, ShopMongooseModel } from "../../../../../src/components/storage/mongodb/shop/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Shop UPDATE", function (): void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ShopModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageShop: src.components.storage.StorageShop;

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

  it( "should update documents based on set conditions", () => {

    let num = 5;

    return storageShop.update( {
      numProductsMin : 1
    }, {
        numProducts : num
      } )
      .then(( updateDocuments: ShopModel[] ) => {

        expect( updateDocuments ).to.satisfy(( Shops: ShopModel[] ) => {

          if ( !Shops || !Shops.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = Shops.filter(( Shop: ShopModel ) => {
            return ( Shop.numProducts !== num );
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

    return storageShop.update( {
      numProductsMax : 100
    }, {
        numProducts : 1
      } )
      .then(( updatedDocuments: ShopModel[] ) => {

        sinon.assert.callCount( emitEventSpy, 4 );

        expect( emitEventSpy ).to.satisfy(( emitEventSpy: sinon.SinonSpy ) => {

          let emittedEvent: src.events.components.storage.shop.Updated;

          for ( let i = 0; i < 3; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }

            if ( emittedEvent.context !== "StorageShop" ) {
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

          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageShop.update( null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.shop.UpdateFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.shop.UpdateFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageShop" ) {
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

    return storageShop.update( null, null, true )
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
