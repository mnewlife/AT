/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageUserFactory from "../../../../../src/utilities/storage-manager/mongodb/user";
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures";
import modersFactory from "../../../../../src/utilities/shared-logic/basic/moders";

import * as interfaces from "../../../../../src/interfaces";
import { Model } from "../../../../../src/utilities/storage-manager/mongodb/user/model";

require( "../../connect-database" );
import prep from "./prep";

/******************************************************************************/

describe( "User ADD", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let moders: interfaces.utilities.sharedLogic.Moders;
  let storageUser: interfaces.utilities.storageManager.User;

  /************************************************************/

  let unHashedPassword = "function@6781";
  let hashedPassword = bCrypt.hashSync( unHashedPassword, bCrypt.genSaltSync( 10 ) );

  /************************************************************/

  before(( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
    moders = modersFactory();
  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageUser = storageUserFactory( {
      emitEvent: emitEventSpy,
      mapDetails: dataStructures.mapDetails,
      checkThrow: moders.checkThrow
    } );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a new user record", () => {

    let emailAddress = "allansimoyi@gmail.com";
    let password = hashedPassword;
    let accessLevel: interfaces.dataModel.AccessLevel = "admin";

    return storageUser.add( {
      emailAddress: "allansimoyi@gmail.com",
      password: hashedPassword,
      accessLevel: "admin",
      verification: {
        verified: false,
        numVerAttempts: 0
      },
      personalDetails: {
        firstName: "Allan",
        lastName: "Simoyi"
      },
      contactDetails: {
        phoneNumbers: [ "0779528194" ]
      },
      activeApps: [ "Core" ]
    } )
      .then(( user: interfaces.dataModel.user.Super ) => {

        expect( user ).to.satisfy(( user: interfaces.dataModel.user.Super ) => {

          if ( !user || !user.id ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( user.emailAddress !== emailAddress ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !bCrypt.compareSync( unHashedPassword, user.password ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding new user document", () => {

    let emailAddress = "allansimoyi@gmail.com";
    let password = hashedPassword;
    let accessLevel: interfaces.dataModel.AccessLevel = "admin";

    return storageUser.add( {
      emailAddress: "allansimoyi@gmail.com",
      password: hashedPassword,
      accessLevel: "admin",
      verification: {
        verified: false,
        numVerAttempts: 0
      },
      personalDetails: {
        firstName: "Allan",
        lastName: "Simoyi"
      },
      contactDetails: {
        phoneNumbers: [ "0779528194" ]
      },
      activeApps: [ "Core" ]
    } )
      .then(( user: interfaces.dataModel.user.Super ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.user.Added;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.user.Added ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "User" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Added" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "documents" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    let emailAddress = "allansimoyi@gmail.com";
    let password = hashedPassword;
    let accessLevel: interfaces.dataModel.AccessLevel = "admin";

    return storageUser.add( null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.user.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.user.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "User" ) {
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

  it( "should correctly structure rejection", () => {

    let emailAddress = "allansimoyi@gmail.com";
    let password = hashedPassword;
    let accessLevel: interfaces.dataModel.AccessLevel = "admin";

    return storageUser.add( null, true )
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

          if ( reason.identifier !== "AddFailed" ) {
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
