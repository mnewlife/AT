/******************************************************************************/

import * as interfaces from "../../interfaces/index";
import * as eventManagerInterfaces from "../../interfaces/setup-config/event-manager/index";

import hooksFactory from "./hook-structure/index";

/******************************************************************************/

class EventManager implements interfaces.setupConfig.EventManager {

  /*****************************************************************/

  constructor( private hooks: eventManagerInterfaces.Hooks ) { }

  /*****************************************************************/

  readonly updateReferences = ( utilities: interfaces.Utilities, components: interfaces.Components ): void => {

    this.hooks.updateReferences( utilities, components );

  }

  /*****************************************************************/

  readonly emit = ( happening: interfaces.dataModel.Happening ): void => {

    if ( this.hooks.hookStructure[ happening.context ] ) {
      this.findAndExecuteAfterware( this.hooks.hookStructure[ happening.context ], happening );
    } else {
      this.findAndExecuteAfterware( this.hooks.hookStructure.other, happening );
    }

  }

  /*****************************************************************/

  private readonly findAndExecuteAfterware = ( hooks: eventManagerInterfaces.ContextHooks, happening: interfaces.dataModel.Happening ): void => {

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

  private readonly populateTags = ( hook: eventManagerInterfaces.Hook, happening: interfaces.dataModel.Happening ): void => {

    hook.tags.forEach( function ( tag: string ) {
      happening.tags.push( tag );
    } );

  }

  /*****************************************************************/

  private readonly executeAfterware = ( hook: eventManagerInterfaces.Hook, happening: interfaces.dataModel.Happening ): void => {

    hook.afterware.forEach( function ( afterware: eventManagerInterfaces.Afterware ) {
      afterware( happening );
    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

let eventManagerFactory = function (): interfaces.setupConfig.EventManager {

  let hooks: eventManagerInterfaces.Hooks = hooksFactory();

  return new EventManager( hooks );

}

export default eventManagerFactory;

/******************************************************************************/
