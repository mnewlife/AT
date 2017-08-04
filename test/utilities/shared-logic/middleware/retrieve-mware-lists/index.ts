/******************************************************************************/

import { expect } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../../src/interfaces/index";

import middlewareFactory from "../../../../../src/utilities/shared-logic/basic/middleware/index";

/******************************************************************************/

describe( "Retrieve Middleware Lists" , function() : void {

  /************************************************************/

  it( "should retrieve middleware from provided module and populate them in provided mware module" , function () {

    let middleware = middlewareFactory();

    let mware : interfaces.utilities.sharedLogic.AppMiddleware = {
      one : [
        function ( req : express.Request , res : express.Response , next : express.NextFunction ) {
          console.log( "Bach" );
        }
      ]
    };

    let middlewareModule : interfaces.utilities.MiddlewareBorn = {
      middleware : [
        function ( req : express.Request , res : express.Response , next : express.NextFunction ) {
          console.log( "Bach" );
        }
      ]
    };

    middleware.retrieveMwareLists( mware , "example" , middlewareModule );

    let expectedResults : interfaces.utilities.sharedLogic.AppMiddleware = {
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

    let mware : interfaces.utilities.sharedLogic.AppMiddleware = {
      one : [ function ( req : express.Request , res : express.Response , next : express.NextFunction ) {} ]
    };

    let middlewareModule : interfaces.utilities.MiddlewareBorn = {
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
