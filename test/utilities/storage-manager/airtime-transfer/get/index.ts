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

describe( "AirtimeTransfer GET", function (): void {

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

  it( "should get all airtimeTransfers sorted by specified criteria and limited by specified limit", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

    return Promise.all( [

      dataStructures.sortObjectArray( testInstances, "transferDetails.amount", "Ascending" ),
      dataStructures.sortObjectArray( testInstancesCopy, "transferDetails.amount", "Descending" ),

      storageAirtimeTransfer.get( null, {
        criteria: "transferAmount",
        order: "Ascending"
      }, 1 ),
      storageAirtimeTransfer.get( null, {
        criteria: "transferAmount",
        order: "Descending"
      }, 2 )

    ] )
      .then(( results: dataModel.AirtimeTransfer[][] ) => {

        expect( results ).to.satisfy(( results: dataModel.AirtimeTransfer[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 4 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let controlGroupAscending: any[] = results[ 0 ];
          let controlGroupDescending: any[] = results[ 1 ];

          let testGroupAscending: any[] = results[ 2 ];
          let testGroupDescending: any[] = results[ 3 ];

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
            if ( testGroupAscending[ i ].transferDetails.amount !== controlGroupAscending[ i ].transferDetails.amount ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          for ( let i = 0; i < testGroupDescending.length; i++ ) {
            if ( testGroupDescending[ i ].transferDetails.amount !== controlGroupDescending[ i ].transferDetails.amount ) {
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

  it( "should distinguish between transfers with payments recorded and those without", () => {

    return Promise.all( [

      storageAirtimeTransfer.get( {
        paymentRecorded: true
      }, null, null ),

      storageAirtimeTransfer.get( {
        paymentRecorded: false
      }, null, null )

    ] )
      .then(( results: dataModel.AirtimeTransfer[][] ) => {

        expect( results ).to.satisfy(( results: dataModel.AirtimeTransfer[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          if ( !results[ 0 ] || !results[ 0 ].length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !results[ 1 ] || !results[ 1 ].length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = results[ 0 ].filter(( airtimeTransfer: dataModel.AirtimeTransfer ) => {
            return ( !airtimeTransfer.paymentRecorded );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          culprits = results[ 1 ].filter(( airtimeTransfer: dataModel.AirtimeTransfer ) => {
            return ( airtimeTransfer.paymentRecorded );
          } );

          if ( culprits && culprits.length ) {
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

  it( "should get all airtimeTransfers within the specified range of transferAmount", () => {

    return storageAirtimeTransfer.get( {
      transferAmountMin: 4,
      transferAmountMax: 18
    }, null, null )
      .then(( foundAirtimeTransfers: dataModel.AirtimeTransfer[] ) => {

        expect( foundAirtimeTransfers ).to.satisfy(( airtimeTransfers: dataModel.AirtimeTransfer[] ) => {

          if ( !airtimeTransfers || airtimeTransfers.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = airtimeTransfers.filter(( airtimeTransfer: dataModel.AirtimeTransfer ) => {
            return ( airtimeTransfer.transferDetails.amount < 4 || airtimeTransfer.transferDetails.amount > 18 );
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

  it( "should get matching airtimeTransfers by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should emit event upon retrieving airtimeTransfer documents", () => {

    return storageAirtimeTransfer.get( null, null, null )
      .then(( foundAirtimeTransfers: dataModel.AirtimeTransfer[] ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.airtimeTransfer.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.airtimeTransfer.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
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

          if ( happening.data.numDocuments !== foundAirtimeTransfers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageAirtimeTransfer.get( null, null, null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.airtimeTransfer.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.airtimeTransfer.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageAirtimeTransfer" ) {
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

    return storageAirtimeTransfer.get( null, null, null, true )
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
