/******************************************************************************/

import * as dataModel from "../data-model";
import * as components from "../components/interfaces";
import * as procedures from "../procedures/interfaces";

import * as interfaces from "./interfaces";

import * as Hooks from "./hooks/interfaces";
import hooks from "./hooks";

/******************************************************************************/

class EventListener implements interfaces.Instance {

  /*****************************************************************/

  constructor( private hooks: Hooks.Instance ) { }

  /*****************************************************************/

  readonly updateReferences = ( components: components.Instance, procedures: procedures.Instance ): void => {
    //this.hooks.updateReferences( components, procedures );
  }

  /*****************************************************************/

  readonly emit = ( happening: dataModel.Happening ): void => {

    /*
    if ( this.hooks.hookStructure[ happening.context ] ) {
      this.findAndExecuteAfterware( this.hooks.hookStructure[ happening.context ], happening );
    } else {
      this.findAndExecuteAfterware( this.hooks.hookStructure.other, happening );
    }
    */

  }

  /*****************************************************************/

  /*
  private readonly findAndExecuteAfterware = ( hooks: eventListener.ContextHooks, happening: dataModel.Happening ): void => {

    if ( hooks[ happening.identifier ] ) {

      let hook: eventListener.Hook = hooks[ happening.identifier ];

      this.populateTags( hook, happening );

      this.executeAfterware( hook, happening );

      hooks[ happening.identifier ].afterware.forEach( function ( afterware ) {
        afterware( happening );
      } );

    }

  }
  */

  /*****************************************************************/

  /*
  private readonly populateTags = ( hook: eventListener.Hook, happening: dataModel.Happening ): void => {

    hook.tags.forEach( function ( tag: string ) {
      happening.tags.push( tag );
    } );

  }
  */

  /*****************************************************************/

  /*
  private readonly executeAfterware = ( hook: eventListener.Hook, happening: dataModel.Happening ): void => {

    hook.afterware.forEach( function ( afterware: eventListener.Afterware ) {
      afterware( happening );
    } );

  }
  */

  /*****************************************************************/

}

/******************************************************************************/

export default (): interfaces.Instance => {

  let hooksInstance: Hooks.Instance = hooks();

  return new EventListener( hooksInstance );

}

/******************************************************************************/
