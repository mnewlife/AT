/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageUserFactory from "../../../../../src/components/storage/mongodb/user/index";
<<<<<<< HEAddDetails
import aFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";
=======
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";
>>>>>>> workarea

import * as src from "../../../../../src/src/index";
import { UserModel } from "../../../../../src/components/storage/mongodb/user/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "User GET", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: UserModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageUser: src.components.storage.StorageUser;

  /************************************************************/

  before(( done ) => {

    prep(( testUsers: UserModel[] ) => {

      testUsers.forEach(( user: UserModel ) => {
        testInstances.push( user );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

      done();

    } );

    dataStructures = dataStructuresFactory( sandbox.spy() );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageUser = storageUserFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should get all users sorted by specified criteria and limited by specified limit", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return Promise.all( [

      dataStructures.sortObjectArray( testInstances, "verification.numVerAttempts", "Ascending" ),
      dataStructures.sortObjectArray( testInstancesCopy, "verification.numVerAttempts", "Descending" ),

      storageUser.get( null, {
        criteria: "numVerAttempts",
        order: "Ascending"
      }, 1 ),
      storageUser.get( null, {
        criteria: "numVerAttempts",
        order: "Descending"
      }, 2 )

    ] )
      .then(( results: UserModel[][] ) => {

        expect( results ).to.satisfy(( results: UserModel[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 4 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let controlGroupAscending: UserModel[] = results[ 0 ];
          let controlGroupDescending: UserModel[] = results[ 1 ];

          let testGroupAscending: UserModel[] = results[ 2 ];
          let testGroupDescending: UserModel[] = results[ 3 ];

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
            if ( testGroupAscending[ i ].verification.numVerAttempts !== controlGroupAscending[ i ].verification.numVerAttempts ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          for ( let i = 0; i < testGroupDescending.length; i++ ) {
            if ( testGroupDescending[ i ].verification.numVerAttempts !== controlGroupDescending[ i ].verification.numVerAttempts ) {
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

  it( "should distinguish between verified and unverified users", () => {

<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return Promise.all( [

      storageUser.get( {
        verified: true
      }, null, null ),

      storageUser.get( {
        verified: false
      }, null, null )

    ] )
      .then(( results: dataModel.core.user[][] ) => {

        expect( results ).to.satisfy(( results: dataModel.core.user[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let verifiedUsers: dataModel.core.user[] = results[ 0 ];
          let unverifiedUsers: dataModel.core.user[] = results[ 1 ];

          /**********************************************/

          if ( !verifiedUsers || !verifiedUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !unverifiedUsers || !unverifiedUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = verifiedUsers.filter(( user: dataModel.core.user ) => {
            return ( !user.verification.verified );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          culprits = unverifiedUsers.filter(( user: dataModel.core.user ) => {
            return ( user.verification.verified );
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

  it( "should get all users within the specified range of numVerAttempts", () => {

<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( {
      numVerAttemptsMin: 5,
      numVerAttemptsMax: 8
    }, null, null )
      .then(( foundUsers: dataModel.core.user[] ) => {

        expect( foundUsers ).to.satisfy(( users: dataModel.core.user[] ) => {

          if ( !users || users.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = users.filter(( user: dataModel.core.user ) => {
            return ( user.verification.numVerAttempts < 5 || user.verification.numVerAttempts > 8 );
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

  it( "should distinguish users by gender within specified age range", () => {

<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( {
      gender: "Female",
      ageMin: 20
    }, null, null )
      .then(( foundUsers: dataModel.core.user[] ) => {

        expect( foundUsers ).to.satisfy(( foundUsers: dataModel.core.user[] ) => {

          if ( !foundUsers || !foundUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = foundUsers.filter(( user: dataModel.core.user ) => {
            return ( user.personalDetails.age < 20 || user.personalDetails.gender !== "Female" );
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

  it( "should get matching users by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should distinguish between users using specified apps", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return Promise.all( [

      storageUser.get( {
        activeApps: [ "Call263" ]
      }, null, null ),

      storageUser.get( {
        activeApps: [ "GrocRound" ]
      }, null, null )

    ] )
      .then(( results: dataModel.core.user[][] ) => {

        expect( results ).to.satisfy(( results: dataModel.core.user[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let call263Users: dataModel.core.user[] = results[ 0 ];
          let grocRoundUsers: dataModel.core.user[] = results[ 1 ];

          /**********************************************/

          if ( !call263Users || !call263Users.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !grocRoundUsers || !grocRoundUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = call263Users.filter(( user: dataModel.core.user ) => {
            return ( user.activeApps.indexOf( "Call263" ) === -1 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          culprits = grocRoundUsers.filter(( user: dataModel.core.user ) => {
            return ( user.activeApps.indexOf( "GrocRound" ) === -1 );
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

  it( "should emit event upon retrieving user documents", () => {

<<<<<<< HEAddDetails
<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( null , null , null )
      .then( ( foundUsers : dataModel.core.user[] ) => {
=======
    return storageUser.get( null, null, null )
      .then(( foundUsers: dataModel.core.user[] ) => {
>>>>>>> workarea

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.user.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.user.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageUser" ) {
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

          if ( happening.data.numDocuments !== foundUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

<<<<<<< HEAddDetails
<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( null , null , null , true )
      .then( ( response : any ) => {
=======
    return storageUser.get( null, null, null, true )
      .then(( response: any ) => {
>>>>>>> workarea

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.user.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.user.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageUser" ) {
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

<<<<<<< HEAddDetails
<<<<<<< HEAddDetails
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( null , null , null , true )
      .then( ( response : any ) => {
=======
    return storageUser.get( null, null, null, true )
      .then(( response: any ) => {
>>>>>>> workarea

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
