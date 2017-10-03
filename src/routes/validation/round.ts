/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "round" ], "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "round" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "roundId" ], "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, parent[ "roundName" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "round" ], "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "round" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "roundId" ], "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, parent[ "roundName" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/