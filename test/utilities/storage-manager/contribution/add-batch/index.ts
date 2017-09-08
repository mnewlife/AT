/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageContribution from "../../../../../src/components/storage/mongodb/contribution/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { ContributionModel } from "../../../../../src/components/storage/mongodb/contribution/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "Contribution AddDetailsD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

  let dataStructures : src.components.sharedLogic.DataStructures;
  let storageContribution : src.components.storage.StorageContribution;

  /************************************************************/

  before( ( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageContribution = storageContributionFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new contribution records" , () => {

    let newContributionBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        payment : {
          identifier : "vbn678" ,
          amount : 20 ,
          method : "cash"
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        payment : {
          identifier : "vbn678" ,
          amount : 20 ,
          method : "cash"
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        payment : {
          identifier : "vbn678" ,
          amount : 20 ,
          method : "cash"
        }
      }
    ];

    return storageContribution.addBatch( newContributionBatch )
      .then( ( contributions : ContributionModel[] ) => {

        expect( contributions ).to.satisfy( ( contributions : ContributionModel[] ) => {

           if ( !contributions || !contributions.length ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( contributions.length != 3 ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new contribution documents" , () => {

    let newContributionBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        payment : {
          identifier : "vbn678" ,
          amount : 20 ,
          method : "cash"
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        payment : {
          identifier : "vbn678" ,
          amount : 20 ,
          method : "cash"
        }
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        payment : {
          identifier : "vbn678" ,
          amount : 20 ,
          method : "cash"
        }
      }
    ];

    return storageContribution.addBatch( newContributionBatch )
      .then( ( contribution : ContributionModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : src.events.components.storage.contribution.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageContribution" ) {
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

    return storageContribution.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : src.events.components.storage.contribution.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : src.events.components.storage.contribution.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageContribution" ) {
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

    return storageContribution.addBatch( [] , true )
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
