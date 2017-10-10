/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "round", "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "round" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "roundId", "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, "roundName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "round", "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "round" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "roundId", "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, "roundName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/