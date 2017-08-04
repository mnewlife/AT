/******************************************************************************/

import * as interfaces from "../../../interfaces/index";

/******************************************************************************/

/******************************************************************************/

class Hooks implements interfaces.setupConfig.eventManager.Hooks {

  /*****************************************************************/

  private utilities : interfaces.Utilities;
  private components : interfaces.Components;
  hookStructure : interfaces.setupConfig.eventManager.HookStructure;

  /*****************************************************************/

  constructor () {}

  /*****************************************************************/

  readonly updateReferences = ( utilities : interfaces.Utilities , components : interfaces.Components ) : void => {

    this.utilities = utilities;
    this.components = components;

    this.defineHooks();

  }

  /*****************************************************************/

  readonly defineHooks = () : void => {

    this.hookStructure = {
      auth : {
        "Connected_To_Database" : {
          tags : [ "success" ] ,
          afterware : [
            ( happening : interfaces.dataModel.Happening ) : void => {}
          ]
        }
      }
    };

  }

  /*****************************************************************/

}

/******************************************************************************/

let hooksFactory = () : interfaces.setupConfig.eventManager.Hooks => {

  return new Hooks();

}

export default hooksFactory;

/******************************************************************************/
