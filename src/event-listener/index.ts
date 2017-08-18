/******************************************************************************/

import * as src from "../../src";
import * as eventManagerInterfaces from "../../src/setup-config/event-manager";

import hooksFactory from "./hook-structure";

/******************************************************************************/

class EventManager implements src.setupConfig.EventManager {

  /*****************************************************************/

  constructor( private hooks: eventManagerInterfaces.Hooks ) { }

  /*****************************************************************/

  readonly updateReferences = ( components: src.components, procedures: src.procedures ): void => {

    this.hooks.updateReferences( components, procedures );

  }

  /*****************************************************************/

  readonly emit = ( happening: dataModel.Happening ): void => {

    if ( this.hooks.hookStructure[ happening.context ] ) {
      this.findAndExecuteAfterware( this.hooks.hookStructure[ happening.context ], happening );
    } else {
      this.findAndExecuteAfterware( this.hooks.hookStructure.other, happening );
    }

  }

  /*****************************************************************/

  private readonly findAndExecuteAfterware = ( hooks: eventManagerInterfaces.ContextHooks, happening: dataModel.Happening ): void => {

    if ( hooks[ happening.identifier ] ) {

      let hook: eventManagerInterfaces.Hook = hooks[ happening.identifier ];

      this.populateTags( hook, happening );

      this.executeAfterware( hook, happening );

      hooks[ happening.identifier ].afterware.forEach( function ( afterware ) {
        afterware( happening );
      } );

    }

  }

  /*****************************************************************/

  private readonly populateTags = ( hook: eventManagerInterfaces.Hook, happening: dataModel.Happening ): void => {

    hook.tags.forEach( function ( tag: string ) {
      happening.tags.push( tag );
    } );

  }

  /*****************************************************************/

  private readonly executeAfterware = ( hook: eventManagerInterfaces.Hook, happening: dataModel.Happening ): void => {

    hook.afterware.forEach( function ( afterware: eventManagerInterfaces.Afterware ) {
      afterware( happening );
    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

let eventManagerFactory = function (): src.setupConfig.EventManager {

  let hooks: eventManagerInterfaces.Hooks = hooksFactory();

  return new EventManager( hooks );

}

export default eventManagerFactory;

/******************************************************************************/
