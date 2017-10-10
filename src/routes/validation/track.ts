/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "track", "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "track" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "trackId", "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, "trackName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "track", "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "track" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "trackId", "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, "trackName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/