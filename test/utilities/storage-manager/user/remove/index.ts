/******************************************************************************/

import { expect , assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageUserFactory from "../../../../../src/utilities/storage-manager/mongodb/user/index";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";

import * as interfaces from "../../../../../src/interfaces/index";
import { UserModel , UserMongooseModel } from "../../../../../src/utilities/storage-manager/mongodb/user/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "User REMOVE" , function () : void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;
  let testInstances : interfaces.dataModel.User[] = [];

  let dataStructures : interfaces.utilities.sharedLogic.DataStructures;
  let storageUser : interfaces.utilities.storageManager.StorageUser;

  /************************************************************/

  before(( done ) => {

    prep(( testUsers: UserModel[] ) => {

      testUsers.forEach(( user: UserModel ) => {
        testInstances.push( user );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );
      
      done();

    } );

  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageUser = storageUserFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should remove documents meeting specified conditions" , () => {

    return storageUser.remove( {
      numVerAttemptsMin : 8
    } )
    .then( ( response : any ) => {

      UserMongooseModel.find().exec( ( err , foundDocuments ) => {

        expect( foundDocuments ).to.satisfy( ( users : UserModel[] ) => {

          let culprits = users.filter( ( user : UserModel ) => {
            return ( user.verification.numVerAttempts > 7 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

    } );

  } );

  /************************************************************/

  it( "should emit event upon removing user documents" , () => {

    return storageUser.remove( {
      numVerAttemptsMin : 4
    } )
    .then( ( response : any ) => {

      sinon.assert.calledOnce( emitEventSpy );

      let emittedEvent : interfaces.events.utilities.storageManager.user.Removed;
      emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

      expect( emittedEvent ).to.satisfy( ( happening : interfaces.events.utilities.storageManager.user.Removed ) => {

        if ( !happening ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
        }

        if ( happening.context !== "StorageUser" ) {
          logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
        }

        if ( happening.identifier !== "Removed" ) {
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

        return true;

      } );

    } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , () => {

    return storageUser.remove( null , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : interfaces.events.utilities.storageManager.user.RemoveFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : interfaces.events.utilities.storageManager.user.RemoveFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageUser" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "RemoveFailed" ) {
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

    return storageUser.remove( null , true )
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

          if ( reason.identifier !== "RemoveFailed" ) {
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
