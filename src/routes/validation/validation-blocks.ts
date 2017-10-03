/******************************************************************************/

import * as express from "express";

/******************************************************************************/

export type VariableType = "array" | "object" | "boolean" | "number" | "string";

/******************************************************************************/

export let absentWrong = ( parent: any, child: string, type: VariableType ): boolean => {

  if ( type == "array" ) {
    return ( ( !parent[ child ] || !Array.isArray( parent[ child ] ) ) );
  }

  if ( type == "object" ) {
    return ( ( !parent[ child ] || typeof parent[ child ] !== "object" ) );
  }

  if ( type == "boolean" ) {
    return ( ( !parent[ child ] || typeof parent[ child ] !== "boolean" ) );
  }

  if ( type == "number" ) {
    return ( ( !parent[ child ] || typeof parent[ child ] !== "number" ) );
  }

  if ( type == "string" ) {
    return ( ( !parent[ child ] || typeof parent[ child ] !== "string" ) );
  }

}

/******************************************************************************/

export let optionalWrong = ( parent: any, child: string, type: VariableType ): boolean => {

  if ( type == "array" ) {
    return ( ( parent[ child ] && Array.isArray( parent[ child ] ) ) );
  }

  if ( type == "object" ) {
    return ( ( parent[ child ] && typeof parent[ child ] == "object" ) );
  }

  if ( type == "boolean" ) {
    return ( ( parent[ child ] && typeof parent[ child ] == "boolean" ) );
  }

  if ( type == "number" ) {
    return ( ( parent[ child ] && typeof parent[ child ] == "number" ) );
  }

  if ( type == "string" ) {
    return ( ( parent[ child ] && typeof parent[ child ] == "string" ) );
  }

}

/******************************************************************************/