/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "shop" ], "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "shop" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "shopId" ], "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, parent[ "shopName" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "shop" ], "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "shop" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "shopId" ], "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, parent[ "shopName" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/