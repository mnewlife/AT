/******************************************************************************/

import * as express from "express";

import * as blocks from "./validation-blocks";

/******************************************************************************/

export let absent = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "product" ], "object" ) ) {
    return true;
  }

  return absentChildren( parent[ "product" ] );

}

export let absentChildren = ( parent: any ): boolean => {

  if ( blocks.absentWrong( parent, parent[ "productId" ], "string" ) ) {
    return true;
  }
  if ( blocks.absentWrong( parent, parent[ "label" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/

export let optional = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "product" ], "object" ) ) {
    return true;
  }

  return optionalChildren( parent[ "product" ] );

}

export let optionalChildren = ( parent: any ): boolean => {

  if ( blocks.optionalWrong( parent, parent[ "productId" ], "string" ) ) {
    return true;
  }
  if ( blocks.optionalWrong( parent, parent[ "label" ], "string" ) ) {
    return true;
  }

  return false;

}

/******************************************************************************/