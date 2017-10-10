/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "shop", "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "shop" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, "shopId", "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, "shopName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "shop", "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "shop" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, "shopId", "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, "shopName", "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/