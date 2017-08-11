/******************************************************************************/

import * as interfaces from "../../../interfaces";

/******************************************************************************/

/******************************************************************************/

class Hooks implements interfaces.setupConfig.eventManager.Hooks {

  /*****************************************************************/

  private components : interfaces.components;
  private tasks : interfaces.tasks;
  hookStructure : interfaces.setupConfig.eventManager.HookStructure;

  /*****************************************************************/

  constructor () {}

  /*****************************************************************/

  readonly updateReferences = ( components : interfaces.components , tasks : interfaces.tasks ) : void => {

    this.components = components;
    this.tasks = tasks;

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
