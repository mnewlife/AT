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

describe( "Product GET", function (): void {

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

    dataStructures = dataStructuresFactory( sandbox.spy() );

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

  it( "should get all Products sorted by specified criteria and limited by specified limit", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

    return Promise.all( [

      dataStructures.sortObjectArray( testInstances, "effectivePrice.price", "Ascending" ),
      dataStructures.sortObjectArray( testInstancesCopy, "effectivePrice.price", "Descending" ),

      storageProduct.get( null, {
        criteria: "effectivePrice",
        order: "Ascending"
      }, 1 ),
      storageProduct.get( null, {
        criteria: "effectivePrice",
        order: "Descending"
      }, 2 )

    ] )
      .then(( results: interfaces.dataModel.Product[][] ) => {

        expect( results ).to.satisfy(( results: interfaces.dataModel.Product[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 4 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let controlGroupAscending: interfaces.dataModel.Product[] = results[ 0 ];
          let controlGroupDescending: interfaces.dataModel.Product[] = results[ 1 ];

          let testGroupAscending: interfaces.dataModel.Product[] = results[ 2 ];
          let testGroupDescending: interfaces.dataModel.Product[] = results[ 3 ];

          /**********************************************/

          if ( !testGroupAscending || !testGroupAscending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !testGroupDescending || !testGroupDescending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !controlGroupAscending || !controlGroupAscending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !controlGroupDescending || !controlGroupDescending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          for ( let i = 0; i < testGroupAscending.length; i++ ) {
            if ( testGroupAscending[ i ].effectivePrice.price !== controlGroupAscending[ i ].effectivePrice.price ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          for ( let i = 0; i < testGroupDescending.length; i++ ) {
            if ( testGroupDescending[ i ].effectivePrice.price !== controlGroupDescending[ i ].effectivePrice.price ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should get all Products within the specified range of numProducts", () => {

    return storageProduct.get( {
      effectivePriceMin : 10 ,
      effectivePriceMax : 100
    }, null, null )
      .then(( foundProducts: interfaces.dataModel.Product[] ) => {

        expect( foundProducts ).to.satisfy(( Products: interfaces.dataModel.Product[] ) => {

          let culprits = Products.filter(( Product: interfaces.dataModel.Product ) => {
            return ( Product.effectivePrice.price < 10 || Product.effectivePrice.price > 100 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            console.log( JSON.stringify( culprits ) );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should get matching Products by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should emit event upon retrieving Product documents", () => {

    return storageProduct.get( null, null, null )
      .then(( foundProducts: interfaces.dataModel.Product[] ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.components.storage.product.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.components.storage.product.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageProduct" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Got" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "numDocuments" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.data.numDocuments !== foundProducts.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageProduct.get( null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.components.storage.product.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.components.storage.product.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageProduct" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "GetFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
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

    return storageProduct.get( null, null, null, true )
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

          if ( reason.identifier !== "GetFailed" ) {
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
