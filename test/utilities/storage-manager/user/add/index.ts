/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageUser from "../../../../../src/components/storage/mongodb/user";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures";
import moders from "../../../../../src/components/shared-logic/basic/moders";

import * as src from "../../../../../src/src";
import { Model } from "../../../../../src/components/storage/mongodb/user/model";

require( "../../connect-database" );
import prep from "./prep";

/******************************************************************************/

describe( "User AddDetailsD", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;

  let dataStructures: src.components.sharedLogic.DataStructures;
  let moders: src.components.sharedLogic.Moders;
  let storageUser: src.components.storage.User;

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
    let accessLevel: dataModel.core.user.AccessLevel = "admin";

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
      .then(( user: dataModel.core.user.Super ) => {

        expect( user ).to.satisfy(( user: dataModel.core.user.Super ) => {

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
    let accessLevel: dataModel.core.user.AccessLevel = "admin";

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
      .then(( user: dataModel.core.user.Super ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.user.Added;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.user.Added ) => {

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
    let accessLevel: dataModel.core.user.AccessLevel = "admin";

    return storageUser.add( null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.user.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.user.AddFailed ) => {

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
    let accessLevel: dataModel.core.user.AccessLevel = "admin";

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
