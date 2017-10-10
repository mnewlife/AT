/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "user", "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "user" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "userId", "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, "emailAddress", "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, "fullName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "user", "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "user" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "userId", "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, "emailAddress", "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, "fullName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/