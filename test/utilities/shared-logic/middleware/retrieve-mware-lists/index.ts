/******************************************************************************/

import { expect } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as express from "express";

import * as src from "../../../../../src/src/index";

import middleware from "../../../../../src/components/shared-logic/basic/middleware/index";

/******************************************************************************/

describe( "Retrieve Middleware Lists" , function() : void {

  /************************************************************/

  it( "should retrieve middleware from provided module and populate them in provided mware module" , function () {

    let middleware = middlewareFactory();

    let mware : src.components.sharedLogic.AppMiddleware = {
      one : [
        function ( req : express.Request , res : express.Response , next : express.NextFunction ) {
          console.log( "Bach" );
        }
      ]
    };

    let middlewareModule : src.components.MiddlewareBorn = {
      middleware : [
        function ( req : express.Request , res : express.Response , next : express.NextFunction ) {
          console.log( "Bach" );
        }
      ]
    };

    middleware.retrieveMwareLists( mware , "example" , middlewareModule );

    let expectedResults : src.components.sharedLogic.AppMiddleware = {
      one : [
        function ( req : express.Request , res : express.Response , next : express.NextFunction ) {
          console.log( "Bach" );
        }
      ] ,
      example : [
        function ( req : express.Request , res : express.Response , next : express.NextFunction ) {
          console.log( "Bach" );
        } ]
    };

    expect( JSON.stringify( mware ) ).to.eql( JSON.stringify( expectedResults ) );

  } );

  /************************************************************/

  it( "should not create index for provided subject if no middleware is supplied" , function () {

    let middleware = middlewareFactory();

    let mware : src.components.sharedLogic.AppMiddleware = {
      one : [ function ( req : express.Request , res : express.Response , next : express.NextFunction ) {} ]
    };

    let middlewareModule : src.components.MiddlewareBorn = {
      middleware : []
    };

    middleware.retrieveMwareLists( mware , "example" , middlewareModule );

    let expectedResults = {
      one : [ function ( req : express.Request , res : express.Response , next : express.NextFunction ) {} ]
    };

    expect( JSON.stringify( mware ) ).to.eql( JSON.stringify( expectedResults ) );

  } );

  /************************************************************/

} );

/******************************************************************************/
