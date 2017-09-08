/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageArticle from "../../../../../src/components/storage/mongodb/article/index";
import dataStructures from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { ArticleModel, ArticleMongooseModel } from "../../../../../src/components/storage/mongodb/article/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "Article REMOVE-BY-ID", function (): void {

  this.timeout( 2000 );

  /******************************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: ArticleModel[] = [];

  let dataStructures: src.components.sharedLogic.DataStructures;
  let storageArticle: src.components.storage.StorageArticle;

  /************************************************************/

  before(( done ) => {

    prep(( testArticles: ArticleModel[] ) => {

      testArticles.forEach(( article: ArticleModel ) => {
        testInstances.push( article );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

    } );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageArticle = storageArticleFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should remove documents based on id", () => {

    return storageArticle.removeById( testInstances[ 0 ]._id )
      .then(( response: any ) => {

        ArticleMongooseModel.find().exec(( err, foundDocuments ) => {

          expect( foundDocuments ).to.satisfy(( articles: ArticleModel[] ) => {

            if ( !articles || articles.length !== 3 ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }

            let culprits = articles.filter(( article: ArticleModel ) => {
              return ( String( article._id ) === String( testInstances[ 0 ]._id ) );
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

  it( "should emit event upon removing article document", () => {

    return storageArticle.removeById( testInstances[ 1 ]._id )
      .then(( response: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.article.Removed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.article.Removed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageArticle" ) {
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

          if ( !happening.data.hasOwnProperty( "id" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

    return storageArticle.removeById( null, true )
      .then(( response: any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: src.events.components.storage.article.RemoveFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: src.events.components.storage.article.RemoveFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageArticle" ) {
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

          if ( !happening.data.hasOwnProperty( "id" ) ) {
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

    return storageArticle.removeById( null, true )
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
