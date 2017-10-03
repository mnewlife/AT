/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "user" ], "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "user" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "userId" ], "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, parent[ "emailAddress" ], "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, parent[ "fullName" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "user" ], "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "user" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "userId" ], "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, parent[ "emailAddress" ], "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, parent[ "fullName" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/