/******************************************************************************/

import * as express from "express";

/******************************************************************************/

export type VariableType = "array" | "object" | "boolean" | "number" | "string";

/******************************************************************************/

export let absentWrong = ( parent: any, child: string, type: VariableType ): boolean => {

  let wrapped = ( parent: any, child: string, type: VariableType ): boolean => {

    if ( type == "array" ) {
      return ( ( !parent[ child ] || !Array.isArray( parent[ child ] ) ) );
    }

    if ( type == "object" ) {
      return ( ( !parent[ child ] || typeof parent[ child ] !== "object" ) );
    }

    if ( type == "boolean" ) {
      if ( parent[ child ] === false ) return false;
      return ( ( !parent[ child ] || typeof parent[ child ] !== "boolean" ) );
    }

    if ( type == "number" ) {
      return ( ( !parent[ child ] || typeof parent[ child ] !== "number" ) );
    }

    if ( type == "string" ) {
      return ( ( !parent[ child ] || typeof parent[ child ] !== "string" ) );
    }

  }

  let result = wrapped( parent, child, type );

  if ( result ) {
    console.log( "Absent Wrong", [ parent, child, type ].join( ", " ) );
  }

  return result;

}

/******************************************************************************/

export let optionalWrong = ( parent: any, child: string, type: VariableType ): boolean => {

  let wrapped = ( parent: any, child: string, type: VariableType ): boolean => {

    if ( type == "array" ) {
      return ( ( parent[ child ] && Array.isArray( parent[ child ] ) ) );
    }

    if ( type == "object" ) {
      return ( ( parent[ child ] && typeof parent[ child ] !== "object" ) );
    }

    if ( type == "boolean" ) {
      if ( parent[ child ] === false ) return false;
      return ( ( parent[ child ] && typeof parent[ child ] !== "boolean" ) );
    }

    if ( type == "number" ) {
      return ( ( parent[ child ] && typeof parent[ child ] !== "number" ) );
    }

    if ( type == "string" ) {
      return ( ( parent[ child ] && typeof parent[ child ] !== "string" ) );
    }

  }

  let result = wrapped( parent, child, type );

  if ( result ) {
    console.log( "Optional wrong", [ parent, child, type ].join( ", " ) );
  }

  return result;

}

/******************************************************************************/